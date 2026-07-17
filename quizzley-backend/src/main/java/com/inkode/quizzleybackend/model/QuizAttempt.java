package com.inkode.quizzleybackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attempt_id")
    private Long attemptId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(name = "attempt_number", nullable = false)
    private Integer attemptNumber;

    @Column(name = "total_marks", nullable = false)
    private Double totalMarks;

    @Column(name = "obtained_marks", nullable = false)
    private Double obtainedMarks;

    @Column(name = "status", nullable = false)
    private String status;

    public QuizAttempt() {}

    public Long getAttemptId() { return attemptId; }
    public void setAttemptId(Long attemptId) { this.attemptId = attemptId; }

    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public Integer getAttemptNumber() { return attemptNumber; }
    public void setAttemptNumber(Integer attemptNumber) { this.attemptNumber = attemptNumber; }

    public Double getTotalMarks() { return totalMarks; }
    public void setTotalMarks(Double totalMarks) { this.totalMarks = totalMarks; }

    public Double getObtainedMarks() { return obtainedMarks; }
    public void setObtainedMarks(Double obtainedMarks) { this.obtainedMarks = obtainedMarks; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
