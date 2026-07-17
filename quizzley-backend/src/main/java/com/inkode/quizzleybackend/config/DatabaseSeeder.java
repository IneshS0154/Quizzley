package com.inkode.quizzleybackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        try {
            // ==========================================
            // SCHEMA MIGRATION: Drop old questions/options
            // ==========================================
            System.out.println("Running database schema migration to dynamic question tables...");
            try {
                jdbcTemplate.execute("ALTER TABLE attempt_questions DROP FOREIGN KEY fk_attempt_questions_question");
            } catch (Exception e) {
                // Ignore if constraint doesn't exist
            }
            try {
                jdbcTemplate.execute("ALTER TABLE student_answers DROP FOREIGN KEY fk_student_answers_question");
            } catch (Exception e) {
                // Ignore if constraint doesn't exist
            }
            try {
                jdbcTemplate.execute("ALTER TABLE student_answers DROP FOREIGN KEY fk_student_answers_selected_option");
            } catch (Exception e) {
                // Ignore if constraint doesn't exist
            }
            try {
                jdbcTemplate.execute("DROP TABLE IF EXISTS question_options");
            } catch (Exception e) {
                // Ignore
            }
            try {
                jdbcTemplate.execute("DROP TABLE IF EXISTS questions");
            } catch (Exception e) {
                // Ignore
            }

            // 1. Seed Roles
            Integer rolesCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM roles", Integer.class);
            if (rolesCount == null || rolesCount == 0) {
                System.out.println("Seeding roles...");
                jdbcTemplate.execute("INSERT INTO roles (role_name) VALUES ('STUDENT')");
                jdbcTemplate.execute("INSERT INTO roles (role_name) VALUES ('QUIZ_MANAGER')");
                jdbcTemplate.execute("INSERT INTO roles (role_name) VALUES ('ADMIN')");
            }

            // 2. Seed Modules
            Integer modulesCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM modules", Integer.class);
            if (modulesCount == null || modulesCount == 0) {
                System.out.println("Seeding modules...");
                jdbcTemplate.execute("INSERT INTO modules (module_name, module_code, is_common_module) VALUES ('Database Systems', 'DBS101', 1)");
                jdbcTemplate.execute("INSERT INTO modules (module_name, module_code, is_common_module) VALUES ('Software Engineering', 'SE201', 0)");
                jdbcTemplate.execute("INSERT INTO modules (module_name, module_code, is_common_module) VALUES ('Cyber Security Fundamentals', 'CS101', 0)");
                jdbcTemplate.execute("INSERT INTO modules (module_name, module_code, is_common_module) VALUES ('Programming Fundamentals', 'PF101', 1)");
            }

            // ==========================================
            // SCHEMA MIGRATION: Ensure all modules have their question table
            // ==========================================
            List<Map<String, Object>> modulesList = jdbcTemplate.queryForList("SELECT module_code FROM modules");
            for (Map<String, Object> m : modulesList) {
                String code = (String) m.get("module_code");
                String rawTableName = code.replaceAll("[^a-zA-Z0-9_]", "").toLowerCase() + "_questions";
                String tableName = "quiz_questions_db." + rawTableName;
                
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
                        "CONSTRAINT fk_" + rawTableName + "_quiz FOREIGN KEY (quiz_id) REFERENCES quiz_platform_db.quizzes (quiz_id) ON DELETE CASCADE" +
                        ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
            }

            // Generate proper hash for 'password123'
            String properHash = passwordEncoder.encode("password123");

            // 3. Seed Admin User
            List<Map<String, Object>> adminUsers = jdbcTemplate.queryForList("SELECT user_id FROM users WHERE email = 'teacher@quizzley.com'");
            if (adminUsers.isEmpty()) {
                System.out.println("Seeding admin/teacher user...");
                jdbcTemplate.update("INSERT INTO users (full_name, email, password_hash, is_active) VALUES ('Dr. Inesh Teacher', 'teacher@quizzley.com', ?, 1)", properHash);

                Long teacherId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email = 'teacher@quizzley.com'", Long.class);
                Long adminRoleId = jdbcTemplate.queryForObject("SELECT role_id FROM roles WHERE role_name = 'ADMIN'", Long.class);

                if (teacherId != null && adminRoleId != null) {
                    jdbcTemplate.update("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)", teacherId, adminRoleId);
                }
            } else {
                // Ensure password hash is correct
                System.out.println("Updating admin/teacher user password hash...");
                jdbcTemplate.update("UPDATE users SET password_hash = ? WHERE email = 'teacher@quizzley.com'", properHash);
            }

            // 4. Seed Quiz Manager User
            List<Map<String, Object>> managerUsers = jdbcTemplate.queryForList("SELECT user_id FROM users WHERE email = 'manager@quizzley.com'");
            if (managerUsers.isEmpty()) {
                System.out.println("Seeding quiz manager user...");
                jdbcTemplate.update("INSERT INTO users (full_name, email, password_hash, is_active) VALUES ('Quiz Manager', 'manager@quizzley.com', ?, 1)", properHash);

                Long managerId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email = 'manager@quizzley.com'", Long.class);
                Long managerRoleId = jdbcTemplate.queryForObject("SELECT role_id FROM roles WHERE role_name = 'QUIZ_MANAGER'", Long.class);

                if (managerId != null && managerRoleId != null) {
                    jdbcTemplate.update("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)", managerId, managerRoleId);
                }
            } else {
                // Ensure password hash is correct
                System.out.println("Updating quiz manager user password hash...");
                jdbcTemplate.update("UPDATE users SET password_hash = ? WHERE email = 'manager@quizzley.com'", properHash);
            }

            // 5. Seed Quizzes
            Integer midtermCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM quizzes WHERE title = 'Data Structures Mid-Term'", Integer.class);
            if (midtermCount == null || midtermCount == 0) {
                System.out.println("Seeding Data Structures Mid-Term quiz...");
                Long moduleId = jdbcTemplate.queryForObject("SELECT module_id FROM modules LIMIT 1", Long.class);
                Long teacherId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email = 'teacher@quizzley.com'", Long.class);
                if (moduleId != null && teacherId != null) {
                    jdbcTemplate.update("INSERT INTO quizzes (module_id, created_by, title, description, quiz_type, timer_minutes, focus_mode_enabled, is_active) VALUES (?, ?, ?, ?, 'PRACTICE', 60, 0, 1)",
                            moduleId, teacherId, "Data Structures Mid-Term", "Mid-term assessment for Data Structures module.");
                }
            }

            // Always ensure DBS101 has the demo question if empty
            try {
                Integer dbsCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM quiz_questions_db.dbs101_questions", Integer.class);
                if (dbsCount == null || dbsCount == 0) {
                    List<Long> quizIds = jdbcTemplate.queryForList("SELECT quiz_id FROM quizzes WHERE title = 'Data Structures Mid-Term' LIMIT 1", Long.class);
                    if (!quizIds.isEmpty()) {
                        Long quizId = quizIds.get(0);
                        System.out.println("Seeding demo questions to dbs101_questions table...");
                        String optionsJson = "[{\"text\":\"O(1)\",\"correct\":true},{\"text\":\"O(N)\",\"correct\":false},{\"text\":\"O(log N)\",\"correct\":false}]";
                        jdbcTemplate.update("INSERT INTO quiz_questions_db.dbs101_questions (quiz_id, question_text, question_type, marks, is_active, options_json) VALUES (?, ?, 'MCQ', 2.0, 1, ?)",
                                quizId, "What is the time complexity of searching in a Hash Table in average case?", optionsJson);
                    }
                }
            } catch (Exception e) {
                System.err.println("Failed to seed dbs101 questions: " + e.getMessage());
            }

            // 6. Seed Student User if not present
            List<Map<String, Object>> studentUsers = jdbcTemplate.queryForList("SELECT user_id FROM users WHERE email = 'student@quizzley.com'");
            if (studentUsers.isEmpty()) {
                System.out.println("Seeding student user...");
                jdbcTemplate.update("INSERT INTO users (full_name, email, password_hash, is_active) VALUES ('Buddhika Student', 'student@quizzley.com', ?, 1)", properHash);
                
                Long studentId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email = 'student@quizzley.com'", Long.class);
                Long studentRoleId = jdbcTemplate.queryForObject("SELECT role_id FROM roles WHERE role_name = 'STUDENT'", Long.class);
                if (studentId != null && studentRoleId != null) {
                    jdbcTemplate.update("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)", studentId, studentRoleId);
                }
            }

            // 7. Seed Quiz Attempts if empty
            Integer attemptsCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM quiz_attempts", Integer.class);
            if (attemptsCount == null || attemptsCount == 0) {
                System.out.println("Seeding mock quiz attempts...");
                Long studentId = jdbcTemplate.queryForObject("SELECT user_id FROM users WHERE email = 'student@quizzley.com'", Long.class);
                List<Map<String, Object>> quizzesList = jdbcTemplate.queryForList("SELECT quiz_id, title FROM quizzes");
                if (studentId != null && !quizzesList.isEmpty()) {
                    for (Map<String, Object> quiz : quizzesList) {
                        // Cast ID depending on actual class returned by driver
                        Object rawQuizId = quiz.get("quiz_id");
                        Long quizId = rawQuizId instanceof Number ? ((Number) rawQuizId).longValue() : Long.parseLong(rawQuizId.toString());
                        String title = (String) quiz.get("title");
                        
                        if ("Data Structures Mid-Term".equalsIgnoreCase(title)) {
                            jdbcTemplate.update("INSERT INTO quiz_attempts (quiz_id, student_id, attempt_number, total_marks, obtained_marks, status) VALUES (?, ?, 1, 10.0, 8.5, 'SUBMITTED')", quizId, studentId);
                            jdbcTemplate.update("INSERT INTO quiz_attempts (quiz_id, student_id, attempt_number, total_marks, obtained_marks, status) VALUES (?, ?, 2, 10.0, 9.0, 'SUBMITTED')", quizId, studentId);
                            jdbcTemplate.update("INSERT INTO quiz_attempts (quiz_id, student_id, attempt_number, total_marks, obtained_marks, status) VALUES (?, ?, 3, 10.0, 5.0, 'SUBMITTED')", quizId, studentId);
                        } else {
                            jdbcTemplate.update("INSERT INTO quiz_attempts (quiz_id, student_id, attempt_number, total_marks, obtained_marks, status) VALUES (?, ?, 1, 10.0, 7.5, 'SUBMITTED')", quizId, studentId);
                            jdbcTemplate.update("INSERT INTO quiz_attempts (quiz_id, student_id, attempt_number, total_marks, obtained_marks, status) VALUES (?, ?, 2, 10.0, 0.0, 'IN_PROGRESS')", quizId, studentId);
                        }
                    }
                }
            }

            // 8. Seed Notifications if empty
            Integer notifCount = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM notifications", Integer.class);
            if (notifCount == null || notifCount == 0) {
                System.out.println("Seeding initial notifications...");
                jdbcTemplate.update("INSERT INTO notifications (title, message, type, is_read, created_at) VALUES (?, ?, ?, ?, NOW())",
                        "System Ready", "Quizzley backend started successfully. Database is connected.", "SUCCESS", false);
                jdbcTemplate.update("INSERT INTO notifications (title, message, type, is_read, created_at) VALUES (?, ?, ?, ?, NOW())",
                        "Modules Seeded", "4 default academic modules were added: DBS101, SE201, CS101, PF101.", "INFO", false);
                jdbcTemplate.update("INSERT INTO notifications (title, message, type, is_read, created_at) VALUES (?, ?, ?, ?, NOW())",
                        "Demo Data Loaded", "Sample quiz and quiz attempts have been pre-loaded for demonstration.", "INFO", true);
            }
        } catch (Exception e) {
            System.err.println("Database seeding failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

