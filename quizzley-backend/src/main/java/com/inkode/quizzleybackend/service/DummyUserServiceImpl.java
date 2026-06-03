package com.inkode.quizzleybackend.service;

import com.inkode.quizzleybackend.model.User;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * A temporary mock implementation of {@link UserService}.
 * This is annotated with @Primary to be injected by default until
 * the database developer implements the repository-based service.
 */
@Service
@Primary
public class DummyUserServiceImpl implements UserService {

    private final Map<String, User> mockUsers = new HashMap<>();

    public DummyUserServiceImpl() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Seed default credentials for testing and development
        mockUsers.put("user@example.com", new User(
                "user@example.com",
                "Regular User",
                "USER",
                encoder.encode("password")
        ));
        
        mockUsers.put("admin@example.com", new User(
                "admin@example.com",
                "Administrator",
                "ADMIN",
                encoder.encode("adminpassword")
        ));
    }

    @Override
    public String getUserRole(String email) {
        User user = mockUsers.get(email);
        return user != null ? user.role() : "USER";
    }

    @Override
    public User getOrCreateGoogleUser(String email, String name) {
        return mockUsers.computeIfAbsent(email, k -> new User(
                email,
                name,
                "USER",
                null // OAuth users have no password
        ));
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return Optional.ofNullable(mockUsers.get(email));
    }
}
