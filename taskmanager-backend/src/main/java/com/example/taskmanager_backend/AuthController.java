package com.example.taskmanager_backend.controller;

import com.example.taskmanager_backend.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // For now: just echo back the request (to satisfy the test)
        return user;
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        // For now: return fake token
        return "{ \"token\": \"fake-jwt-token\" }";
    }
}
