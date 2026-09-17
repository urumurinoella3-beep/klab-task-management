package klab_tast.demo.repository;

import klab_tast.demo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Find tasks by status
    List<Task> findByStatus(String status);
    
    // Find tasks by priority
    List<Task> findByPriority(String priority);
    
    // Find tasks by status and priority
    List<Task> findByStatusAndPriority(String status, String priority);
    
    // Search tasks by title or description
    @Query("SELECT t FROM Task t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "OR LOWER(t.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Task> searchTasks(@Param("searchTerm") String searchTerm);
}
