package com.inkode.quizzleybackend.model;

/**
 * A database-agnostic representation of a user.
 * This class is used across the security and controller layers
 * to decouple the auth system from specific JPA/database entities.
 */
public record User(
    String email,
    String name,
    String role,
    String password
) {}
