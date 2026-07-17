package com.inkode.quizzleybackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_answers", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"attempt_id", "question_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Integer answerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attempt_id", nullable = false)
    private QuizAttempt attempt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "selected_option_id")
    private QuestionOption selectedOption;

    @Column(name = "written_answer", columnDefinition = "TEXT")
    private String writtenAnswer;

    @Column(name = "is_correct")
    private Boolean isCorrect;

    @Column(name = "marks_awarded", nullable = false, precision = 6, scale = 2)
    private BigDecimal marksAwarded = BigDecimal.ZERO;

    @Column(name = "answered_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime answeredAt;
}
