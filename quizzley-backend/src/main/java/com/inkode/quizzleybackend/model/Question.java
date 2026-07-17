package com.inkode.quizzleybackend.model;

import jakarta.persistence.*;
<<<<<<< Updated upstream
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;
=======
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    public enum QuestionType {
        MCQ, TRUE_FALSE, SHORT_ANSWER, ESSAY
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer questionId;
>>>>>>> Stashed changes

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(name = "question_text", nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Enumerated(EnumType.STRING)
<<<<<<< Updated upstream
    @Column(name = "question_type", nullable = false, length = 20)
    private QuestionType questionType;

    @Column(name = "marks", nullable = false)
    private Double marks = 1.0;

    @Column(name = "hint", columnDefinition = "TEXT")
    private String hint;

    @Column(name = "explanation", columnDefinition = "TEXT")
=======
    @Column(name = "question_type", nullable = false)
    private QuestionType questionType;

    @Column(nullable = false, precision = 6, scale = 2)
    private BigDecimal marks = BigDecimal.valueOf(1.00);

    @Column(columnDefinition = "TEXT")
    private String hint;

    @Column(columnDefinition = "TEXT")
>>>>>>> Stashed changes
    private String explanation;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

<<<<<<< Updated upstream
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionOption> options = new ArrayList<>();

    public enum QuestionType {
        MCQ, TRUE_FALSE, SHORT_ANSWER, ESSAY
    }

    public Question() {}

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public QuestionType getQuestionType() { return questionType; }
    public void setQuestionType(QuestionType questionType) { this.questionType = questionType; }

    public Double getMarks() { return marks; }
    public void setMarks(Double marks) { this.marks = marks; }

    public String getHint() { return hint; }
    public void setHint(String hint) { this.hint = hint; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public List<QuestionOption> getOptions() { return options; }
    public void setOptions(List<QuestionOption> options) { this.options = options; }
=======
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
>>>>>>> Stashed changes
}
