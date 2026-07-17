package com.inkode.quizzleybackend.service;

import com.inkode.quizzleybackend.config.JwtUtil;
import com.inkode.quizzleybackend.dto.LoginRequest;
import com.inkode.quizzleybackend.dto.LoginResponse;
import com.inkode.quizzleybackend.dto.RegisterRequest;
import com.inkode.quizzleybackend.dto.UserDto;
import com.inkode.quizzleybackend.model.*;
import com.inkode.quizzleybackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private SpecializationRepository specializationRepository;

    @Autowired
    private BatchRepository batchRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    public UserDto registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use.");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setIsActive(true);

        if (request.getSpecializationId() != null) {
            Specialization spec = specializationRepository.findById(request.getSpecializationId())
                    .orElseThrow(() -> new RuntimeException("Specialization not found"));
            user.setSpecialization(spec);
        }

        if (request.getBatchId() != null) {
            Batch batch = batchRepository.findById(request.getBatchId())
                    .orElseThrow(() -> new RuntimeException("Batch not found"));
            user.setBatch(batch);
        }

        String roleName = request.getRole() != null ? request.getRole().toUpperCase() : "STUDENT";
        Role role = roleRepository.findByRoleName(roleName)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setRoleName(roleName);
                    return roleRepository.save(newRole);
                });

        user.setRoles(Collections.singleton(role));
        User savedUser = userRepository.save(user);

        return convertToDto(savedUser);
    }

    public LoginResponse authenticateUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password.");
        }

        String role = user.getRoles().stream()
                .map(Role::getRoleName)
                .findFirst()
                .orElse("STUDENT");

        String token = jwtUtil.generateToken(user.getEmail(), role, user.getUserId());

        return new LoginResponse(token, convertToDto(user));
    }

    public UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setUserId(user.getUserId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        
        String roleName = user.getRoles().stream()
                .map(Role::getRoleName)
                .findFirst()
                .orElse("STUDENT");
        dto.setRole(roleName);

        if (user.getSpecialization() != null) {
            dto.setSpecializationId(user.getSpecialization().getSpecializationId());
            dto.setSpecializationName(user.getSpecialization().getSpecializationName());
        }

        if (user.getBatch() != null) {
            dto.setBatchId(user.getBatch().getBatchId());
            dto.setBatchName(user.getBatch().getBatchName());
        }

        return dto;
    }
}
