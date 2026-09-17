package klab_tast.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import klab_tast.demo.model.Task;
import klab_tast.demo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@Tag(name = "Task Management", description = "APIs for managing tasks")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    // GET /api/tasks - Get all tasks or filter by status or search
    @Operation(summary = "Get all tasks", description = "Retrieve all tasks with optional filtering by status and search")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved tasks")
    })
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(
            @Parameter(description = "Filter by status (Pending/Completed)") 
            @RequestParam(required = false) String status,
            @Parameter(description = "Search in title and description") 
            @RequestParam(required = false) String search) {
        List<Task> tasks;
        if (search != null && !search.isEmpty()) {
            tasks = taskService.searchTasks(search);
            if (status != null && !status.isEmpty()) {
                tasks = tasks.stream()
                        .filter(task -> task.getStatus().equals(status))
                        .toList();
            }
        } else if (status != null && !status.isEmpty()) {
            tasks = taskService.getTasksByStatus(status);
        } else {
            tasks = taskService.getAllTasks();
        }
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    
    // GET /api/tasks/:id - Get one task
    @Operation(summary = "Get task by ID", description = "Retrieve a specific task by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Task found"),
        @ApiResponse(responseCode = "404", description = "Task not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(
            @Parameter(description = "Task ID") @PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // POST /api/tasks - Create a task
    @Operation(summary = "Create a new task", description = "Create a new task with the provided details")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Task created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public ResponseEntity<Task> createTask(@Valid @RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }
    
    // PUT /api/tasks/:id - Update a task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @Valid @RequestBody Task taskDetails) {
        try {
            Task updatedTask = taskService.updateTask(id, taskDetails);
            return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // DELETE /api/tasks/:id - Delete a task
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
