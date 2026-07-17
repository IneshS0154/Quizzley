package com.inkode.quizzleybackend.dto;

import lombok.Data;
import java.util.List;

@Data
public class SubmitAttemptRequest {
    private Integer attemptId;
    private List<AnswerSubmissionDto> answers;
}
