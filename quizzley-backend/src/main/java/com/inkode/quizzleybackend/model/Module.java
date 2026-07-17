package com.inkode.quizzleybackend.model;

import jakarta.persistence.*;
<<<<<<< Updated upstream
=======
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

>>>>>>> Stashed changes
import java.time.LocalDateTime;

@Entity
@Table(name = "modules")
<<<<<<< Updated upstream
=======
@Data
@NoArgsConstructor
@AllArgsConstructor
>>>>>>> Stashed changes
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "module_id")
<<<<<<< Updated upstream
    private Long moduleId;
=======
    private Integer moduleId;
>>>>>>> Stashed changes

    @Column(name = "module_name", nullable = false, length = 150)
    private String moduleName;

    @Column(name = "module_code", nullable = false, unique = true, length = 50)
    private String moduleCode;

    @Column(name = "is_common_module", nullable = false)
    private Boolean isCommonModule = false;

<<<<<<< Updated upstream
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (isCommonModule == null) isCommonModule = false;
    }

    public Module() {}

    public Long getModuleId() { return moduleId; }
    public void setModuleId(Long moduleId) { this.moduleId = moduleId; }

    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }

    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }

    public Boolean getIsCommonModule() { return isCommonModule; }
    public void setIsCommonModule(Boolean isCommonModule) { this.isCommonModule = isCommonModule; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
=======
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
>>>>>>> Stashed changes
}
