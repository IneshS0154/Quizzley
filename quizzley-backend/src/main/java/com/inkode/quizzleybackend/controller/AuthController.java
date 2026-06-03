package com.inkode.quizzleybackend.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.inkode.quizzleybackend.model.User;
import com.inkode.quizzleybackend.security.GoogleTokenVerifier;
import com.inkode.quizzleybackend.security.JwtService;
import com.inkode.quizzleybackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for handling authentication requests (login and Google login).
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final GoogleTokenVerifier googleTokenVerifier;
    private final JwtService jwtService;
    private final UserService userService;

    public AuthController(
            AuthenticationManager authenticationManager,
            GoogleTokenVerifier googleTokenVerifier,
            JwtService jwtService,
            UserService userService
    ) {
        this.authenticationManager = authenticationManager;
        this.googleTokenVerifier = googleTokenVerifier;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    /**
     * Authenticates a user with email and password.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        if (authentication.isAuthenticated()) {
            String role = userService.getUserRole(request.email());
            String token = jwtService.generateToken(request.email(), role);
            return ResponseEntity.ok(new AuthResponse(token, role));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    /**
     * Authenticates a user via their Google ID Token.
     */
    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleLoginRequest request) {
        try {
            GoogleIdToken.Payload payload = googleTokenVerifier.verify(request.idToken());
            String email = payload.getEmail();
            String name = (String) payload.get("name");

            // Retrieve or create the user in our system
            User user = userService.getOrCreateGoogleUser(email, name);

            String token = jwtService.generateToken(user.email(), user.role());
            return ResponseEntity.ok(new AuthResponse(token, user.role()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    // Request/Response DTO records
    public record LoginRequest(String email, String password) {}
    public record GoogleLoginRequest(String idToken) {}
    public record AuthResponse(String token, String role) {}
}
