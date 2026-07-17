package com.inkode.quizzleybackend.controller;

import com.inkode.quizzleybackend.dto.AttemptResponseDto;
import com.inkode.quizzleybackend.dto.SubmitAttemptRequest;
import com.inkode.quizzleybackend.model.QuizAttempt;
import com.inkode.quizzleybackend.model.User;
import com.inkode.quizzleybackend.repository.UserRepository;
import com.inkode.quizzleybackend.service.AttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student/attempts")
public class AttemptController {

    @Autowired
    private AttemptService attemptService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/start")
    public ResponseEntity<?> startAttempt(@RequestParam Integer quizId, Authentication auth) {
        try {
            User student = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Student not found"));
            AttemptResponseDto attempt = attemptService.startAttempt(quizId, student.getUserId());
            return ResponseEntity.ok(attempt);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitAttempt(@RequestBody SubmitAttemptRequest request) {
        try {
            QuizAttempt completed = attemptService.submitAttempt(request);
            return ResponseEntity.ok(completed);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAttempts(Authentication auth) {
        try {
            User student = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Student not found"));
            List<QuizAttempt> attempts = attemptService.getStudentAttempts(student.getUserId());
            return ResponseEntity.ok(attempts);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
