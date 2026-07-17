package com.inkode.quizzleybackend.dto;

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
}
