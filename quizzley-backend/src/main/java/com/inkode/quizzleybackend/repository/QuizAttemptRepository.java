package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Integer> {
    List<QuizAttempt> findByStudentUserId(Integer studentId);
    List<QuizAttempt> findByQuizQuizId(Integer quizId);
    Optional<QuizAttempt> findFirstByQuizQuizIdAndStudentUserIdOrderByAttemptNumberDesc(Integer quizId, Integer studentId);
}
