

package com.example.taskmanager_backend.service;

import com.example.taskmanager_backend.model.Task;
import com.example.taskmanager_backend.model.User;
import com.example.taskmanager_backend.repository.TaskRepository;
import com.example.taskmanager_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Task task, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        task.setUser(user);
        return taskRepository.save(task);
    }

    public Task getTaskByIdAndUsername(Long id, String username) {
        return taskRepository.findByIdAndUserUsername(id, username)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
    }

    public List<Task> getAllTasksByUsername(String username) {
        return taskRepository.findByUserUsername(username);
    }

    public Task updateTask(Long id, Task updatedTask, String username) {
        Task existingTask = getTaskByIdAndUsername(id, username);
        existingTask.setTitle(updatedTask.getTitle());
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setStatus(updatedTask.getStatus());
        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id, String username) {
        Task task = getTaskByIdAndUsername(id, username);
        taskRepository.delete(task);
    }
}