package com.inkode.quizzleybackend.controller;

<<<<<<< Updated upstream
import com.inkode.quizzleybackend.dto.LoginRequestDto;
import com.inkode.quizzleybackend.dto.LoginResponseDto;
import com.inkode.quizzleybackend.dto.RegisterRequestDto;
import com.inkode.quizzleybackend.model.User;
import com.inkode.quizzleybackend.service.AuthService;
=======
import com.inkode.quizzleybackend.dto.LoginRequest;
import com.inkode.quizzleybackend.dto.LoginResponse;
import com.inkode.quizzleybackend.dto.RegisterRequest;
import com.inkode.quizzleybackend.dto.UserDto;
import com.inkode.quizzleybackend.service.UserService;
>>>>>>> Stashed changes
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
<<<<<<< Updated upstream
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
=======
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            UserDto registered = userService.registerUser(request);
            return ResponseEntity.ok(registered);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = userService.authenticateUser(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
>>>>>>> Stashed changes
    }
}
