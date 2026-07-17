package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCreatedBy(Long userId);
=======
import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {
>>>>>>> Stashed changes
    List<Quiz> findByIsActiveTrue();
}
