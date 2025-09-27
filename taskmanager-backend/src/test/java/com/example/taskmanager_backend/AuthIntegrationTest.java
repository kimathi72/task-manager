package com.example.taskmanager_backend;

import com.example.taskmanager_backend.model.Task;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
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

    @Test
    void testTaskCrudFlow() throws Exception {
        // 1. Register user
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"testuser\",\"password\":\"password\"}"))
            .andExpect(status().isOk());

        // 2. Login to get JWT
        String loginResponse = mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"testuser\",\"password\":\"password\"}"))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        String jwt = objectMapper.readTree(loginResponse).get("jwt").asText();

        // 3. Create task
        String response = mockMvc.perform(post("/api/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\":\"My first task\"}")
                .header("Authorization", "Bearer " + jwt))
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        Task createdTask = objectMapper.readValue(response, Task.class);

        // 4. Get task by ID
        mockMvc.perform(get("/api/tasks/" + createdTask.getId())
                .header("Authorization", "Bearer " + jwt))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("My first task"));

        // 5. Update task
        mockMvc.perform(put("/api/tasks/" + createdTask.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\":\"Updated task\"}")
                .header("Authorization", "Bearer " + jwt))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Updated task"));

        // 6. Delete task
        mockMvc.perform(delete("/api/tasks/" + createdTask.getId())
                .header("Authorization", "Bearer " + jwt))
            .andExpect(status().isNoContent());
    }
}
