package com.inkode.quizzleybackend.dto;

<<<<<<< Updated upstream
import java.util.List;

public class QuestionDto {
    private String text;
    private String type; // MCQ or TRUE_FALSE
    private Double marks;
    private List<QuestionOptionDto> options;

    public QuestionDto() {}

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Double getMarks() { return marks; }
    public void setMarks(Double marks) { this.marks = marks; }

    public List<QuestionOptionDto> getOptions() { return options; }
    public void setOptions(List<QuestionOptionDto> options) { this.options = options; }
=======
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDto {
    private Integer questionId;
    private Integer quizId;
    private String questionText;
    private String questionType; // MCQ, TRUE_FALSE, SHORT_ANSWER, ESSAY
    private BigDecimal marks;
    private String hint;
    private String explanation;
    private List<OptionDto> options;
>>>>>>> Stashed changes
}
