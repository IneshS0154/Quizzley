package com.inkode.quizzleybackend.dto;

import java.util.List;

public class AnalyticsDto {
    private String totalAttempts;
    private String averageScore;
    private String passRate;
    private String completionRate;
    private List<QuizPerformanceDto> quizPerformance;

    public AnalyticsDto() {}

    public AnalyticsDto(String totalAttempts, String averageScore, String passRate, String completionRate, List<QuizPerformanceDto> quizPerformance) {
        this.totalAttempts = totalAttempts;
        this.averageScore = averageScore;
        this.passRate = passRate;
        this.completionRate = completionRate;
        this.quizPerformance = quizPerformance;
    }

    public String getTotalAttempts() { return totalAttempts; }
    public void setTotalAttempts(String totalAttempts) { this.totalAttempts = totalAttempts; }

    public String getAverageScore() { return averageScore; }
    public void setAverageScore(String averageScore) { this.averageScore = averageScore; }

    public String getPassRate() { return passRate; }
    public void setPassRate(String passRate) { this.passRate = passRate; }

    public String getCompletionRate() { return completionRate; }
    public void setCompletionRate(String completionRate) { this.completionRate = completionRate; }

    public List<QuizPerformanceDto> getQuizPerformance() { return quizPerformance; }
    public void setQuizPerformance(List<QuizPerformanceDto> quizPerformance) { this.quizPerformance = quizPerformance; }
}
