package com.inkode.quizzleybackend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private String role; // STUDENT, ADMIN, QUIZ_MANAGER
    private Integer specializationId;
    private Integer batchId;
}
