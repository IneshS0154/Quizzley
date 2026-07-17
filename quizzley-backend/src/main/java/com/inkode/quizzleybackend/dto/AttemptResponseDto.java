package com.inkode.quizzleybackend.dto;

import lombok.Data;
import java.util.List;

@Data
public class AttemptResponseDto {
    private Integer attemptId;
    private Integer quizId;
    private String title;
    private Integer timerMinutes;
    private Boolean focusModeEnabled;
    private List<QuestionDto> questions;
}
