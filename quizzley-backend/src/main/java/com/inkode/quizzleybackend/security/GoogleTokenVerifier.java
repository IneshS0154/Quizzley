package com.inkode.quizzleybackend.security;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

/**
 * Service to verify the integrity and validity of Google ID Tokens
 * received from the frontend Google OAuth2 authentication flow.
 */
@Service
public class GoogleTokenVerifier {

    private final GoogleIdTokenVerifier verifier;

    public GoogleTokenVerifier(@Value("${google.client.id}") String clientId) {
        NetHttpTransport transport = new NetHttpTransport();
        GsonFactory jsonFactory = GsonFactory.getDefaultInstance();
        
        this.verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(clientId))
                .build();
    }

    /**
     * Verifies the Google ID token and returns its payload containing user details.
     *
     * @param idTokenString the raw Google ID token string
     * @return the payload of the verified ID token
     * @throws GeneralSecurityException if verification fails
     * @throws IOException              if communication with Google servers fails
     * @throws IllegalArgumentException if the token is null or invalid
     */
    public GoogleIdToken.Payload verify(String idTokenString) throws GeneralSecurityException, IOException {
        if (idTokenString == null || idTokenString.trim().isEmpty()) {
            throw new IllegalArgumentException("Google ID Token string cannot be null or empty");
        }
        
        GoogleIdToken idToken = verifier.verify(idTokenString);
        if (idToken == null) {
            throw new IllegalArgumentException("Invalid Google ID Token");
        }
        
        return idToken.getPayload();
    }
}
