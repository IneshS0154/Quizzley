package com.inkode.quizzleybackend.dto;

public class QuizPerformanceDto {
    private String title;
    private int students;
    private String avgScore;
    private String passRate;
    private String status;

    public QuizPerformanceDto() {}

    public QuizPerformanceDto(String title, int students, String avgScore, String passRate, String status) {
        this.title = title;
        this.students = students;
        this.avgScore = avgScore;
        this.passRate = passRate;
        this.status = status;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getStudents() { return students; }
    public void setStudents(int students) { this.students = students; }

    public String getAvgScore() { return avgScore; }
    public void setAvgScore(String avgScore) { this.avgScore = avgScore; }

    public String getPassRate() { return passRate; }
    public void setPassRate(String passRate) { this.passRate = passRate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
