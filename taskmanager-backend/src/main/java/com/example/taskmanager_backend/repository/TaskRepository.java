package com.example.taskmanager_backend.repository;

import com.example.taskmanager_backend.model.Task;
import com.example.taskmanager_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
