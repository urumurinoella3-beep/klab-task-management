# Task Management System

A minimalist full-stack web application for managing tasks, built for the **kLab Tech Upskill Program** coding challenge.

![Status](https://img.shields.io/badge/status-completed-success)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![Backend](https://img.shields.io/badge/backend-Spring%20Boot-green)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)

## 🎯 Project Overview

This is a complete Task Management System with a minimalist black design that allows users to:
- ✅ View all tasks in a compact grid layout
- ✅ Create new tasks with title, description, status, and priority
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Mark tasks as Pending or Completed
- ✅ **Search tasks** by title or description in real-time
- ✅ **Paginate** through tasks (6 per page with page numbers)
- ✅ **Sort tasks** by date, priority, or title (ascending/descending)
- ✅ **Filter by status** (All, Pending, Completed)
- ✅ **View statistics** dashboard (total, pending, completed, high priority tasks)
- ✅ **Form validation** (frontend real-time validation & backend validation)
- ✅ **API documentation** with Swagger/OpenAPI
- ✅ **Automated tests** (JUnit & Mockito test suite)
- ✅ **Responsive design** - Works on desktop and mobile
- ✅ **Minimalist UI** - Clean black design with small graphics

## 🛠️ Technologies Used

### Frontend
- **React 19.0.0** - Modern UI framework
- **Vite 6.2.0** - Fast build tool and development server
- **Axios 1.7.9** - Promise-based HTTP client for API requests
- **CSS3** - Custom minimalist black styling

### Backend
- **Java 17** - Programming language
- **Spring Boot 4.1.1** - Enterprise-grade backend framework
  - Spring Data JPA - Database ORM and repository pattern
  - Spring Web MVC - RESTful API implementation
  - Spring Validation - Request validation
- **Maven** - Dependency management and build automation
- **Springdoc OpenAPI** - Automatic API documentation

### Database
- **PostgreSQL 17** - Production-grade relational database
  - Database name: `klab-task-management`
  - Default credentials: postgres / noella@090

### Testing
- **JUnit 5** - Unit testing framework
- **Mockito** - Mocking framework for tests
- **Spring Boot Test** - Integration testing

## 📋 Complete API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET | `/tasks` | Get all tasks | `status`, `search`, `sort`, `order` |
| GET | `/tasks/{id}` | Get single task | - |
| POST | `/tasks` | Create new task | - |
| PUT | `/tasks/{id}` | Update task | - |
| DELETE | `/tasks/{id}` | Delete task | - |

### Query Parameters

**Filtering:**
- `status` - Filter by status: `Pending` or `Completed`
- `search` - Search in title and description

**Sorting:**
- `sort` - Sort by field: `createdAt`, `priority`, or `title`
- `order` - Sort order: `asc` or `desc`

**Examples:**
```bash
# Get all pending tasks
GET /api/tasks?status=Pending

# Search for tasks containing "important"
GET /api/tasks?search=important

# Get tasks sorted by priority descending
GET /api/tasks?sort=priority&order=desc

# Combine filters
GET /api/tasks?status=Pending&search=bug&sort=createdAt&order=desc
```

### Interactive API Documentation
Visit **http://localhost:8080/swagger-ui/index.html** after starting the backend for full interactive API documentation with:
- All endpoints listed
- Request/response schemas
- Try-it-out functionality
- Model definitions

## 🗄️ Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    priority VARCHAR(50) NOT NULL DEFAULT 'Medium',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Field Details:**
- `id` - Auto-incrementing unique identifier
- `title` - Task name (required, 1-255 characters)
- `description` - Detailed task description (optional, max 1000 characters)
- `status` - Current state: `Pending` or `Completed`
- `priority` - Importance level: `Low`, `Medium`, or `High`
- `created_at` - Timestamp of task creation

## 🚀 Installation & Setup

### Prerequisites
Before starting, ensure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Java 17** or higher - [Download](https://adoptium.net/)
- **Maven** - [Download](https://maven.apache.org/download.cgi)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/urumurinoella3-beep/klab-task-management.git
cd klab-task-management
```

### Step 2: Database Setup

#### Windows:
1. **Start PostgreSQL**
   - Open Services (Win + R, type `services.msc`)
   - Find "postgresql" service and start it
   - Or PostgreSQL starts automatically on boot

2. **Create Database**
   - Open Command Prompt or PowerShell
   ```bash
   psql -U postgres
   ```
   - Enter password when prompted
   - Run these commands:
   ```sql
   CREATE DATABASE "klab-task-management";
   \l
   \q
   ```

3. **Verify Database**
   - You should see `klab-task-management` in the database list

#### Mac/Linux:
```bash
# Start PostgreSQL service
sudo service postgresql start  # Linux
brew services start postgresql # Mac

# Create database
psql -U postgres
CREATE DATABASE "klab-task-management";
\q
```

#### Configure Database Connection
The application is pre-configured with:
- **Host:** localhost:5432
- **Database:** klab-task-management
- **Username:** postgres
- **Password:** noella@090

To change credentials, edit: `back_end/src/main/resources/application.properties`

### Step 3: Backend Setup

#### Option 1: Using Maven (Recommended)

**Windows:**
```bash
cd back_end
mvn clean install
mvn spring-boot:run
```

**Mac/Linux:**
```bash
cd back_end
./mvnw clean install
./mvnw spring-boot:run
```

#### Option 2: Using Batch File (Windows Only)
```bash
# From project root
start-backend.bat
```

#### Verify Backend
- Backend runs on: **http://localhost:8080**
- Test endpoint: **http://localhost:8080/api/tasks**
- API docs: **http://localhost:8080/swagger-ui/index.html**
- You should see `[]` (empty array) initially

### Step 4: Frontend Setup

**Open a NEW terminal window:**

#### Windows:
```bash
cd front_end
npm install
npm run dev
```

#### Using Batch File (Windows):
```bash
# From project root
start-frontend.bat
```

#### Mac/Linux:
```bash
cd front_end
npm install
npm run dev
```

#### Access Application
- Frontend: **http://localhost:5173** or **http://localhost:5174**
- The Task Management interface should load with black minimalist design

## 🎮 How to Use the Application

### Dashboard Overview
When you open the application, you'll see:
- **Statistics Cards** - Total tasks, pending, completed, and high priority count
- **Search Bar** - Real-time search as you type
- **Filter Controls** - Sort by date/priority/title, toggle sort order, filter by status
- **New Task Button** - Opens the task creation form
- **Task Grid** - All tasks displayed as compact cards
- **Pagination** - Page numbers and navigation at the bottom

### Creating a Task
1. Click **"New Task"** button at the top
2. Fill in the form:
   - **Title** (required): 1-255 characters
   - **Description** (optional): Up to 1000 characters
   - **Status**: Select Pending or Completed
   - **Priority**: Select Low, Medium, or High
3. Click **"Create Task"** button
4. Form validates in real-time and shows errors if any
5. Task appears in the grid immediately

### Viewing Tasks
- Tasks are displayed as cards in a grid (3 columns on desktop)
- Each card shows:
  - **Title** - Bold at the top
  - **Priority Badge** - Top right (High priority is highlighted in white)
  - **Description** - Below title in light gray
  - **Status Badge** - Bottom left (Completed shown in white)
  - **Date** - Bottom right (creation timestamp)
  - **Action Buttons** - Edit, Status toggle, Delete

### Searching Tasks
1. Type in the **search bar** at the top
2. Search happens instantly as you type
3. Searches in both title and description
4. Clear search to see all tasks again

### Filtering and Sorting
1. **Filter by Status**: Dropdown menu - All Tasks / Pending / Completed
2. **Sort by**: Dropdown menu - Date / Priority / Title
3. **Sort Order**: Button toggles between ↑ (ascending) and ↓ (descending)

### Editing a Task
1. Click **"Edit"** button on any task card
2. Form opens with current values pre-filled
3. Modify any fields
4. Click **"Update Task"**
5. Click **"Cancel"** to discard changes

### Changing Task Status
- Click **"Mark Complete"** on a Pending task → Status changes to Completed
- Click **"Mark Pending"** on a Completed task → Status changes to Pending
- Status change happens immediately

### Deleting a Task
1. Click **"Delete"** button on a task card
2. Browser confirmation dialog appears
3. Click OK to confirm deletion
4. Task is removed from database permanently

### Pagination
- **6 tasks per page**
- Page numbers shown at bottom
- Click page number to jump to that page
- Use **"Prev"** and **"Next"** buttons to navigate
- Current page is highlighted in white

## 📁 Project Structure

```
klab-task-management/
│
├── back_end/                                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/klab_tast/demo/
│   │   │   │   ├── config/
│   │   │   │   │   ├── CorsConfig.java          # CORS configuration
│   │   │   │   │   └── OpenApiConfig.java       # Swagger setup
│   │   │   │   ├── controller/
│   │   │   │   │   └── TaskController.java      # REST API endpoints
│   │   │   │   ├── model/
│   │   │   │   │   ├── Task.java               # Task entity
│   │   │   │   │   └── User.java               # User entity (prepared)
│   │   │   │   ├── repository/
│   │   │   │   │   └── TaskRepository.java     # Database queries
│   │   │   │   ├── service/
│   │   │   │   │   └── TaskService.java        # Business logic
│   │   │   │   └── DemoApplication.java        # Main application
│   │   │   └── resources/
│   │   │       └── application.properties       # Database config
│   │   └── test/
│   │       └── java/klab_tast/demo/
│   │           └── service/
│   │               └── TaskServiceTest.java     # Unit tests
│   ├── pom.xml                                  # Maven dependencies
│   ├── build.gradle                             # Gradle config (alternative)
│   ├── database-setup.sql                       # Database schema
│   └── sample-data.sql                          # Sample tasks
│
├── front_end/                                   # React Frontend
│   ├── src/
│   │   ├── App.jsx                             # Main component
│   │   ├── App.css                             # Minimalist black styling
│   │   ├── main.jsx                            # Entry point
│   │   └── index.css                           # Global styles
│   ├── public/                                  # Static assets
│   ├── package.json                            # NPM dependencies
│   └── vite.config.js                          # Vite configuration
│
├── create-database.bat                          # Windows DB setup script
├── start-backend.bat                           # Windows backend launcher
├── start-frontend.bat                          # Windows frontend launcher
├── README.md                                   # This file
├── ARCHITECTURE.md                             # System architecture
├── FEATURES.md                                 # Feature list
├── DEPLOYMENT.md                               # Deployment guide
└── TESTING.md                                  # Testing guide
```

## 🔧 Important Technical Decisions

### 1. Backend Architecture
**Controller-Service-Repository Pattern**
- **Controller**: Handles HTTP requests, validates input, returns responses
- **Service**: Contains business logic, orchestrates operations
- **Repository**: Database access using Spring Data JPA
- **Benefits**: Separation of concerns, testability, maintainability

### 2. Database Design
**Single Table with Indexed Columns**
- Auto-incrementing ID as primary key
- Timestamps for audit trail
- Enum-style fields (status, priority) for data consistency
- Indexes on frequently queried columns for performance

### 3. API Design
**RESTful Principles**
- Resource-based URLs (`/api/tasks`)
- HTTP methods match operations (GET, POST, PUT, DELETE)
- Query parameters for filtering and sorting
- JSON for data exchange
- Standard HTTP status codes

### 4. Frontend State Management
**React Hooks (useState, useEffect)**
- Simple state management without external libraries
- useEffect for API calls on component mount
- Real-time updates after every operation
- Form state managed locally

### 5. Validation Strategy
**Two-Layer Validation**
- **Frontend**: Real-time validation as user types, instant feedback
- **Backend**: Jakarta Bean Validation (@NotBlank, @Size) for security
- Prevents invalid data from reaching database

### 6. Search Implementation
**Backend SQL LIKE Query**
- Search performed on database level using SQL LIKE
- Case-insensitive search
- Searches both title and description fields
- Efficient for current scale, can be upgraded to full-text search

### 7. Pagination Logic
**Backend Pagination with Spring Data**
- Page size: 6 tasks per page
- Page numbers start at 0 (backend) but displayed as 1 (frontend)
- Total pages calculated automatically
- Efficient database queries using LIMIT and OFFSET

### 8. Styling Approach
**Minimalist Black Design**
- Pure CSS3, no CSS frameworks (Bootstrap, Tailwind, etc.)
- Black background (#000) with white text (#fff)
- Small, compact layout (reduced padding, margins, font sizes)
- High contrast for readability
- Responsive grid using CSS Grid and Flexbox

### 9. Build Tools
**Maven for Backend, Vite for Frontend**
- **Maven**: Standard Java build tool, reliable dependency management
- **Vite**: Fast dev server, HMR (Hot Module Replacement), optimized builds
- Both have active communities and excellent documentation

### 10. CORS Configuration
**Custom CORS Filter**
- Allows frontend (port 5173) to call backend (port 8080)
- Configured for development with localhost
- Should be restricted in production to specific domains

## ✅ Form Validation Rules

### Frontend Validation (Real-time)
- **Title**:
  - Required
  - Minimum 1 character
  - Maximum 255 characters
  - Error shown immediately when invalid

- **Description**:
  - Optional
  - Maximum 1000 characters
  - Error shown when limit exceeded

### Backend Validation (Server-side)
- **Title**:
  - @NotBlank - Cannot be null or empty
  - @Size(min=1, max=255) - Length constraints
  
- **Description**:
  - @Size(max=1000) - Maximum length
  
- Returns **400 Bad Request** with error messages if validation fails

## 🧪 Testing

### Running Backend Tests
```bash
cd back_end
mvn test
```

### Test Coverage
The project includes **8 comprehensive unit tests** in `TaskServiceTest.java`:

1. ✅ `testGetAllTasks()` - Verify fetching all tasks
2. ✅ `testGetTaskById()` - Verify fetching single task by ID
3. ✅ `testGetTaskByIdNotFound()` - Verify exception when task not found
4. ✅ `testCreateTask()` - Verify task creation
5. ✅ `testUpdateTask()` - Verify task update
6. ✅ `testUpdateTaskNotFound()` - Verify exception on update non-existent task
7. ✅ `testDeleteTask()` - Verify task deletion
8. ✅ `testSearchTasks()` - Verify search functionality

### Test Technologies
- **JUnit 5** - Test framework
- **Mockito** - Mock repository layer
- **AssertJ** - Fluent assertions
- **Spring Boot Test** - Testing utilities

## 📚 API Testing with Examples

### Using cURL

**1. Get All Tasks**
```bash
curl http://localhost:8080/api/tasks
```

**2. Create a Task**
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Buy groceries\",\"description\":\"Milk, eggs, bread\",\"status\":\"Pending\",\"priority\":\"High\"}"
```

**3. Get Single Task**
```bash
curl http://localhost:8080/api/tasks/1
```

**4. Update Task**
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Buy groceries - Updated\",\"description\":\"Milk, eggs, bread, butter\",\"status\":\"Completed\",\"priority\":\"Medium\"}"
```

**5. Delete Task**
```bash
curl -X DELETE http://localhost:8080/api/tasks/1
```

**6. Search Tasks**
```bash
curl "http://localhost:8080/api/tasks?search=grocery"
```

**7. Filter by Status**
```bash
curl "http://localhost:8080/api/tasks?status=Pending"
```

**8. Sort Tasks**
```bash
curl "http://localhost:8080/api/tasks?sort=priority&order=desc"
```

### Using Swagger UI
1. Start the backend server
2. Open browser: http://localhost:8080/swagger-ui/index.html
3. Click on any endpoint
4. Click "Try it out"
5. Fill in parameters
6. Click "Execute"
7. View response

## 🐛 Troubleshooting

### Backend Won't Start

**Problem**: Port 8080 already in use
```
Solution: Change port in application.properties:
server.port=8081
```

**Problem**: Database connection refused
```
Solution:
1. Check PostgreSQL is running
2. Verify database name: klab-task-management
3. Check credentials in application.properties
4. Test connection: psql -U postgres -d klab-task-management
```

**Problem**: Java version mismatch
```
Solution:
1. Check version: java -version
2. Must be Java 17 or higher
3. Install correct version if needed
```

### Frontend Won't Start

**Problem**: Port 5173 already in use
```
Solution: Vite will automatically try 5174, 5175, etc.
Or kill the process using the port
```

**Problem**: Module not found errors
```
Solution:
1. Delete node_modules folder
2. Delete package-lock.json
3. Run: npm install
4. Run: npm run dev
```

**Problem**: Cannot connect to backend
```
Solution:
1. Verify backend is running on port 8080
2. Check browser console for CORS errors
3. Verify proxy config in vite.config.js
```

### Database Issues

**Problem**: Database doesn't exist
```
Solution:
psql -U postgres
CREATE DATABASE "klab-task-management";
\q
```

**Problem**: Authentication failed
```
Solution:
1. Verify PostgreSQL password
2. Update application.properties with correct password
3. Test: psql -U postgres -W
```

**Problem**: Table doesn't exist
```
Solution:
1. Spring Boot auto-creates tables on first run
2. Or run: back_end/database-setup.sql
3. Check application.properties has: spring.jpa.hibernate.ddl-auto=update
```

### Build Errors

**Backend Maven build fails**
```
Solution:
1. Clear Maven cache: mvn clean
2. Rebuild: mvn clean install -U
3. Check internet connection (for dependencies)
```

**Frontend build fails**
```
Solution:
1. Clear npm cache: npm cache clean --force
2. Delete node_modules: rm -rf node_modules
3. Reinstall: npm install
4. Rebuild: npm run dev
```

## 🚀 Deployment Guide

### Option 1: Deploy to Render (Free)

**Backend:**
1. Push code to GitHub
2. Go to [Render.com](https://render.com)
3. Create new "Web Service"
4. Connect GitHub repository
5. Configure:
   - Build Command: `cd back_end && mvn clean install`
   - Start Command: `cd back_end && java -jar target/*.jar`
   - Environment: Add DATABASE_URL
6. Deploy

**Frontend:**
1. Go to Render.com
2. Create new "Static Site"
3. Configure:
   - Build Command: `cd front_end && npm install && npm run build`
   - Publish Directory: `front_end/dist`
4. Update API URL in App.jsx to backend URL
5. Deploy

### Option 2: Deploy to Railway (Easy)

**Backend:**
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Create project: `railway init`
4. Add PostgreSQL: `railway add postgresql`
5. Deploy: `railway up`

**Frontend:**
1. Update API URL in App.jsx
2. Build: `npm run build`
3. Deploy to Netlify or Vercel (drag & drop dist folder)

### Option 3: Deploy to Heroku

**Backend:**
1. Install Heroku CLI
2. Create Procfile: `web: java -jar target/*.jar`
3. Create app: `heroku create klab-task-backend`
4. Add PostgreSQL: `heroku addons:create heroku-postgresql`
5. Deploy: `git push heroku main`

**Frontend:**
1. Update API URL in App.jsx to Heroku backend URL
2. Build: `npm run build`
3. Deploy to Netlify: `npx netlify deploy --prod --dir=dist`

### Environment Variables for Production
```
# Backend
DATABASE_URL=<your_postgres_url>
SPRING_PROFILES_ACTIVE=production
CORS_ALLOWED_ORIGINS=<your_frontend_url>

# Frontend
VITE_API_URL=<your_backend_url>
```

## 📊 Features Summary

### Core Requirements (100% Complete)
- ✅ View all tasks
- ✅ Create a task
- ✅ Edit a task
- ✅ Delete a task
- ✅ Mark task as Pending or Completed
- ✅ Filter tasks by status
- ✅ REST API with all endpoints
- ✅ PostgreSQL database storage

### Optional Features (Implemented)
- ✅ Search functionality (real-time)
- ✅ Pagination (6 per page with page numbers)
- ✅ Form validation (frontend + backend)
- ✅ Tests (JUnit test suite)
- ✅ API documentation (Swagger/OpenAPI)
- ✅ Improved UI/UX (minimalist black design)
- ✅ Sorting (date, priority, title)
- ✅ Statistics dashboard
- ✅ Responsive design
- ✅ Deployment guide

### Not Implemented
- ⚠️ User authentication (User entity prepared but not fully implemented)

## 📝 Submission Checklist

- ✅ Complete REST API with all required endpoints
- ✅ React frontend with clean UI
- ✅ PostgreSQL database integration
- ✅ Full CRUD operations working
- ✅ Task filtering by status
- ✅ Search functionality
- ✅ Pagination
- ✅ Form validation (frontend + backend)
- ✅ Unit tests
- ✅ API documentation
- ✅ Comprehensive README with:
  - ✅ Technologies used
  - ✅ Installation instructions
  - ✅ Database setup guide
  - ✅ How to run the project
  - ✅ Technical decisions explained
  - ✅ Additional features documented
- ✅ Code pushed to GitHub
- ✅ Clean, well-organized code structure
- ✅ Professional documentation

## 🎓 About This Project

This Task Management System was built as part of the **kLab Tech Upskill Program Full-Stack Coding Challenge**.

**Submission Details:**
- **Repository**: https://github.com/urumurinoella3-beep/klab-task-management
- **Program**: kLab Tech Upskill Program
- **Challenge**: Full-Stack Coding Challenge
- **Deadline**: Friday, 18 September 2026 at 8:30 AM (Rwanda Time)

## 👩‍💻 Developer

**Urumuri Noella**
- GitHub: [@urumurinoella3-beep](https://github.com/urumurinoella3-beep)
- Database Configuration: klab-task-management (PostgreSQL)

## 🙏 Acknowledgments

- kLab Tech Upskill Program for the opportunity
- Spring Boot and React communities for excellent documentation
- PostgreSQL for reliable database system

## 📄 License

This project is submitted for educational purposes as part of the kLab Tech Upskill Program coding challenge.

---

## 🆘 Need Help?

If you encounter any issues:

1. **Check Troubleshooting section** above
2. **Verify all prerequisites** are installed
3. **Check server logs** for detailed error messages
4. **Test API endpoints** using Swagger UI or cURL
5. **Review database connection** settings

**Common Quick Fixes:**
- Restart PostgreSQL service
- Clear browser cache
- Rebuild backend: `mvn clean install`
- Reinstall frontend dependencies: `npm install`
- Check that both servers are running on correct ports

---

**Built with ❤️ for kLab Tech Upskill Program**
