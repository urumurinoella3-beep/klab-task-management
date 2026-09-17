# Task Management System - Backend

This is the backend API for the Task Management System, built with Spring Boot and PostgreSQL for the kLab Tech Upskill Program.

## 🛠️ Technologies Used

- **Java 17**
- **Spring Boot 4.1.1**
  - Spring Data JPA
  - Spring Web MVC
- **PostgreSQL** (Database)
- **Gradle** (Build tool)

## 📋 Features

The backend provides a RESTful API with the following endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/tasks` | Get all tasks (supports filtering by status) |
| GET | `/api/tasks/:id` | Get a single task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

## 🗄️ Database Schema

### Task Table
- `id` (Long) - Primary key, auto-generated
- `title` (String) - Task title (required)
- `description` (Text) - Task description
- `status` (String) - Either "Pending" or "Completed" (default: "Pending")
- `priority` (String) - Either "Low", "Medium", or "High" (default: "Medium")
- `created_at` (DateTime) - Timestamp of task creation (auto-generated)

## 🚀 Installation & Setup

### Prerequisites
- Java 17 or higher
- PostgreSQL installed and running
- Gradle (included via wrapper)

### Database Setup

1. **Install PostgreSQL** if not already installed

2. **Create the database:**
   ```sql
   CREATE DATABASE "klab-task-management";
   ```

3. **Configure database credentials:**
   
   The application is pre-configured with the following database settings in `src/main/resources/application.properties`:
   
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/klab-task-management
   spring.datasource.username=postgres
   spring.datasource.password=noella@090
   ```

   **Note:** If your PostgreSQL credentials are different, update the `application.properties` file accordingly.

### Running the Application

1. **Navigate to the backend directory:**
   ```bash
   cd back_end
   ```

2. **Build the project:**
   ```bash
   ./gradlew build
   ```
   
   On Windows:
   ```cmd
   gradlew.bat build
   ```

3. **Run the application:**
   ```bash
   ./gradlew bootRun
   ```
   
   On Windows:
   ```cmd
   gradlew.bat bootRun
   ```

4. The API will start on **http://localhost:8080**

### Verify the API

Once the server is running, you can test the endpoints:

- Get all tasks: `GET http://localhost:8080/api/tasks`
- Create a task: `POST http://localhost:8080/api/tasks`

Example JSON for creating a task:
```json
{
  "title": "Complete kLab Challenge",
  "description": "Build a full-stack task management system",
  "status": "Pending",
  "priority": "High"
}
```

## 📁 Project Structure

```
back_end/
├── src/
│   ├── main/
│   │   ├── java/klab_tast/demo/
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.java          # CORS configuration
│   │   │   ├── controller/
│   │   │   │   └── TaskController.java      # REST API endpoints
│   │   │   ├── model/
│   │   │   │   └── Task.java                # Task entity
│   │   │   ├── repository/
│   │   │   │   └── TaskRepository.java      # Data access layer
│   │   │   ├── service/
│   │   │   │   └── TaskService.java         # Business logic
│   │   │   └── DemoApplication.java         # Main application
│   │   └── resources/
│   │       └── application.properties       # Configuration
│   └── test/
├── build.gradle                              # Dependencies
└── README.md
```

## 🔧 Technical Decisions

### Why Spring Boot?
- Industry-standard framework for Java backend development
- Built-in features for REST APIs, database integration, and security
- Excellent documentation and community support

### Why PostgreSQL?
- Robust, production-ready relational database
- Excellent support for complex queries and data integrity
- Free and open-source

### Architecture Pattern
- **Controller-Service-Repository Pattern**: Separates concerns and makes the code maintainable
- **DTOs**: Could be added for better API contract management (optional enhancement)

## 🧪 Testing

Run tests with:
```bash
./gradlew test
```

On Windows:
```cmd
gradlew.bat test
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: Check if the service is active
- Verify database exists: `psql -U postgres -l`
- Check credentials in `application.properties`

### Port Already in Use
If port 8080 is occupied, change it in `application.properties`:
```properties
server.port=8081
```

### Build Failures
- Ensure Java 17 is installed: `java -version`
- Clean build: `./gradlew clean build`

## 📝 API Documentation

### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task Description",
  "status": "Pending",
  "priority": "Medium"
}
```

### Get All Tasks
```http
GET /api/tasks
```

### Filter Tasks by Status
```http
GET /api/tasks?status=Pending
```

### Get Single Task
```http
GET /api/tasks/1
```

### Update Task
```http
PUT /api/tasks/1
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description",
  "status": "Completed",
  "priority": "High"
}
```

### Delete Task
```http
DELETE /api/tasks/1
```

## 👨‍💻 Author

Built for the kLab Tech Upskill Program - Full-Stack Coding Challenge

## 📄 License

This project is for educational purposes as part of the kLab Tech Upskill Program.
