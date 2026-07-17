package com.inkode.quizzleybackend.config;

import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
<<<<<<< Updated upstream
=======
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
>>>>>>> Stashed changes
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
<<<<<<< Updated upstream
import java.util.List;
=======
import java.util.Collections;
>>>>>>> Stashed changes

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
<<<<<<< Updated upstream
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
=======
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
>>>>>>> Stashed changes
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
<<<<<<< Updated upstream
            DecodedJWT decoded = jwtUtil.validateToken(token);

            if (decoded != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                String email = decoded.getSubject();
                String role = decoded.getClaim("role").asString();

                // Prefix role with ROLE_ if not already present (Spring Security convention)
                String authority = (role != null && role.startsWith("ROLE_")) ? role : "ROLE_" + role;

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                List.of(new SimpleGrantedAuthority(authority))
                        );

                SecurityContextHolder.getContext().setAuthentication(authentication);
=======
            try {
                DecodedJWT jwt = jwtUtil.validateToken(token);
                String email = jwtUtil.getEmailFromToken(jwt);
                String role = jwtUtil.getRoleFromToken(jwt);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))
                    );
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            } catch (Exception e) {
                // Token verification failed, do not set context (user will be unauthenticated)
>>>>>>> Stashed changes
            }
        }

        filterChain.doFilter(request, response);
    }
}
