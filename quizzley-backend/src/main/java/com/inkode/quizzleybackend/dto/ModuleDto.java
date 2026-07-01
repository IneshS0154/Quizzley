package com.inkode.quizzleybackend.dto;

public class ModuleDto {
    private Long moduleId;
    private String moduleCode;
    private String moduleName;
    private Boolean isCommonModule;

    public ModuleDto() {}

    public ModuleDto(Long moduleId, String moduleCode, String moduleName, Boolean isCommonModule) {
        this.moduleId = moduleId;
        this.moduleCode = moduleCode;
        this.moduleName = moduleName;
        this.isCommonModule = isCommonModule;
    }

    public Long getModuleId() { return moduleId; }
    public void setModuleId(Long moduleId) { this.moduleId = moduleId; }

    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }

    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }

    public Boolean getIsCommonModule() { return isCommonModule; }
    public void setIsCommonModule(Boolean isCommonModule) { this.isCommonModule = isCommonModule; }
}
