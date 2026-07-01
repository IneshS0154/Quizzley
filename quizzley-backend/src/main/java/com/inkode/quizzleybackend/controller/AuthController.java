package com.inkode.quizzleybackend.controller;

import com.inkode.quizzleybackend.dto.LoginRequestDto;
import com.inkode.quizzleybackend.dto.LoginResponseDto;
import com.inkode.quizzleybackend.dto.RegisterRequestDto;
import com.inkode.quizzleybackend.dto.UpdateProfileDto;
import com.inkode.quizzleybackend.model.User;
import com.inkode.quizzleybackend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * POST /api/auth/login
     * Authenticates a user and returns a JWT + user info.
     */
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto request) {
        LoginResponseDto response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/auth/register
     * Registers a new user and returns the saved User entity.
     */
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequestDto request) {
        User savedUser = authService.register(request);
        return ResponseEntity.status(201).body(savedUser);
    }

    /**
     * PUT /api/auth/profile/{userId}
     * Updates profile details for user and returns updated login response.
     */
    @PutMapping("/profile/{userId}")
    public ResponseEntity<LoginResponseDto> updateProfile(
            @PathVariable Long userId,
            @RequestBody UpdateProfileDto request) {
        LoginResponseDto response = authService.updateProfile(userId, request);
        return ResponseEntity.ok(response);
    }
}
