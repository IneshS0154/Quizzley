package com.inkode.quizzleybackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"quiz_id", "student_id", "attempt_number"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAttempt {

    public enum AttemptStatus {
        IN_PROGRESS, SUBMITTED, AUTO_SUBMITTED, CANCELLED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_id")
    private Integer attemptId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(name = "attempt_number", nullable = false)
    private Integer attemptNumber;

    @Column(name = "started_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime startedAt;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(name = "time_taken_seconds")
    private Integer timeTakenSeconds;

    @Column(name = "total_marks", nullable = false, precision = 8, scale = 2)
    private BigDecimal totalMarks = BigDecimal.ZERO;

    @Column(name = "obtained_marks", nullable = false, precision = 8, scale = 2)
    private BigDecimal obtainedMarks = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AttemptStatus status = AttemptStatus.IN_PROGRESS;

    @Column(name = "auto_submitted", nullable = false)
    private Boolean autoSubmitted = false;
}
