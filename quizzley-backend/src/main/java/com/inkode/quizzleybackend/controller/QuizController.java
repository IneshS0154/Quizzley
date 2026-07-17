package com.inkode.quizzleybackend.controller;

import com.inkode.quizzleybackend.dto.QuizDto;
import com.inkode.quizzleybackend.model.Quiz;
import com.inkode.quizzleybackend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/quizzes")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    @Autowired
    private QuizService quizService;

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
     * GET /api/admin/quizzes/{id}
     * Returns a single quiz by id, including questions and options.
     */
    @GetMapping("/{id}")
    public ResponseEntity<QuizDto> getQuizById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizById(id));
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
    }
}
