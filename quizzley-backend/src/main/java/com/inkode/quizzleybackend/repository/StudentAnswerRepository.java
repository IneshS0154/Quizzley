package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Integer> {
    List<StudentAnswer> findByAttemptAttemptId(Integer attemptId);
    Optional<StudentAnswer> findByAttemptAttemptIdAndQuestionQuestionId(Integer attemptId, Integer questionId);
}
