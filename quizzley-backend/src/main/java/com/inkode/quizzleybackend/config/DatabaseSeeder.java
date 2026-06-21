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
        } catch (Exception e) {
            System.err.println("Database seeding failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
