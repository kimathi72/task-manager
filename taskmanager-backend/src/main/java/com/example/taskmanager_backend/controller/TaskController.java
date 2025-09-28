package com.example.taskmanager_backend.controller;

import com.example.taskmanager_backend.model.Task;
import com.example.taskmanager_backend.model.User;
import com.example.taskmanager_backend.service.TaskService;
import com.example.taskmanager_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    public TaskController(TaskService taskService, UserService userService) {
        this.taskService = taskService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.ok(createdTask);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        Task task = taskService.getTaskById(id);

        if (!task.getUser().getUsername().equals(username)) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(task);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(Authentication authentication) {
        String username = authentication.getName();
        List<Task> tasks = taskService.getAllTasks().stream()
                .filter(t -> t.getUser().getUsername().equals(username))
                .collect(Collectors.toList());
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task, Authentication authentication) {
        String username = authentication.getName();
        Task existingTask = taskService.getTaskById(id);
        if (!existingTask.getUser().getUsername().equals(username)) {
            return ResponseEntity.status(403).build();
        }
        Task updatedTask = taskService.updateTask(id, task);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        Task task = taskService.getTaskById(id);
        if (!task.getUser().getUsername().equals(username)) {
            return ResponseEntity.status(403).build();
        }
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
