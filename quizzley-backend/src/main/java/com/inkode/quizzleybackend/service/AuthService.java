package com.inkode.quizzleybackend.service;

import com.inkode.quizzleybackend.config.JwtUtil;
import com.inkode.quizzleybackend.dto.LoginRequestDto;
import com.inkode.quizzleybackend.dto.LoginResponseDto;
import com.inkode.quizzleybackend.dto.RegisterRequestDto;
import com.inkode.quizzleybackend.model.User;
import com.inkode.quizzleybackend.repository.RoleRepository;
import com.inkode.quizzleybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /**
     * Authenticates a user by email + password and returns a JWT response.
     */
    public LoginResponseDto login(LoginRequestDto request) {
        // 1. Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        // 2. Verify BCrypt password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

        // 3. Look up the user's primary role from user_roles join table
        String role = roleRepository.findFirstRoleByUserId(user.getUserId())
                .orElse("STUDENT");

        // 4. Generate JWT
        String token = jwtUtil.generateToken(user.getEmail(), role, user.getUserId());

        return new LoginResponseDto(token, user.getEmail(), user.getFullName(), role, user.getUserId());
    }

    /**
     * Registers a new user, encoding the password before saving.
     */
    public User register(RegisterRequestDto request) {
        // Check for duplicate email
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "An account with this email already exists");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setIsActive(true);

        return userRepository.save(user);
    }
}
