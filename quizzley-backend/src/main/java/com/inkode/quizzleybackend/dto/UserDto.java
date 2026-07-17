package com.inkode.quizzleybackend.dto;

import lombok.Data;
import java.util.Set;

@Data
public class UserDto {
    private Integer userId;
    private String fullName;
    private String email;
    private String role; // STUDENT, ADMIN, QUIZ_MANAGER
    private Integer specializationId;
    private String specializationName;
    private Integer batchId;
    private String batchName;
}
