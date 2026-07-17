package com.inkode.quizzleybackend.controller;

import com.inkode.quizzleybackend.dto.QuizDto;
<<<<<<< Updated upstream
import com.inkode.quizzleybackend.model.Quiz;
import com.inkode.quizzleybackend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
=======
import com.inkode.quizzleybackend.model.User;
import com.inkode.quizzleybackend.repository.UserRepository;
import com.inkode.quizzleybackend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
>>>>>>> Stashed changes
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
<<<<<<< Updated upstream
@RequestMapping("/api/admin/quizzes")
@CrossOrigin(origins = "http://localhost:5173")
=======
@RequestMapping("/api")
>>>>>>> Stashed changes
public class QuizController {

    @Autowired
    private QuizService quizService;

<<<<<<< Updated upstream
    /**
     * GET /api/admin/quizzes
     * Returns all quizzes.
     */
    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    /**
     * POST /api/admin/quizzes
     * Creates a new quiz from the request body DTO.
     */
    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizDto dto) {
        Quiz created = quizService.createQuiz(dto);
        return ResponseEntity.status(201).body(created);
    }

    /**
     * PUT /api/admin/quizzes/{id}
     * Updates an existing quiz by id.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody QuizDto dto) {
        Quiz updated = quizService.updateQuiz(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/admin/quizzes/{id}
     * Deletes a quiz by id.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
=======
    @Autowired
    private UserRepository userRepository;

    // --- Admin Endpoints ---

    @GetMapping("/admin/quizzes")
    public ResponseEntity<List<QuizDto>> getAllQuizzesForAdmin() {
        return ResponseEntity.ok(quizService.getAllQuizzesForAdmin());
    }

    @GetMapping("/admin/quizzes/{id}")
    public ResponseEntity<QuizDto> getQuizForAdmin(@PathVariable Integer id) {
        return ResponseEntity.ok(quizService.getQuizDetails(id));
    }

    @PostMapping("/admin/quizzes")
    public ResponseEntity<?> createOrUpdateQuiz(@RequestBody QuizDto dto, Authentication auth) {
        try {
            User creator = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Logged in user not found"));
            QuizDto saved = quizService.saveQuiz(dto, creator.getUserId());
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/admin/quizzes/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Integer id) {
        try {
            quizService.deleteQuiz(id);
            return ResponseEntity.ok("Quiz deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // --- Student Endpoints ---

    @GetMapping("/student/quizzes")
    public ResponseEntity<?> getQuizzesForStudent(Authentication auth) {
        try {
            User student = userRepository.findByEmail(auth.getName())
                    .orElseThrow(() -> new RuntimeException("Student user not found"));
            List<QuizDto> quizzes = quizService.getQuizzesForStudent(student.getUserId());
            return ResponseEntity.ok(quizzes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/student/quizzes/{id}")
    public ResponseEntity<?> getQuizForStudent(@PathVariable Integer id, Authentication auth) {
        try {
            // Retrieve details for student. Later, AttemptService handles the active session
            QuizDto details = quizService.getQuizDetails(id);
            // Hide answers for safety
            if (details.getQuestions() != null) {
                details.getQuestions().forEach(q -> {
                    if (q.getOptions() != null) {
                        q.getOptions().forEach(opt -> opt.setIsCorrect(false));
                    }
                    q.setExplanation(null);
                    q.setHint(null);
                });
            }
            return ResponseEntity.ok(details);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
>>>>>>> Stashed changes
    }
}
