package com.inkode.quizzleybackend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "attempt_questions", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"attempt_id", "question_id"}),
    @UniqueConstraint(columnNames = {"attempt_id", "question_order"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttemptQuestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_question_id")
    private Integer attemptQuestionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attempt_id", nullable = false)
    private QuizAttempt attempt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(name = "question_order", nullable = false)
    private Integer questionOrder;
}
