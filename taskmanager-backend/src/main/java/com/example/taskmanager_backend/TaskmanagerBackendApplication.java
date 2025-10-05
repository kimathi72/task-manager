package com.example.taskmanager_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.taskmanager_backend")
public class TaskmanagerBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskmanagerBackendApplication.class, args);
    }

}
