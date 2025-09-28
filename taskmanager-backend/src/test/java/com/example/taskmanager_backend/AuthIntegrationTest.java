package com.example.taskmanager_backend;

import com.example.taskmanager_backend.model.Task;
import com.example.taskmanager_backend.model.User;
import com.example.taskmanager_backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @BeforeEach
    void setup() {
        // Ensure testuser exists with hashed password
        if (userRepository.findByUsername("testuser").isEmpty()) {
            User user = new User();
            user.setUsername("testuser");
            user.setPassword(passwordEncoder.encode("password"));
            userRepository.save(user);
        }
    }

    @Test
    @WithMockUser(username = "testuser")
    void testTaskCrudFlow() throws Exception {

        // Create task
        String taskJson = "{\"title\":\"My first task\",\"description\":\"This is a test task\",\"status\":\"PENDING\"}";
        String taskResponse = mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(taskJson))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Task createdTask = objectMapper.readValue(taskResponse, Task.class);

        // Get task by ID
        mockMvc.perform(get("/api/tasks/" + createdTask.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("My first task"))
                .andExpect(jsonPath("$.description").value("This is a test task"))
                .andExpect(jsonPath("$.status").value("PENDING"));

        // Update task
        String updatedTaskJson = "{\"title\":\"Updated task\",\"description\":\"Updated description\",\"status\":\"COMPLETED\"}";
        mockMvc.perform(put("/api/tasks/" + createdTask.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedTaskJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated task"))
                .andExpect(jsonPath("$.description").value("Updated description"))
                .andExpect(jsonPath("$.status").value("COMPLETED"));

        // Delete task
        mockMvc.perform(delete("/api/tasks/" + createdTask.getId()))
                .andExpect(status().isNoContent());
    }
}
