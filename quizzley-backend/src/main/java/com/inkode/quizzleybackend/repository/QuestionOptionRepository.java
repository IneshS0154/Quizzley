package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.QuestionOption;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {
=======
import java.util.List;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Integer> {
    List<QuestionOption> findByQuestionQuestionId(Integer questionId);
>>>>>>> Stashed changes
}
