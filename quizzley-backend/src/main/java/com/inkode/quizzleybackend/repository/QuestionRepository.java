package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
=======
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByQuizQuizId(Integer quizId);
>>>>>>> Stashed changes
}
