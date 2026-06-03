package com.inkode.quizzleybackend.security;

import com.inkode.quizzleybackend.service.UserService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * Custom implementation of {@link UserDetailsService} to load user details
 * from our database layer (via {@link UserService}) for local authentication.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;

    public CustomUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService.getUserByEmail(username)
                .map(user -> {
                    // Ensure role authority starts with ROLE_
                    String role = user.role();
                    String authorityRole = role.startsWith("ROLE_") ? role : "ROLE_" + role;
                    
                    return new org.springframework.security.core.userdetails.User(
                            user.email(),
                            user.password() != null ? user.password() : "",
                            Collections.singletonList(new SimpleGrantedAuthority(authorityRole))
                    );
                })
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }
}
