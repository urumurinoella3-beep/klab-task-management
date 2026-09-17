package klab_tast.demo.service;

import klab_tast.demo.model.Task;
import klab_tast.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    // Get all tasks
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    // Get task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
    
    // Get tasks by status
    public List<Task> getTasksByStatus(String status) {
        return taskRepository.findByStatus(status);
    }
    
    // Search tasks
    public List<Task> searchTasks(String searchTerm) {
        return taskRepository.searchTasks(searchTerm);
    }
    
    // Create a new task
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }
    
    // Update existing task
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setStatus(taskDetails.getStatus());
        task.setPriority(taskDetails.getPriority());
        
        return taskRepository.save(task);
    }
    
    // Delete task
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        taskRepository.delete(task);
    }
}
