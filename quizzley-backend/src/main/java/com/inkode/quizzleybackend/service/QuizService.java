package com.inkode.quizzleybackend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import com.inkode.quizzleybackend.dto.QuizDto;
import com.inkode.quizzleybackend.dto.QuestionDto;
import com.inkode.quizzleybackend.dto.QuestionOptionDto;
import com.inkode.quizzleybackend.model.Quiz;
import com.inkode.quizzleybackend.model.Module;
import com.inkode.quizzleybackend.repository.QuizRepository;
import com.inkode.quizzleybackend.repository.ModuleRepository;
import com.inkode.quizzleybackend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    private String getTableName(Module module) {
        if (module == null || module.getModuleCode() == null) {
            return "quiz_questions_db.dbs101_questions"; // default fallback
        }
        return "quiz_questions_db." + module.getModuleCode().replaceAll("[^a-zA-Z0-9_]", "").toLowerCase() + "_questions";
    }

    private void createTableIfNotExists(String tableName) {
        String constraintName = tableName;
        if (tableName.contains(".")) {
            constraintName = tableName.substring(tableName.indexOf(".") + 1);
        }
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
                "CONSTRAINT fk_" + constraintName + "_quiz FOREIGN KEY (quiz_id) REFERENCES quiz_platform_db.quizzes (quiz_id) ON DELETE CASCADE" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
    }

    /**
     * Returns all quizzes in the database.
     */
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    /**
     * Creates a new Quiz from the provided DTO, resolving the Module
     * and saving all questions/options.
     */
    public Quiz createQuiz(QuizDto dto) {
        Quiz quiz = new Quiz();
        quiz.setTitle(dto.getTitle());
        quiz.setDescription(dto.getDescription() != null ? dto.getDescription() : dto.getStatus());

        // 1. Resolve Module by code (or fallback by ID)
        Module module = null;
        if (dto.getModuleCode() != null) {
            module = moduleRepository.findByModuleCode(dto.getModuleCode()).orElse(null);
        }
        if (module == null && dto.getModuleId() != null) {
            module = moduleRepository.findById(dto.getModuleId()).orElse(null);
        }
        if (module == null) {
            List<Module> allModules = moduleRepository.findAll();
            if (!allModules.isEmpty()) {
                module = allModules.get(0);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No academic modules exist in database");
            }
        }
        quiz.setModule(module);

        // 2. Map Quiz settings
        if (dto.getQuizType() != null) {
            try {
                quiz.setQuizType(Quiz.QuizType.valueOf(dto.getQuizType().toUpperCase()));
            } catch (IllegalArgumentException e) {
                quiz.setQuizType(Quiz.QuizType.PRACTICE);
            }
        } else {
            quiz.setQuizType(Quiz.QuizType.PRACTICE);
        }

        quiz.setTimerMinutes(dto.getTimerMinutes());
        quiz.setFocusModeEnabled(dto.getFocusMode() != null ? dto.getFocusMode() : (dto.getFocusModeEnabled() != null ? dto.getFocusModeEnabled() : false));
        
        if ("PUBLISHED".equalsIgnoreCase(dto.getStatus()) || Boolean.TRUE.equals(dto.getIsActive())) {
            quiz.setIsActive(true);
        } else {
            quiz.setIsActive(false);
        }

        quiz.setAvailableFrom(dto.getAvailableFrom());
        quiz.setAvailableUntil(dto.getAvailableUntil());
        quiz.setCreatedBy(1L); // Default to seeded admin/teacher user

        // Save Quiz metadata
        Quiz savedQuiz = quizRepository.save(quiz);

        // 3. Save Questions to dynamic table
        String tableName = getTableName(savedQuiz.getModule());
        createTableIfNotExists(tableName);

        if (dto.getQuestions() != null) {
            for (QuestionDto qDto : dto.getQuestions()) {
                String optionsJson = "[]";
                try {
                    optionsJson = objectMapper.writeValueAsString(qDto.getOptions());
                } catch (Exception e) {
                    System.err.println("Failed to serialize options: " + e.getMessage());
                }
                
                String qType = qDto.getType() != null ? qDto.getType() : "MCQ";
                jdbcTemplate.update("INSERT INTO " + tableName + " (quiz_id, question_text, question_type, marks, hint, explanation, is_active, options_json) VALUES (?, ?, ?, ?, NULL, NULL, 1, ?)",
                        savedQuiz.getQuizId(), qDto.getText(), qType, qDto.getMarks() != null ? qDto.getMarks() : 1.0, optionsJson);
            }
        }

        // Notify
        int qCount = dto.getQuestions() != null ? dto.getQuestions().size() : 0;
        notificationService.createNotification(
                "Quiz Created",
                "Quiz \"" + savedQuiz.getTitle() + "\" was created with " + qCount + " question(s).",
                "SUCCESS"
        );

        return savedQuiz;
    }

    /**
     * Updates an existing Quiz identified by id with DTO data, updating questions and options.
     */
    public Quiz updateQuiz(Long id, QuizDto dto) {
        Quiz existing = quizRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Quiz not found with id: " + id));
        
        if (dto.getTitle() != null)          existing.setTitle(dto.getTitle());
        
        if (dto.getDescription() != null) {
            existing.setDescription(dto.getDescription());
        } else if (dto.getInstructions() != null) {
            existing.setDescription(dto.getInstructions());
        }

        existing.setTimerMinutes(dto.getTimerMinutes());

        if (dto.getFocusMode() != null) {
            existing.setFocusModeEnabled(dto.getFocusMode());
        } else if (dto.getFocusModeEnabled() != null) {
            existing.setFocusModeEnabled(dto.getFocusModeEnabled());
        }

        if ("PUBLISHED".equalsIgnoreCase(dto.getStatus())) {
            existing.setIsActive(true);
        } else if ("DRAFT".equalsIgnoreCase(dto.getStatus())) {
            existing.setIsActive(false);
        } else if (dto.getIsActive() != null) {
            existing.setIsActive(dto.getIsActive());
        }

        existing.setAvailableFrom(dto.getAvailableFrom());
        existing.setAvailableUntil(dto.getAvailableUntil());

        if (dto.getQuizType() != null) {
            try {
                existing.setQuizType(Quiz.QuizType.valueOf(dto.getQuizType().toUpperCase()));
            } catch (IllegalArgumentException e) {
                // ignore invalid type
            }
        }

        // Resolve Module
        Module module = null;
        if (dto.getModuleCode() != null) {
            module = moduleRepository.findByModuleCode(dto.getModuleCode()).orElse(null);
        }
        if (module == null && dto.getModuleId() != null) {
            module = moduleRepository.findById(dto.getModuleId()).orElse(null);
        }

        String oldTableName = getTableName(existing.getModule());

        if (module != null) {
            existing.setModule(module);
        }

        // Save updated Quiz metadata first
        Quiz savedQuiz = quizRepository.save(existing);
        String newTableName = getTableName(savedQuiz.getModule());

        // Delete from old table
        try {
            jdbcTemplate.update("DELETE FROM " + oldTableName + " WHERE quiz_id = ?", id);
        } catch (Exception e) {}

        // Delete from new table just in case
        createTableIfNotExists(newTableName);
        try {
            jdbcTemplate.update("DELETE FROM " + newTableName + " WHERE quiz_id = ?", id);
        } catch (Exception e) {}

        // Recreate new questions & options
        if (dto.getQuestions() != null) {
            for (QuestionDto qDto : dto.getQuestions()) {
                String optionsJson = "[]";
                try {
                    optionsJson = objectMapper.writeValueAsString(qDto.getOptions());
                } catch (Exception e) {
                    System.err.println("Failed to serialize options: " + e.getMessage());
                }
                
                String qType = qDto.getType() != null ? qDto.getType() : "MCQ";
                jdbcTemplate.update("INSERT INTO " + newTableName + " (quiz_id, question_text, question_type, marks, hint, explanation, is_active, options_json) VALUES (?, ?, ?, ?, NULL, NULL, 1, ?)",
                        savedQuiz.getQuizId(), qDto.getText(), qType, qDto.getMarks() != null ? qDto.getMarks() : 1.0, optionsJson);
            }
        }

        return savedQuiz;
    }

    /**
     * Fetches a quiz by id, including questions and options, mapped to a QuizDto.
     */
    public QuizDto getQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Quiz not found with id: " + id));

        QuizDto dto = new QuizDto();
        dto.setQuizId(quiz.getQuizId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setInstructions(quiz.getDescription());
        dto.setQuizType(quiz.getQuizType() != null ? quiz.getQuizType().name() : "PRACTICE");
        dto.setTimerMinutes(quiz.getTimerMinutes());
        dto.setFocusModeEnabled(quiz.getFocusModeEnabled());
        dto.setFocusMode(quiz.getFocusModeEnabled());
        dto.setIsActive(quiz.getIsActive());
        dto.setAvailableFrom(quiz.getAvailableFrom());
        dto.setAvailableUntil(quiz.getAvailableUntil());

        if (quiz.getModule() != null) {
            dto.setModuleId(quiz.getModule().getModuleId());
            dto.setModuleCode(quiz.getModule().getModuleCode());
        }
        
        dto.setStatus(quiz.getIsActive() ? "PUBLISHED" : "DRAFT");

        // Map questions from dynamic module table
        String tableName = getTableName(quiz.getModule());
        createTableIfNotExists(tableName);

        List<QuestionDto> questionDtos = new java.util.ArrayList<>();
        try {
            List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT * FROM " + tableName + " WHERE quiz_id = ?", id);
            for (Map<String, Object> row : rows) {
                QuestionDto qDto = new QuestionDto();
                qDto.setText((String) row.get("question_text"));
                qDto.setType((String) row.get("question_type"));
                
                Object rawMarks = row.get("marks");
                double marks = 1.0;
                if (rawMarks instanceof Number) {
                    marks = ((Number) rawMarks).doubleValue();
                }
                qDto.setMarks(marks);

                // Deserialize options json
                String optionsJson = (String) row.get("options_json");
                List<QuestionOptionDto> optDtos = new java.util.ArrayList<>();
                if (optionsJson != null && !optionsJson.isBlank()) {
                    try {
                        optDtos = objectMapper.readValue(optionsJson, new TypeReference<List<QuestionOptionDto>>() {});
                    } catch (Exception e) {
                        System.err.println("Failed to parse options_json: " + e.getMessage());
                    }
                }
                qDto.setOptions(optDtos);
                questionDtos.add(qDto);
            }
        } catch (Exception e) {
            System.err.println("Failed to query questions from table " + tableName + ": " + e.getMessage());
        }
        dto.setQuestions(questionDtos);

        return dto;
    }

    /**
     * Deletes a quiz by id. Throws 404 if not found.
     */
    public void deleteQuiz(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found with id: " + id));
        String title = quiz.getTitle();
        
        String tableName = getTableName(quiz.getModule());
        try {
            jdbcTemplate.update("DELETE FROM " + tableName + " WHERE quiz_id = ?", id);
        } catch (Exception e) {}

        quizRepository.deleteById(id);
        notificationService.createNotification(
                "Quiz Deleted",
                "Quiz \"" + title + "\" was permanently deleted.",
                "WARNING"
        );
    }
}
