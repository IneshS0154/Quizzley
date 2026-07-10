package com.inkode.quizzleybackend.service;

import com.inkode.quizzleybackend.model.User;
import java.util.Optional;

/**
 * Service interface for managing user data operations.
 * This is designed to be implemented by the database developer.
 */
public interface UserService {

    /**
     * Retrieves the role of the user associated with the given email.
     *
     * @param email the email of the user
     * @return the user's role (e.g., "USER", "ADMIN", "ROLE_USER")
     */
    String getUserRole(String email);

    /**
     * Retrieves an existing user or creates a new one using Google OAuth details.
     *
     * @param email the email of the Google user
     * @param name  the display name of the Google user
     * @return the User object (existing or newly created)
     */
    User getOrCreateGoogleUser(String email, String name);

    /**
     * Retrieves a user by their email address.
     * Required for Spring Security user details lookup during standard authentication.
     *
     * @param email the email of the user
     * @return an Optional containing the User if found, or empty otherwise
     */
    Optional<User> getUserByEmail(String email);

    /**
     * Registers a new user with standard credentials.
     *
     * @param fullName the user's full name
     * @param email    the user's email
     * @param password the user's plain text password
     * @return the registered User
     */
    User registerUser(String fullName, String email, String password);
}

