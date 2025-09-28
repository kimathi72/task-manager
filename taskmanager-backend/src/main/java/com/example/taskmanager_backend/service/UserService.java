package com.example.taskmanager_backend.service;

import com.example.taskmanager_backend.model.User;
import com.example.taskmanager_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Returns Optional<User> so orElseThrow works in controller
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
