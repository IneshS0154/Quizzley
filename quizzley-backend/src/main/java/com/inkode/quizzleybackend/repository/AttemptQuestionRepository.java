package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.AttemptQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttemptQuestionRepository extends JpaRepository<AttemptQuestion, Integer> {
    List<AttemptQuestion> findByAttemptAttemptIdOrderByQuestionOrderAsc(Integer attemptId);
}
