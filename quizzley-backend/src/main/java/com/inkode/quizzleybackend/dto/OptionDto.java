package com.inkode.quizzleybackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OptionDto {
    private Integer optionId;
    private Integer questionId;
    private String optionText;
    private Boolean isCorrect;
}
