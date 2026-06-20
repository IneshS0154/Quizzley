package com.inkode.quizzleybackend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationMs;

    /**
     * Generates a signed JWT containing email, role, and userId claims.
     */
    public String generateToken(String email, String role, Long userId) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        return JWT.create()
                .withSubject(email)
                .withClaim("role", role)
                .withClaim("userId", userId)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationMs))
                .sign(algorithm);
    }

    /**
     * Validates a JWT string. Returns DecodedJWT on success, null on failure.
     */
    public DecodedJWT validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    /**
     * Extracts the email (subject) from the token.
     */
    public String getEmail(String token) {
        DecodedJWT decoded = validateToken(token);
        return decoded != null ? decoded.getSubject() : null;
    }

    /**
     * Extracts the role claim from the token.
     */
    public String getRole(String token) {
        DecodedJWT decoded = validateToken(token);
        return decoded != null ? decoded.getClaim("role").asString() : null;
    }

    /**
     * Extracts the userId claim from the token.
     */
    public Long getUserId(String token) {
        DecodedJWT decoded = validateToken(token);
        return decoded != null ? decoded.getClaim("userId").asLong() : null;
    }
}
