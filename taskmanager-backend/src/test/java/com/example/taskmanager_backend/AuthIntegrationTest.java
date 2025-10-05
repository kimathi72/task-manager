package com.example.taskmanager_backend;

import com.example.taskmanager_backend.model.Task;
import com.example.taskmanager_backend.model.User;
import com.example.taskmanager_backend.repository.TaskRepository;
import com.example.taskmanager_backend.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthIntegrationTest {


@Autowired
private MockMvc mockMvc;

@Autowired
private UserRepository userRepository;

@Autowired
private TaskRepository taskRepository;

@Autowired
private PasswordEncoder passwordEncoder;

@Autowired
private ObjectMapper objectMapper;

private String jwtToken;

@BeforeEach
void setUp() throws Exception {
    taskRepository.deleteAll();
    userRepository.deleteAll();

    // Create a real user
    User user = new User();
    user.setUsername("integrationuser");
    user.setPassword(passwordEncoder.encode("secret"));
    userRepository.save(user);

    // Perform login to get JWT
    String loginPayload = """
            { "username": "integrationuser", "password": "secret" }
            """;

    String loginResponse = mockMvc.perform(post("/api/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(loginPayload))
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

    JsonNode json = objectMapper.readTree(loginResponse);
    jwtToken = json.get("jwt").asText();
}

@Test
void testTaskCrudFlow() throws Exception {
    // CREATE Task
    Task newTask = new Task();
    newTask.setTitle("Test Task");
    newTask.setDescription("Task for integration test");

    MvcResult createResult = mockMvc.perform(post("/api/tasks")
                    .header("Authorization", "Bearer " + jwtToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(newTask)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.title").value("Test Task"))
            .andReturn();

    String createResponse = createResult.getResponse().getContentAsString();
    Task createdTask = objectMapper.readValue(createResponse, Task.class);
    Long taskId = createdTask.getId();

    // READ Task
    mockMvc.perform(get("/api/tasks/" + taskId)
                    .header("Authorization", "Bearer " + jwtToken))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Test Task"));

    // UPDATE Task
    createdTask.setTitle("Updated Task");
    createdTask.setDescription("Updated description");

    mockMvc.perform(put("/api/tasks/" + taskId)
                    .header("Authorization", "Bearer " + jwtToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(createdTask)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("Updated Task"));

    // DELETE Task
    mockMvc.perform(delete("/api/tasks/" + taskId)
                    .header("Authorization", "Bearer " + jwtToken))
            .andExpect(status().isNoContent());

    // VERIFY deletion
    mockMvc.perform(get("/api/tasks/" + taskId)
                    .header("Authorization", "Bearer " + jwtToken))
            .andExpect(status().isNotFound());
}


}
