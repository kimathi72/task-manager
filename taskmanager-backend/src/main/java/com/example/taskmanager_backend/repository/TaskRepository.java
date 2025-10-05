package com.example.taskmanager_backend.repository;

import com.example.taskmanager_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Get all tasks for a specific username
    List<Task> findByUserUsername(String username);

    // Get a specific task by id and username
    Optional<Task> findByIdAndUserUsername(Long id, String username);
}
