import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium'
  });
  const [formErrors, setFormErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(6);
  const [sortBy, setSortBy] = useState('date'); // date, priority, title
  const [sortOrder, setSortOrder] = useState('desc'); // asc, desc
  const [showStats, setShowStats] = useState(true);

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Fetch all tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks when statusFilter or tasks change
  useEffect(() => {
    let filtered = tasks;
    
    // Filter by status
    if (statusFilter !== 'All') {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort tasks
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return sortOrder === 'desc' 
          ? priorityOrder[b.priority] - priorityOrder[a.priority]
          : priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'title') {
        return sortOrder === 'desc'
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title);
      }
      return 0;
    });
    
    setFilteredTasks(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [statusFilter, tasks, searchQuery, sortBy, sortOrder]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Error fetching tasks. Make sure the backend server is running.');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      errors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 100) {
      errors.title = 'Title must not exceed 100 characters';
    }
    
    if (formData.description && formData.description.length > 500) {
      errors.description = 'Description must not exceed 500 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      if (editingTask) {
        // Update existing task
        await axios.put(`${API_URL}/${editingTask.id}`, formData);
      } else {
        // Create new task
        await axios.post(API_URL, formData);
      }
      fetchTasks();
      resetForm();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Error saving task. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Error deleting task. Please try again.');
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority
    });
    setShowForm(true);
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        ...task,
        status: newStatus
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Error updating task status. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'Pending',
      priority: 'Medium'
    });
    setFormErrors({});
    setEditingTask(null);
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Management System</h1>
        <p>kLab Tech Upskill Program</p>
        
        {showStats && (
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{tasks.length}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{tasks.filter(t => t.status === 'Pending').length}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{tasks.filter(t => t.status === 'Completed').length}</div>
              <div className="stat-label">Done</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{tasks.filter(t => t.priority === 'High').length}</div>
              <div className="stat-label">High</div>
            </div>
          </div>
        )}
      </header>

      <div className="main-content">
        <div className="controls">
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'New Task'}
          </button>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <label>Filter by Status:</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Tasks</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date">Date</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
            <button 
              className="sort-order-btn"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortOrder === 'asc' ? 'ASC' : 'DESC'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="task-form">
            <h2>{editingTask ? 'Edit Task' : 'Create Task'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  placeholder="Enter task title"
                  className={formErrors.title ? 'error' : ''}
                />
                {formErrors.title && <span className="error-message">{formErrors.title}</span>}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter task description"
                  rows="4"
                  className={formErrors.description ? 'error' : ''}
                />
                {formErrors.description && <span className="error-message">{formErrors.description}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingTask ? 'Update' : 'Create'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="tasks-section">
          <h2>
            {statusFilter === 'All' ? 'All Tasks' : `${statusFilter} Tasks`} 
            ({filteredTasks.length})
          </h2>

          {filteredTasks.length === 0 ? (
            <div className="no-tasks">
              <p>No tasks found.</p>
              <p>Click "New Task" to create one.</p>
            </div>
          ) : (
            <>
              <div className="tasks-grid">
                {currentTasks.map(task => (
                <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>

                  <p className="task-description">{task.description}</p>

                  <div className="task-meta">
                    <span className={`status-badge status-${task.status.toLowerCase()}`}>
                      {task.status}
                    </span>
                    <span className="task-date">
                      {formatDate(task.createdAt)}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button 
                      className="btn-icon btn-toggle"
                      onClick={() => toggleStatus(task)}
                      title={task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}
                    >
                      {task.status === 'Pending' ? 'Done' : 'Undo'}
                    </button>
                    <button 
                      className="btn-icon btn-edit"
                      onClick={() => handleEdit(task)}
                      title="Edit Task"
                    >
                      Edit
                    </button>
                    <button 
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(task.id)}
                      title="Delete Task"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-btn"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button 
                  className="pagination-btn"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
          )}
        </div>
      </div>

      <footer className="app-footer">
        <p>kLab Tech Upskill Program</p>
        <p>Spring Boot + React + PostgreSQL</p>
      </footer>
    </div>
  );
}

export default App;
