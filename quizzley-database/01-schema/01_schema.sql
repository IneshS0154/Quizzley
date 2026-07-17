<<<<<<< Updated upstream
CREATE DATABASE IF NOT EXISTS quiz_platform_db;
USE quiz_platform_db;

-- ==========================================================
-- 1. DROP OLD TABLES IF NEEDED
-- ==========================================================

=======
-- ==========================================================
-- QUIZ PLATFORM DATABASE
-- MySQL Schema Definitions
-- ==========================================================

CREATE DATABASE IF NOT EXISTS quiz_platform_db;
USE quiz_platform_db;

>>>>>>> Stashed changes
DROP TABLE IF EXISTS group_members;
DROP TABLE IF EXISTS group_quizzes;
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS module_progress;
DROP TABLE IF EXISTS memory_bank;
DROP TABLE IF EXISTS student_answers;
DROP TABLE IF EXISTS attempt_questions;
DROP TABLE IF EXISTS quiz_attempts;
DROP TABLE IF EXISTS quiz_upload_batches;
DROP TABLE IF EXISTS question_options;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS quiz_assignments;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS module_specializations;
DROP TABLE IF EXISTS modules;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS batches;
DROP TABLE IF EXISTS specializations;

<<<<<<< Updated upstream
-- ==========================================================
-- 2. ACADEMIC STRUCTURE TABLES
-- ==========================================================

=======
-- Academic Structures
>>>>>>> Stashed changes
CREATE TABLE specializations (
    specialization_id INT AUTO_INCREMENT PRIMARY KEY,
    specialization_name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE batches (
    batch_id INT AUTO_INCREMENT PRIMARY KEY,
    batch_name VARCHAR(50) NOT NULL,
    batch_year INT NOT NULL,
<<<<<<< Updated upstream

    CONSTRAINT uq_batch_name_year UNIQUE (batch_name, batch_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- 3. USER AND ROLE TABLES
-- ==========================================================

=======
    CONSTRAINT uq_batch_name_year UNIQUE (batch_name, batch_year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Users and Roles
>>>>>>> Stashed changes
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
<<<<<<< Updated upstream

    specialization_id INT NULL,
    batch_id INT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_specialization
        FOREIGN KEY (specialization_id)
        REFERENCES specializations (specialization_id)
        ON DELETE SET NULL,

    CONSTRAINT fk_users_batch
        FOREIGN KEY (batch_id)
        REFERENCES batches (batch_id)
        ON DELETE SET NULL
=======
    specialization_id INT NULL,
    batch_id INT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_specialization FOREIGN KEY (specialization_id) REFERENCES specializations (specialization_id) ON DELETE SET NULL,
    CONSTRAINT fk_users_batch FOREIGN KEY (batch_id) REFERENCES batches (batch_id) ON DELETE SET NULL
>>>>>>> Stashed changes
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE user_roles (
    user_role_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
<<<<<<< Updated upstream

    CONSTRAINT fk_user_roles_user
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user_roles_role
        FOREIGN KEY (role_id)
        REFERENCES roles (role_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_user_role UNIQUE (user_id, role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- 4. MODULE TABLES
-- ==========================================================

=======
    CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE,
    CONSTRAINT uq_user_role UNIQUE (user_id, role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Modules
>>>>>>> Stashed changes
CREATE TABLE modules (
    module_id INT AUTO_INCREMENT PRIMARY KEY,
    module_name VARCHAR(150) NOT NULL,
    module_code VARCHAR(50) NOT NULL UNIQUE,
    is_common_module BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE module_specializations (
    module_specialization_id INT AUTO_INCREMENT PRIMARY KEY,
    module_id INT NOT NULL,
    specialization_id INT NOT NULL,
<<<<<<< Updated upstream

    CONSTRAINT fk_module_specializations_module
        FOREIGN KEY (module_id)
        REFERENCES modules (module_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_module_specializations_specialization
        FOREIGN KEY (specialization_id)
        REFERENCES specializations (specialization_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_module_specialization UNIQUE (module_id, specialization_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- 5. QUIZ TABLES
-- ==========================================================

=======
    CONSTRAINT fk_module_specializations_module FOREIGN KEY (module_id) REFERENCES modules (module_id) ON DELETE CASCADE,
    CONSTRAINT fk_module_specializations_specialization FOREIGN KEY (specialization_id) REFERENCES specializations (specialization_id) ON DELETE CASCADE,
    CONSTRAINT uq_module_specialization UNIQUE (module_id, specialization_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Quizzes
>>>>>>> Stashed changes
CREATE TABLE quizzes (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    module_id INT NOT NULL,
    created_by INT NULL,
<<<<<<< Updated upstream

    title VARCHAR(200) NOT NULL,
    description TEXT,

    quiz_type ENUM('PRACTICE', 'MOCK', 'GROUP') NOT NULL,

    timer_minutes INT NULL,
    focus_mode_enabled BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_temporarily_disabled BOOLEAN NOT NULL DEFAULT FALSE,

    available_from TIMESTAMP NULL,
    available_until TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_quizzes_module
        FOREIGN KEY (module_id)
        REFERENCES modules (module_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_quizzes_created_by
        FOREIGN KEY (created_by)
        REFERENCES users (user_id)
        ON DELETE SET NULL,

    CONSTRAINT chk_timer_positive
        CHECK (timer_minutes IS NULL OR timer_minutes > 0),

    CONSTRAINT chk_available_dates
        CHECK (
            available_from IS NULL
            OR available_until IS NULL
            OR available_until > available_from
        )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- This table is used to assign quizzes to specializations and batches.
=======
    title VARCHAR(200) NOT NULL,
    description TEXT,
    quiz_type ENUM('PRACTICE', 'MOCK', 'GROUP') NOT NULL,
    timer_minutes INT NULL,
    focus_mode_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_temporarily_disabled BOOLEAN NOT NULL DEFAULT FALSE,
    available_from TIMESTAMP NULL,
    available_until TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_quizzes_module FOREIGN KEY (module_id) REFERENCES modules (module_id) ON DELETE CASCADE,
    CONSTRAINT fk_quizzes_created_by FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE SET NULL,
    CONSTRAINT chk_timer_positive CHECK (timer_minutes IS NULL OR timer_minutes > 0),
    CONSTRAINT chk_available_dates CHECK (available_from IS NULL OR available_until IS NULL OR available_until > available_from)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

>>>>>>> Stashed changes
CREATE TABLE quiz_assignments (
    assignment_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    specialization_id INT NULL,
    batch_id INT NULL,
    assigned_by INT NULL,
<<<<<<< Updated upstream

    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_quiz_assignments_quiz
        FOREIGN KEY (quiz_id)
        REFERENCES quizzes (quiz_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_quiz_assignments_specialization
        FOREIGN KEY (specialization_id)
        REFERENCES specializations (specialization_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_quiz_assignments_batch
        FOREIGN KEY (batch_id)
        REFERENCES batches (batch_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_quiz_assignments_assigned_by
        FOREIGN KEY (assigned_by)
        REFERENCES users (user_id)
        ON DELETE SET NULL
=======
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_quiz_assignments_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz_assignments_specialization FOREIGN KEY (specialization_id) REFERENCES specializations (specialization_id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz_assignments_batch FOREIGN KEY (batch_id) REFERENCES batches (batch_id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz_assignments_assigned_by FOREIGN KEY (assigned_by) REFERENCES users (user_id) ON DELETE SET NULL
>>>>>>> Stashed changes
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE quiz_upload_batches (
    upload_batch_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NULL,
    uploaded_by INT NULL,
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    file_name VARCHAR(255) NOT NULL,
    total_questions INT NOT NULL DEFAULT 0,
    successful_questions INT NOT NULL DEFAULT 0,
    failed_questions INT NOT NULL DEFAULT 0,
<<<<<<< Updated upstream

    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_quiz_upload_batches_quiz
        FOREIGN KEY (quiz_id)
        REFERENCES quizzes (quiz_id)
        ON DELETE SET NULL,

    CONSTRAINT fk_quiz_upload_batches_uploaded_by
        FOREIGN KEY (uploaded_by)
        REFERENCES users (user_id)
        ON DELETE SET NULL,

    CONSTRAINT chk_upload_question_counts
        CHECK (
            total_questions >= 0
            AND successful_questions >= 0
            AND failed_questions >= 0
        )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- 6. QUESTION TABLES
-- ==========================================================

CREATE TABLE questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,

    question_text TEXT NOT NULL,
    question_type ENUM('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY') NOT NULL,

    marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,

    hint TEXT,
    explanation TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_questions_quiz
        FOREIGN KEY (quiz_id)
        REFERENCES quizzes (quiz_id)
        ON DELETE CASCADE,

    CONSTRAINT chk_question_marks_positive
        CHECK (marks > 0)
=======
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_quiz_upload_batches_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE SET NULL,
    CONSTRAINT fk_quiz_upload_batches_uploaded_by FOREIGN KEY (uploaded_by) REFERENCES users (user_id) ON DELETE SET NULL,
    CONSTRAINT chk_upload_question_counts CHECK (total_questions >= 0 AND successful_questions >= 0 AND failed_questions >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Questions & Options
CREATE TABLE questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question_text TEXT NOT NULL,
    question_type ENUM('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY') NOT NULL,
    marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,
    hint TEXT,
    explanation TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_questions_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE,
    CONSTRAINT chk_question_marks_positive CHECK (marks > 0)
>>>>>>> Stashed changes
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE question_options (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
<<<<<<< Updated upstream

    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_question_options_question
        FOREIGN KEY (question_id)
        REFERENCES questions (question_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- 7. QUIZ ATTEMPT TABLES
-- ==========================================================

=======
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_question_options_question FOREIGN KEY (question_id) REFERENCES questions (question_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Attempts & Answers
>>>>>>> Stashed changes
CREATE TABLE quiz_attempts (
    attempt_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    student_id INT NOT NULL,
<<<<<<< Updated upstream

    attempt_number INT NOT NULL,

    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP NULL,

    time_taken_seconds INT NULL,

    total_marks DECIMAL(8,2) NOT NULL DEFAULT 0.00,
    obtained_marks DECIMAL(8,2) NOT NULL DEFAULT 0.00,

    status ENUM('IN_PROGRESS', 'SUBMITTED', 'AUTO_SUBMITTED', 'CANCELLED') 
        NOT NULL DEFAULT 'IN_PROGRESS',

    auto_submitted BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_quiz_attempts_quiz
        FOREIGN KEY (quiz_id)
        REFERENCES quizzes (quiz_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_quiz_attempts_student
        FOREIGN KEY (student_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_student_quiz_attempt 
        UNIQUE (quiz_id, student_id, attempt_number),

    CONSTRAINT chk_attempt_number_positive
        CHECK (attempt_number > 0),

    CONSTRAINT chk_time_taken_positive
        CHECK (time_taken_seconds IS NULL OR time_taken_seconds >= 0),

    CONSTRAINT chk_marks_valid
        CHECK (
            total_marks >= 0
            AND obtained_marks >= 0
            AND obtained_marks <= total_marks
        )
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- This table stores shuffled question order for each attempt.
=======
    attempt_number INT NOT NULL,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP NULL,
    time_taken_seconds INT NULL,
    total_marks DECIMAL(8,2) NOT NULL DEFAULT 0.00,
    obtained_marks DECIMAL(8,2) NOT NULL DEFAULT 0.00,
    status ENUM('IN_PROGRESS', 'SUBMITTED', 'AUTO_SUBMITTED', 'CANCELLED') NOT NULL DEFAULT 'IN_PROGRESS',
    auto_submitted BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_quiz_attempts_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz_attempts_student FOREIGN KEY (student_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT uq_student_quiz_attempt UNIQUE (quiz_id, student_id, attempt_number),
    CONSTRAINT chk_attempt_number_positive CHECK (attempt_number > 0),
    CONSTRAINT chk_time_taken_positive CHECK (time_taken_seconds IS NULL OR time_taken_seconds >= 0),
    CONSTRAINT chk_marks_valid CHECK (total_marks >= 0 AND obtained_marks >= 0 AND obtained_marks <= total_marks)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

>>>>>>> Stashed changes
CREATE TABLE attempt_questions (
    attempt_question_id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
    question_order INT NOT NULL,
<<<<<<< Updated upstream

    CONSTRAINT fk_attempt_questions_attempt
        FOREIGN KEY (attempt_id)
        REFERENCES quiz_attempts (attempt_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_attempt_questions_question
        FOREIGN KEY (question_id)
        REFERENCES questions (question_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_attempt_question UNIQUE (attempt_id, question_id),
    CONSTRAINT uq_attempt_question_order UNIQUE (attempt_id, question_order),

    CONSTRAINT chk_question_order_positive
        CHECK (question_order > 0)
=======
    CONSTRAINT fk_attempt_questions_attempt FOREIGN KEY (attempt_id) REFERENCES quiz_attempts (attempt_id) ON DELETE CASCADE,
    CONSTRAINT fk_attempt_questions_question FOREIGN KEY (question_id) REFERENCES questions (question_id) ON DELETE CASCADE,
    CONSTRAINT uq_attempt_question UNIQUE (attempt_id, question_id),
    CONSTRAINT uq_attempt_question_order UNIQUE (attempt_id, question_order),
    CONSTRAINT chk_question_order_positive CHECK (question_order > 0)
>>>>>>> Stashed changes
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE student_answers (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    attempt_id INT NOT NULL,
    question_id INT NOT NULL,
<<<<<<< Updated upstream

    selected_option_id INT NULL,
    written_answer TEXT NULL,

    is_correct BOOLEAN NULL,
    marks_awarded DECIMAL(6,2) NOT NULL DEFAULT 0.00,

    answered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_student_answers_attempt
        FOREIGN KEY (attempt_id)
        REFERENCES quiz_attempts (attempt_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_student_answers_question
        FOREIGN KEY (question_id)
        REFERENCES questions (question_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_student_answers_selected_option
        FOREIGN KEY (selected_option_id)
        REFERENCES question_options (option_id)
        ON DELETE SET NULL,

    CONSTRAINT uq_student_answer_per_question 
        UNIQUE (attempt_id, question_id),

    CONSTRAINT chk_marks_awarded_positive
        CHECK (marks_awarded >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- 8. STUDENT DASHBOARD TABLES
-- ==========================================================

=======
    selected_option_id INT NULL,
    written_answer TEXT NULL,
    is_correct BOOLEAN NULL,
    marks_awarded DECIMAL(6,2) NOT NULL DEFAULT 0.00,
    answered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_student_answers_attempt FOREIGN KEY (attempt_id) REFERENCES quiz_attempts (attempt_id) ON DELETE CASCADE,
    CONSTRAINT fk_student_answers_question FOREIGN KEY (question_id) REFERENCES questions (question_id) ON DELETE CASCADE,
    CONSTRAINT fk_student_answers_selected_option FOREIGN KEY (selected_option_id) REFERENCES question_options (option_id) ON DELETE SET NULL,
    CONSTRAINT uq_student_answer_per_question UNIQUE (attempt_id, question_id),
    CONSTRAINT chk_marks_awarded_positive CHECK (marks_awarded >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dashboard Features
>>>>>>> Stashed changes
CREATE TABLE memory_bank (
    memory_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    module_id INT NOT NULL,
<<<<<<< Updated upstream

    note_text TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_memory_bank_student
        FOREIGN KEY (student_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_memory_bank_module
        FOREIGN KEY (module_id)
        REFERENCES modules (module_id)
        ON DELETE CASCADE
=======
    note_text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_memory_bank_student FOREIGN KEY (student_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT fk_memory_bank_module FOREIGN KEY (module_id) REFERENCES modules (module_id) ON DELETE CASCADE
>>>>>>> Stashed changes
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE module_progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    module_id INT NOT NULL,
<<<<<<< Updated upstream

    progress_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,

    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_module_progress_student
        FOREIGN KEY (student_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_module_progress_module
        FOREIGN KEY (module_id)
        REFERENCES modules (module_id)
        ON DELETE CASCADE,

    CONSTRAINT uq_student_module_progress 
        UNIQUE (student_id, module_id),

    CONSTRAINT chk_progress_percentage
        CHECK (progress_percentage >= 0 AND progress_percentage <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- 9. ADMIN DASHBOARD TABLES
-- ==========================================================

CREATE TABLE announcements (
    announcement_id INT AUTO_INCREMENT PRIMARY KEY,
    created_by INT NULL,

    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,

    is_system_wide BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_announcements_created_by
        FOREIGN KEY (created_by)
        REFERENCES users (user_id)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================================
-- 10. OPTIONAL GROUP QUIZ TABLES
-- ==========================================================

CREATE TABLE group_quizzes (
    group_quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,

    group_name VARCHAR(150) NOT NULL,
    created_by INT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_group_quizzes_quiz
        FOREIGN KEY (quiz_id)
        REFERENCES quizzes (quiz_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_group_quizzes_created_by
        FOREIGN KEY (created_by)
        REFERENCES users (user_id)
        ON DELETE SET NULL
=======
    progress_percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_module_progress_student FOREIGN KEY (student_id) REFERENCES users (user_id) ON DELETE CASCADE,
    CONSTRAINT fk_module_progress_module FOREIGN KEY (module_id) REFERENCES modules (module_id) ON DELETE CASCADE,
    CONSTRAINT uq_student_module_progress UNIQUE (student_id, module_id),
    CONSTRAINT chk_progress_percentage CHECK (progress_percentage >= 0 AND progress_percentage <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE announcements (
    announcement_id INT AUTO_INCREMENT PRIMARY KEY,
    created_by INT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_system_wide BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_announcements_created_by FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Group Quizzes
CREATE TABLE group_quizzes (
    group_quiz_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    group_name VARCHAR(150) NOT NULL,
    created_by INT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_group_quizzes_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes (quiz_id) ON DELETE CASCADE,
    CONSTRAINT fk_group_quizzes_created_by FOREIGN KEY (created_by) REFERENCES users (user_id) ON DELETE SET NULL
>>>>>>> Stashed changes
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE group_members (
    group_member_id INT AUTO_INCREMENT PRIMARY KEY,
    group_quiz_id INT NOT NULL,
    student_id INT NOT NULL,
<<<<<<< Updated upstream

    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_group_members_group_quiz
        FOREIGN KEY (group_quiz_id)
        REFERENCES group_quizzes (group_quiz_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_group_members_student
        FOREIGN KEY (student_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE,

=======
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_group_members_group_quiz FOREIGN KEY (group_quiz_id) REFERENCES group_quizzes (group_quiz_id) ON DELETE CASCADE,
    CONSTRAINT fk_group_members_student FOREIGN KEY (student_id) REFERENCES users (user_id) ON DELETE CASCADE,
>>>>>>> Stashed changes
    CONSTRAINT uq_group_member UNIQUE (group_quiz_id, student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
