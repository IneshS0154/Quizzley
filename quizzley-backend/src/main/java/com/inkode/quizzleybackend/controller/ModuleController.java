package com.inkode.quizzleybackend.controller;

import com.inkode.quizzleybackend.dto.ModuleDto;
import com.inkode.quizzleybackend.model.Module;
import com.inkode.quizzleybackend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/modules")
@CrossOrigin(origins = "http://localhost:5173")
public class ModuleController {

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /** GET /api/admin/modules — return all modules as list of ModuleDto */
    @GetMapping
    public ResponseEntity<List<ModuleDto>> getAll() {
        List<ModuleDto> dtos = moduleRepository.findAll()
                .stream()
                .map(m -> new ModuleDto(m.getModuleId(), m.getModuleCode(), m.getModuleName(), m.getIsCommonModule()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /** POST /api/admin/modules — create a new module */
    @PostMapping
    public ResponseEntity<ModuleDto> create(@RequestBody Map<String, String> body) {
        String code = body.get("moduleCode");
        String name = body.get("moduleName");

        if (code == null || code.isBlank() || name == null || name.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "moduleCode and moduleName are required");
        }

        if (moduleRepository.findByModuleCode(code.toUpperCase()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Module code already exists: " + code);
        }

        Module module = new Module();
        module.setModuleCode(code.toUpperCase().trim());
        module.setModuleName(name.trim());
        module.setIsCommonModule(false);

        Module saved = moduleRepository.save(module);

        // Dynamically create the [module_code]_questions table
        String tableName = saved.getModuleCode().replaceAll("[^a-zA-Z0-9_]", "").toLowerCase() + "_questions";
        try {
            jdbcTemplate.execute("CREATE TABLE IF NOT EXISTS " + tableName + " (" +
                    "question_id INT AUTO_INCREMENT PRIMARY KEY, " +
                    "quiz_id INT NOT NULL, " +
                    "question_text TEXT NOT NULL, " +
                    "question_type VARCHAR(20) NOT NULL, " +
                    "marks DECIMAL(6,2) NOT NULL DEFAULT 1.00, " +
                    "hint TEXT, " +
                    "explanation TEXT, " +
                    "is_active TINYINT(1) NOT NULL DEFAULT 1, " +
                    "options_json TEXT, " +
                    "created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, " +
                    "CONSTRAINT fk_" + tableName + "_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE" +
                    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
        } catch (Exception e) {
            System.err.println("Failed to dynamically create table " + tableName + ": " + e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ModuleDto(saved.getModuleId(), saved.getModuleCode(), saved.getModuleName(), saved.getIsCommonModule()));
    }
}
