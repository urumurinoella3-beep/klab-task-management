package klab_tast.demo.service;

import klab_tast.demo.model.Task;
import klab_tast.demo.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private Task testTask;

    @BeforeEach
    void setUp() {
        testTask = new Task();
        testTask.setId(1L);
        testTask.setTitle("Test Task");
        testTask.setDescription("Test Description");
        testTask.setStatus("Pending");
        testTask.setPriority("High");
    }

    @Test
    void testGetAllTasks() {
        // Arrange
        List<Task> tasks = Arrays.asList(testTask);
        when(taskRepository.findAll()).thenReturn(tasks);

        // Act
        List<Task> result = taskService.getAllTasks();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
        verify(taskRepository, times(1)).findAll();
    }

    @Test
    void testGetTaskById() {
        // Arrange
        when(taskRepository.findById(1L)).thenReturn(Optional.of(testTask));

        // Act
        Optional<Task> result = taskService.getTaskById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Test Task", result.get().getTitle());
        verify(taskRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateTask() {
        // Arrange
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);

        // Act
        Task result = taskService.createTask(testTask);

        // Assert
        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        verify(taskRepository, times(1)).save(testTask);
    }

    @Test
    void testUpdateTask() {
        // Arrange
        Task updatedTask = new Task();
        updatedTask.setTitle("Updated Task");
        updatedTask.setDescription("Updated Description");
        updatedTask.setStatus("Completed");
        updatedTask.setPriority("Low");

        when(taskRepository.findById(1L)).thenReturn(Optional.of(testTask));
        when(taskRepository.save(any(Task.class))).thenReturn(testTask);

        // Act
        Task result = taskService.updateTask(1L, updatedTask);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Task", result.getTitle());
        assertEquals("Completed", result.getStatus());
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).save(any(Task.class));
    }

    @Test
    void testDeleteTask() {
        // Arrange
        when(taskRepository.findById(1L)).thenReturn(Optional.of(testTask));
        doNothing().when(taskRepository).delete(testTask);

        // Act
        taskService.deleteTask(1L);

        // Assert
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).delete(testTask);
    }

    @Test
    void testGetTasksByStatus() {
        // Arrange
        List<Task> tasks = Arrays.asList(testTask);
        when(taskRepository.findByStatus("Pending")).thenReturn(tasks);

        // Act
        List<Task> result = taskService.getTasksByStatus("Pending");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Pending", result.get(0).getStatus());
        verify(taskRepository, times(1)).findByStatus("Pending");
    }

    @Test
    void testSearchTasks() {
        // Arrange
        List<Task> tasks = Arrays.asList(testTask);
        when(taskRepository.searchTasks("Test")).thenReturn(tasks);

        // Act
        List<Task> result = taskService.searchTasks("Test");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertTrue(result.get(0).getTitle().contains("Test"));
        verify(taskRepository, times(1)).searchTasks("Test");
    }
}
