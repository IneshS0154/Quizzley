USE quiz_platform_db;

-- ==========================================================
-- 12. DEFAULT SEED DATA
-- ==========================================================

-- Roles
INSERT INTO roles (role_name)
VALUES
    ('STUDENT'),
    ('QUIZ_MANAGER'),
    ('ADMIN');

-- Specializations
INSERT INTO specializations (specialization_name)
VALUES
    ('Software Engineering'),
    ('Cyber Security'),
    ('Data Science'),
    ('Information Technology');

-- Batches
INSERT INTO batches (batch_name, batch_year)
VALUES
    ('Y1S1', 2026),
    ('Y1S2', 2026),
    ('Y2S1', 2026),
    ('Y2S2', 2026),
    ('Y3S1', 2026),
    ('Y3S2', 2026),
    ('Y4S1', 2026),
    ('Y4S2', 2026);

-- Modules
INSERT INTO modules (module_name, module_code, is_common_module)
VALUES
    ('Database Systems', 'DBS101', TRUE),
    ('Software Engineering', 'SE201', FALSE),
    ('Cyber Security Fundamentals', 'CS101', FALSE),
    ('Programming Fundamentals', 'PF101', TRUE);

-- Link modules to specializations
-- Software Engineering module for Software Engineering specialization
INSERT INTO module_specializations (module_id, specialization_id)
VALUES
    (1, 1), -- Database Systems for Software Engineering
    (2, 1), -- Software Engineering for Software Engineering
    (3, 2), -- Cyber Security Fundamentals for Cyber Security
    (4, 1); -- Programming Fundamentals for Software Engineering

-- Users
-- Password BCrypt hash for 'password123' is '$2a$10$8.K38sA6vK3LgHhI/qB5aO5Q0/14W9E1WpYp4FmYk6q1Y3j5G.n6a'
INSERT INTO users (full_name, email, password_hash, specialization_id, batch_id, is_active)
VALUES
    ('Dr. Inesh Teacher', 'teacher@quizzley.com', '$2a$10$8.K38sA6vK3LgHhI/qB5aO5Q0/14W9E1WpYp4FmYk6q1Y3j5G.n6a', NULL, NULL, TRUE),
    ('Buddhika Student', 'student@quizzley.com', '$2a$10$8.K38sA6vK3LgHhI/qB5aO5Q0/14W9E1WpYp4FmYk6q1Y3j5G.n6a', 1, 1, TRUE);

-- Assign Roles
INSERT INTO user_roles (user_id, role_id)
VALUES
    (1, 3), -- Dr. Inesh gets ADMIN role
    (2, 1); -- Buddhika gets STUDENT role

-- Mock Quizzes
-- Available from/until can be set
INSERT INTO quizzes (module_id, created_by, title, description, quiz_type, timer_minutes, focus_mode_enabled, is_active, is_temporarily_disabled, available_from, available_until)
VALUES
    (1, 1, 'Algebra Basics', 'Assessment on fundamental algebra properties, equations, and solutions.', 'PRACTICE', 60, FALSE, TRUE, FALSE, '2026-10-24 09:00:00', '2026-10-24 10:00:00'),
    (1, 1, 'Linear Equations', 'Quiz covering system of linear equations, matrices, and determinants.', 'MOCK', 45, TRUE, TRUE, FALSE, NULL, NULL),
    (2, 1, 'Quadratic Equations', 'Test on quadratic formulas, roots of equation, and graphing parabolics.', 'PRACTICE', 90, FALSE, TRUE, FALSE, '2026-10-20 14:00:00', '2026-10-20 15:30:00'),
    (2, 1, 'Trigonometry Fundamentals', 'Quiz on sine, cosine, tangent relations, and unit circle properties.', 'MOCK', 60, TRUE, TRUE, FALSE, '2026-10-28 10:00:00', '2026-10-28 11:00:00');

-- Quiz Assignments
INSERT INTO quiz_assignments (quiz_id, specialization_id, batch_id, assigned_by)
VALUES
    (1, 1, 1, 1),
    (2, 1, 1, 1),
    (3, 1, 3, 1),
    (4, 1, 3, 1);

-- Questions for Algebra Basics
INSERT INTO questions (quiz_id, question_text, question_type, marks, hint, explanation, is_active)
VALUES
    (1, 'What is the value of x if 2x + 7 = 15?', 'MCQ', 2.00, 'Subtract 7 from both sides first.', '2x = 15 - 7 => 2x = 8 => x = 4.', TRUE),
    (1, 'True or False: The equation x^2 + 1 = 0 has real solutions.', 'TRUE_FALSE', 1.00, 'Think about square of any real number.', 'The square of any real number is non-negative, so x^2 + 1 >= 1.', TRUE),
    (1, 'Solve for x: 3(x - 2) = 12.', 'SHORT_ANSWER', 2.00, 'Distribute or divide by 3 first.', 'Divide by 3: x - 2 = 4 => x = 6.', TRUE);

-- Options for Question 1 (x=4 is correct)
INSERT INTO question_options (question_id, option_text, is_correct)
VALUES
    (1, 'x = 3', FALSE),
    (1, 'x = 4', TRUE),
    (1, 'x = 5', FALSE),
    (1, 'x = 6', FALSE);

-- Options for Question 2 (False is correct)
INSERT INTO question_options (question_id, option_text, is_correct)
VALUES
    (2, 'True', FALSE),
    (2, 'False', TRUE);
