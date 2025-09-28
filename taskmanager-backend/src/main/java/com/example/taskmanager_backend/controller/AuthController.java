package com.example.taskmanager_backend.controller;

import com.example.taskmanager_backend.model.User;
import com.example.taskmanager_backend.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = authService.register(user);
            logger.info("User registered successfully: {}", savedUser.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("username", savedUser.getUsername());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            logger.warn("User registration failed for {}: {}", user.getUsername(), e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            logger.error("Unexpected error during registration for {}: {}", user.getUsername(), e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", "Internal server error");
            return ResponseEntity.status(500).body(error);
        }
    }

   @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
    String username = request.get("username");
    try {
        String token = authService.login(username, request.get("password"));
        Map<String, Object> response = new HashMap<>();
        response.put("jwt", token);   // JWT token here
        response.put("username", username);
        return ResponseEntity.ok(response);
    } catch (IllegalArgumentException e) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "invalid credentials");
        return ResponseEntity.status(401).body(error);
    } catch (Exception e) {
        Map<String, String> error = new HashMap<>();
        error.put("error", "Internal server error");
        return ResponseEntity.status(500).body(error);
    }
}
}
