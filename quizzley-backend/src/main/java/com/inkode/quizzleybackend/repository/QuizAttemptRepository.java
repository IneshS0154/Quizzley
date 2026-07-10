package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.entity.QuizAttemptEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttemptEntity, Integer> {
    
    List<QuizAttemptEntity> findByStudentIdOrderByStartedAtDesc(Integer studentId);

    List<QuizAttemptEntity> findByStudentIdAndStatusIn(Integer studentId, List<QuizAttemptEntity.AttemptStatus> statuses);
    
    long countByStudentIdAndStatusIn(Integer studentId, List<QuizAttemptEntity.AttemptStatus> statuses);
}
