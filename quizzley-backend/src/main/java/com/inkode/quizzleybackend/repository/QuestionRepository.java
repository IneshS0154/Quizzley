package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizQuizId(Long quizId);
}
