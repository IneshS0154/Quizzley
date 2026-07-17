package com.inkode.quizzleybackend.dto;

public class ModuleStatsDto {
    private String moduleCode;
    private String moduleName;
    private int quizCount;
    private int questionCount;

    public ModuleStatsDto() {}

    public ModuleStatsDto(String moduleCode, String moduleName, int quizCount, int questionCount) {
        this.moduleCode = moduleCode;
        this.moduleName = moduleName;
        this.quizCount = quizCount;
        this.questionCount = questionCount;
    }

    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }

    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }

    public int getQuizCount() { return quizCount; }
    public void setQuizCount(int quizCount) { this.quizCount = quizCount; }

    public int getQuestionCount() { return questionCount; }
    public void setQuestionCount(int questionCount) { this.questionCount = questionCount; }
}
