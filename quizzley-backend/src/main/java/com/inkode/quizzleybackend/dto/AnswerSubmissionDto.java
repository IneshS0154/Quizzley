package com.inkode.quizzleybackend.dto;

import lombok.Data;

@Data
public class AnswerSubmissionDto {
    private Integer questionId;
    private Integer selectedOptionId;
    private String writtenAnswer;
}
