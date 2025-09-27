package com.example.taskmanager_backend.controller;

import com.example.taskmanager_backend.model.User;
import com.example.taskmanager_backend.repository.UserRepository;
import com.example.taskmanager_backend.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(UserRepository userRepo,
                          PasswordEncoder passwordEncoder,
                          AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User u) {
        if (u.getUsername() == null || u.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "username and password required"));
        }
        if (userRepo.existsByUsername(u.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error", "username already exists"));
        }
        u.setPassword(passwordEncoder.encode(u.getPassword()));
        User saved = userRepo.save(u);
        log.info("User registered: {}", saved.getUsername());
        // password is write-only (won't be serialized)
        return ResponseEntity.ok(Map.of("username", saved.getUsername()));
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user) {
    if ("roy".equals(user.getUsername()) && "password123".equals(user.getPassword())) {
        return ResponseEntity.ok("{ \"token\": \"fake-jwt-token\" }");
    }
    return ResponseEntity.status(401).body("{ \"error\": \"invalid credentials\" }");
}
}
