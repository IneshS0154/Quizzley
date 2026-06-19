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
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public DummyUserServiceImpl() {
        mockUsers.put("admin@quizzley.com", new User(
                "admin@quizzley.com",
                "System Admin",
                "ADMIN",
                encoder.encode("admin123")
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

    @Override
    public User registerUser(String email, String name, String password) {
        if (mockUsers.containsKey(email)) {
            throw new IllegalArgumentException("User with this email already exists.");
        }
        User user = new User(email, name, "STUDENT", encoder.encode(password));
        mockUsers.put(email, user);
        return user;
    }
}
