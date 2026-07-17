<<<<<<< Updated upstream
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
=======
-- ==========================================================
-- QUIZ PLATFORM DATABASE
-- MySQL Seed Data
-- ==========================================================

USE quiz_platform_db;

-- Clear tables first to ensure clean execution
DELETE FROM student_answers;
DELETE FROM attempt_questions;
DELETE FROM quiz_attempts;
DELETE FROM quiz_assignments;
DELETE FROM question_options;
DELETE FROM questions;
DELETE FROM quizzes;
DELETE FROM module_specializations;
DELETE FROM modules;
DELETE FROM user_roles;
DELETE FROM roles;
DELETE FROM users;
DELETE FROM batches;
DELETE FROM specializations;

-- 1. Insert Roles
INSERT INTO roles (role_id, role_name) VALUES
(1, 'STUDENT'),
(2, 'QUIZ_MANAGER'),
(3, 'ADMIN');

-- 2. Insert Specializations
INSERT INTO specializations (specialization_id, specialization_name) VALUES
(1, 'Software Engineering'),
(2, 'Cyber Security'),
(3, 'Data Science'),
(4, 'Information Technology');

-- 3. Insert Batches
INSERT INTO batches (batch_id, batch_name, batch_year) VALUES
(1, 'Y1S1', 2026),
(2, 'Y1S2', 2026),
(3, 'Y2S1', 2026),
(4, 'Y2S2', 2026),
(5, 'Y3S1', 2026),
(6, 'Y3S2', 2026),
(7, 'Y4S1', 2026),
(8, 'Y4S2', 2026);

-- 4. Insert Modules
INSERT INTO modules (module_id, module_name, module_code, is_common_module) VALUES
(1, 'Database Systems', 'DBS101', TRUE),
(2, 'Software Engineering', 'SE201', FALSE),
(3, 'Cyber Security Fundamentals', 'CS101', FALSE),
(4, 'Programming Fundamentals', 'PF101', TRUE);

-- 5. Insert Users
-- Password hash is BCrypt hash for "password"
INSERT INTO users (user_id, full_name, email, password_hash, specialization_id, batch_id, is_active) VALUES
(1, 'Admin Teacher', 'teacher@quizzley.com', '$2a$12$K1dJ39k9BqK1eT1qZ/rDLe11e/e0/7Wqf/F1eO.x1qOq3Y0.zC0y2', NULL, NULL, TRUE),
(2, 'Student User', 'student@quizzley.com', '$2a$12$K1dJ39k9BqK1eT1qZ/rDLe11e/e0/7Wqf/F1eO.x1qOq3Y0.zC0y2', 1, 1, TRUE);

-- 6. Insert User Roles
INSERT INTO user_roles (user_id, role_id) VALUES
(1, 3), -- Admin
(1, 2), -- Quiz Manager
(2, 1); -- Student

-- 7. Insert Module Specialization mapping
INSERT INTO module_specializations (module_id, specialization_id) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(3, 2),
(4, 1);

-- 8. Insert Quizzes (matching the Teacher Dashboard screenshot)
-- Statuses: LIVE, DRAFT, SCHEDULED, COMPLETED
INSERT INTO quizzes (quiz_id, module_id, created_by, title, description, quiz_type, timer_minutes, focus_mode_enabled, is_active, is_temporarily_disabled, available_from, available_until) VALUES
(1, 4, 1, 'Midterm Assessment - Algebra', 'Algebra midterm covers linear and quadratic concepts.', 'MOCK', 60, TRUE, TRUE, FALSE, '2026-03-12 10:00:00', '2026-03-12 11:00:00'),
(2, 4, 1, 'Linear Equations - Practice', 'Self-paced practice questions for linear formulas.', 'PRACTICE', NULL, FALSE, TRUE, FALSE, NULL, NULL),
(3, 4, 1, 'Quadratic Equations Quiz', 'Assess your skills in completing the square.', 'MOCK', 30, FALSE, TRUE, FALSE, '2026-03-13 09:30:00', '2026-03-13 10:00:00'),
(4, 1, 1, 'Weekly Math Practice - Week 4', 'Common math applications in database logic structures.', 'PRACTICE', 30, FALSE, TRUE, FALSE, '2026-03-10 14:30:00', '2026-03-10 15:00:00'),
(5, 4, 1, 'Trigonometry Basics Test', 'Introductory trigonometry questions covering triangles and sine/cosine identities.', 'MOCK', 45, TRUE, TRUE, FALSE, '2026-03-08 12:00:00', '2026-03-08 12:45:00'),
(6, 1, 1, 'Probability Concepts Quiz', 'Basics of permutations, combinations, and basic probability.', 'MOCK', 30, FALSE, TRUE, FALSE, '2026-03-14 11:00:00', '2026-03-14 11:30:00'),
(7, 2, 1, 'Polynomials - Revision Quiz', 'Algebraic concepts and root calculations.', 'PRACTICE', NULL, FALSE, TRUE, FALSE, NULL, NULL),
(8, 4, 1, 'Mensuration Unit Test', 'Evaluating volumetric and surface calculations.', 'MOCK', 40, TRUE, TRUE, FALSE, '2026-03-06 10:00:00', '2026-03-06 10:40:00');

-- 9. Insert Quiz Assignments (representing "Classes" / Specialization & Batch)
INSERT INTO quiz_assignments (quiz_id, specialization_id, batch_id, assigned_by) VALUES
(1, 1, 1, 1), -- Midterm Assessment - Algebra for Software Engineering Y1S1 (10-A equivalent)
(2, 1, 1, 1), -- Linear Equations - Practice
(3, 1, 2, 1), -- Quadratic Equations Quiz (10-B equivalent)
(4, 1, 1, 1), -- Weekly Math Practice
(5, 2, 1, 1), -- Trigonometry Basics Test (11-A equivalent)
(6, 2, 2, 1), -- Probability Concepts (11-B equivalent)
(7, 1, 1, 1), -- Polynomials - Revision Quiz
(8, 1, 1, 1); -- Mensuration Unit Test (9-B equivalent)

-- 10. Insert Questions & Options
-- Midterm Assessment - Algebra (quiz_id: 1)
INSERT INTO questions (question_id, quiz_id, question_text, question_type, marks, hint, explanation) VALUES
(1, 1, 'Solve for x: 3x - 7 = 14', 'MCQ', 2.00, 'Add 7 to both sides, then divide by 3.', '3x = 21 => x = 7'),
(2, 1, 'What is the root of the equation x^2 - 9 = 0?', 'MCQ', 2.00, 'Factor as (x-3)(x+3) = 0.', 'x^2 = 9 => x = 3 or x = -3'),
(3, 1, 'The sum of angles in a triangle is 180 degrees.', 'TRUE_FALSE', 1.00, NULL, 'Standard geometric theorem.');

INSERT INTO question_options (option_id, question_id, option_text, is_correct) VALUES
(1, 1, 'x = 5', FALSE),
(2, 1, 'x = 7', TRUE),
(3, 1, 'x = 21', FALSE),
(4, 1, 'x = 3', FALSE),
(5, 2, '3', FALSE),
(6, 2, '3 and -3', TRUE),
(7, 2, '9 and -9', FALSE),
(8, 2, '0', FALSE),
(9, 3, 'True', TRUE),
(10, 3, 'False', FALSE);

-- Trigonometry Basics Test (quiz_id: 5)
INSERT INTO questions (question_id, quiz_id, question_text, question_type, marks, hint, explanation) VALUES
(4, 5, 'What is sin(90 degrees)?', 'MCQ', 2.00, 'Consider the unit circle.', 'sin(90) = 1'),
(5, 5, 'If cos(theta) = 0, what is theta in degrees?', 'MCQ', 3.00, 'Think of the horizontal coordinate on unit circle.', 'cos(90) = 0');

INSERT INTO question_options (option_id, question_id, option_text, is_correct) VALUES
(11, 4, '0', FALSE),
(12, 4, '0.5', FALSE),
(13, 4, '1', TRUE),
(14, 4, '-1', FALSE),
(15, 5, '0 degrees', FALSE),
(16, 5, '45 degrees', FALSE),
(17, 5, '90 degrees', TRUE),
(18, 5, '180 degrees', FALSE);

-- 11. Insert Quiz Attempts
-- Student User (user_id: 2) attempts Weekly Math Practice - Week 4 (quiz_id: 4)
INSERT INTO quiz_attempts (attempt_id, quiz_id, student_id, attempt_number, started_at, submitted_at, time_taken_seconds, total_marks, obtained_marks, status, auto_submitted) VALUES
(1, 4, 2, 1, '2026-06-10 14:30:00', '2026-06-10 14:55:00', 1500, 10.00, 8.00, 'SUBMITTED', FALSE),
(2, 5, 2, 1, '2026-06-08 12:00:00', '2026-06-08 12:40:00', 2400, 5.00, 5.00, 'SUBMITTED', FALSE);
>>>>>>> Stashed changes
