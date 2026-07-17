package com.inkode.quizzleybackend.dto;

<<<<<<< Updated upstream
import java.time.LocalDateTime;
import java.util.List;

public class QuizDto {
    private Long quizId;
    private Long moduleId;
    private String title;
    private String description;
    private String quizType;
    private Integer timerMinutes;
    private Boolean focusModeEnabled;
    private Boolean isActive;
    private LocalDateTime availableFrom;
    private LocalDateTime availableUntil;

    // Added fields to match frontend payload layout
    private String moduleCode;
    private String batch;
    private Boolean focusMode;
    private String status;
    private List<QuestionDto> questions;

    public QuizDto() {}

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public Long getModuleId() { return moduleId; }
    public void setModuleId(Long moduleId) { this.moduleId = moduleId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getQuizType() { return quizType; }
    public void setQuizType(String quizType) { this.quizType = quizType; }

    public Integer getTimerMinutes() { return timerMinutes; }
    public void setTimerMinutes(Integer timerMinutes) { this.timerMinutes = timerMinutes; }

    public Boolean getFocusModeEnabled() { return focusModeEnabled; }
    public void setFocusModeEnabled(Boolean focusModeEnabled) { this.focusModeEnabled = focusModeEnabled; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getAvailableFrom() { return availableFrom; }
    public void setAvailableFrom(LocalDateTime availableFrom) { this.availableFrom = availableFrom; }

    public LocalDateTime getAvailableUntil() { return availableUntil; }
    public void setAvailableUntil(LocalDateTime availableUntil) { this.availableUntil = availableUntil; }

    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }

    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }

    public Boolean getFocusMode() { return focusMode; }
    public void setFocusMode(Boolean focusMode) { this.focusMode = focusMode; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<QuestionDto> getQuestions() { return questions; }
    public void setQuestions(List<QuestionDto> questions) { this.questions = questions; }
=======
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizDto {
    private Integer quizId;
    private Integer moduleId;
    private String moduleName;
    private String moduleCode;
    private Integer createdBy;
    private String createdByName;
    private String title;
    private String description;
    private String quizType; // PRACTICE, MOCK, GROUP
    private Integer timerMinutes;
    private Boolean focusModeEnabled;
    private Boolean isActive;
    private Boolean isTemporarilyDisabled;
    private LocalDateTime availableFrom;
    private LocalDateTime availableUntil;
    
    // Assignment Targets
    private Integer specializationId;
    private String specializationName;
    private Integer batchId;
    private String batchName;

    // Analytics stats
    private Integer participationCount = 0;
    private Integer totalParticipants = 0;

    private List<QuestionDto> questions;
>>>>>>> Stashed changes
}
