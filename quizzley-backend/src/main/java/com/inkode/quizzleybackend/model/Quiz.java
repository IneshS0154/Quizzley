package com.inkode.quizzleybackend.model;

import jakarta.persistence.*;
<<<<<<< Updated upstream
=======
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

>>>>>>> Stashed changes
import java.time.LocalDateTime;

@Entity
@Table(name = "quizzes")
<<<<<<< Updated upstream
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Long quizId;
=======
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {

    public enum QuizType {
        PRACTICE, MOCK, GROUP
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Integer quizId;
>>>>>>> Stashed changes

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "module_id", nullable = false)
    private Module module;

<<<<<<< Updated upstream
    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "title", nullable = false, length = 200)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "quiz_type", length = 20)
=======
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "quiz_type", nullable = false)
>>>>>>> Stashed changes
    private QuizType quizType;

    @Column(name = "timer_minutes")
    private Integer timerMinutes;

<<<<<<< Updated upstream
    @Column(name = "focus_mode_enabled")
    private Boolean focusModeEnabled = false;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "is_temporarily_disabled")
=======
    @Column(name = "focus_mode_enabled", nullable = false)
    private Boolean focusModeEnabled = false;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "is_temporarily_disabled", nullable = false)
>>>>>>> Stashed changes
    private Boolean isTemporarilyDisabled = false;

    @Column(name = "available_from")
    private LocalDateTime availableFrom;

    @Column(name = "available_until")
    private LocalDateTime availableUntil;

<<<<<<< Updated upstream
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum QuizType {
        PRACTICE, MOCK, GROUP
    }

    public Quiz() {}

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isActive == null) isActive = true;
        if (focusModeEnabled == null) focusModeEnabled = false;
        if (isTemporarilyDisabled == null) isTemporarilyDisabled = false;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ---- Getters and Setters ----

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public Module getModule() { return module; }
    public void setModule(Module module) { this.module = module; }

    public Long getModuleId() { return module != null ? module.getModuleId() : null; }

    public Long getCreatedBy() { return createdBy; }
    public void setCreatedBy(Long createdBy) { this.createdBy = createdBy; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public QuizType getQuizType() { return quizType; }
    public void setQuizType(QuizType quizType) { this.quizType = quizType; }

    public Integer getTimerMinutes() { return timerMinutes; }
    public void setTimerMinutes(Integer timerMinutes) { this.timerMinutes = timerMinutes; }

    public Boolean getFocusModeEnabled() { return focusModeEnabled; }
    public void setFocusModeEnabled(Boolean focusModeEnabled) { this.focusModeEnabled = focusModeEnabled; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Boolean getIsTemporarilyDisabled() { return isTemporarilyDisabled; }
    public void setIsTemporarilyDisabled(Boolean isTemporarilyDisabled) { this.isTemporarilyDisabled = isTemporarilyDisabled; }

    public LocalDateTime getAvailableFrom() { return availableFrom; }
    public void setAvailableFrom(LocalDateTime availableFrom) { this.availableFrom = availableFrom; }

    public LocalDateTime getAvailableUntil() { return availableUntil; }
    public void setAvailableUntil(LocalDateTime availableUntil) { this.availableUntil = availableUntil; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
=======
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updatedAt;
>>>>>>> Stashed changes
}
