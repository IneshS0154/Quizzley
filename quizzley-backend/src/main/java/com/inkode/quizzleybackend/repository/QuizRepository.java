package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.entity.QuizEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<QuizEntity, Integer> {

    @Query("SELECT q FROM QuizEntity q JOIN QuizAssignmentEntity qa ON qa.quiz.id = q.id " +
           "WHERE q.isActive = true AND q.isTemporarilyDisabled = false " +
           "AND qa.specialization.id = :specializationId AND qa.batch.id = :batchId " +
           "AND (q.availableFrom IS NULL OR q.availableFrom <= :now) " +
           "AND (q.availableUntil IS NULL OR q.availableUntil >= :now) " +
           "AND q.id NOT IN (SELECT qat.quiz.id FROM QuizAttemptEntity qat WHERE qat.student.id = :studentId AND qat.status IN (com.inkode.quizzleybackend.entity.QuizAttemptEntity.AttemptStatus.SUBMITTED, com.inkode.quizzleybackend.entity.QuizAttemptEntity.AttemptStatus.AUTO_SUBMITTED))")
    List<QuizEntity> findActiveQuizzesForStudent(Integer studentId, Integer specializationId, Integer batchId, LocalDateTime now);

    @Query("SELECT q FROM QuizEntity q JOIN QuizAssignmentEntity qa ON qa.quiz.id = q.id " +
           "WHERE q.isActive = true AND q.isTemporarilyDisabled = false " +
           "AND qa.specialization.id = :specializationId AND qa.batch.id = :batchId " +
           "AND q.availableFrom > :now")
    List<QuizEntity> findUpcomingQuizzesForStudent(Integer specializationId, Integer batchId, LocalDateTime now);

    @Query("SELECT COUNT(q) FROM QuizEntity q JOIN QuizAssignmentEntity qa ON qa.quiz.id = q.id " +
           "WHERE q.isActive = true AND q.isTemporarilyDisabled = false " +
           "AND qa.specialization.id = :specializationId AND qa.batch.id = :batchId " +
           "AND q.availableFrom > :now")
    long countUpcomingQuizzesForStudent(Integer specializationId, Integer batchId, LocalDateTime now);

    @Query("SELECT q FROM QuizEntity q JOIN QuizAssignmentEntity qa ON qa.quiz.id = q.id " +
           "WHERE q.isActive = true AND q.isTemporarilyDisabled = false " +
           "AND qa.specialization.id = :specializationId AND qa.batch.id = :batchId " +
           "AND q.availableUntil < :now " +
           "AND q.id NOT IN (SELECT qat.quiz.id FROM QuizAttemptEntity qat WHERE qat.student.id = :studentId AND qat.status IN (com.inkode.quizzleybackend.entity.QuizAttemptEntity.AttemptStatus.SUBMITTED, com.inkode.quizzleybackend.entity.QuizAttemptEntity.AttemptStatus.AUTO_SUBMITTED))")
    List<QuizEntity> findMissedQuizzesForStudent(Integer studentId, Integer specializationId, Integer batchId, LocalDateTime now);

    @Query("SELECT COUNT(q) FROM QuizEntity q JOIN QuizAssignmentEntity qa ON qa.quiz.id = q.id " +
           "WHERE q.isActive = true AND q.isTemporarilyDisabled = false " +
           "AND qa.specialization.id = :specializationId AND qa.batch.id = :batchId " +
           "AND q.availableUntil < :now " +
           "AND q.id NOT IN (SELECT qat.quiz.id FROM QuizAttemptEntity qat WHERE qat.student.id = :studentId AND qat.status IN (com.inkode.quizzleybackend.entity.QuizAttemptEntity.AttemptStatus.SUBMITTED, com.inkode.quizzleybackend.entity.QuizAttemptEntity.AttemptStatus.AUTO_SUBMITTED))")
    long countMissedQuizzesForStudent(Integer studentId, Integer specializationId, Integer batchId, LocalDateTime now);

    @Query(value = "SELECT COUNT(*) FROM questions WHERE quiz_id = :quizId AND is_active = true", nativeQuery = true)
    long countQuestionsByQuizId(Integer quizId);
}

