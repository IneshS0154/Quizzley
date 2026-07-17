package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.QuizAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizAssignmentRepository extends JpaRepository<QuizAssignment, Integer> {
    List<QuizAssignment> findBySpecializationSpecializationIdAndBatchBatchId(Integer specializationId, Integer batchId);
}
