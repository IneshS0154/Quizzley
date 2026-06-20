package com.inkode.quizzleybackend.dto;

public class QuestionOptionDto {
    private String text;
    private Boolean correct;

    public QuestionOptionDto() {}

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public Boolean getCorrect() { return correct; }
    public void setCorrect(Boolean correct) { this.correct = correct; }
}
