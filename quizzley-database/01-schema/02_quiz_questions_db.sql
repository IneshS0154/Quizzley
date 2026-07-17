CREATE DATABASE IF NOT EXISTS quiz_questions_db;
USE quiz_questions_db;

-- ==========================================================
-- 1. DROP EXISTING QUESTION TABLES IF NEEDED
-- ==========================================================
-- (Clean up scripts for the modules)
DROP TABLE IF EXISTS question_options_osa;
DROP TABLE IF EXISTS questions_osa;

DROP TABLE IF EXISTS question_options_oop;
DROP TABLE IF EXISTS questions_oop;

DROP TABLE IF EXISTS question_options_dbs101;
DROP TABLE IF EXISTS questions_dbs101;

DROP TABLE IF EXISTS question_options_se201;
DROP TABLE IF EXISTS questions_se201;

DROP TABLE IF EXISTS question_options_cs101;
DROP TABLE IF EXISTS questions_cs101;

DROP TABLE IF EXISTS question_options_pf101;
DROP TABLE IF EXISTS questions_pf101;


-- ==========================================================
-- 2. MODULE: OSA (Operating System Architecture)
-- ==========================================================
CREATE TABLE questions_osa (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL, -- Logical reference to quiz_platform_db.quizzes.quiz_id

    question_text TEXT NOT NULL,
    question_type ENUM('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY') NOT NULL,

    marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,

    hint TEXT,
    explanation TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_questions_osa_marks_positive CHECK (marks > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE question_options_osa (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,

    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_options_question_osa
        FOREIGN KEY (question_id)
        REFERENCES questions_osa (question_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ==========================================================
-- 3. MODULE: OOP (Object-Oriented Programming)
-- ==========================================================
CREATE TABLE questions_oop (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,

    question_text TEXT NOT NULL,
    question_type ENUM('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY') NOT NULL,

    marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,

    hint TEXT,
    explanation TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_questions_oop_marks_positive CHECK (marks > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE question_options_oop (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,

    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_options_question_oop
        FOREIGN KEY (question_id)
        REFERENCES questions_oop (question_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ==========================================================
-- 4. MODULE: DBS101 (Database Systems)
-- ==========================================================
CREATE TABLE questions_dbs101 (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,

    question_text TEXT NOT NULL,
    question_type ENUM('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY') NOT NULL,

    marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,

    hint TEXT,
    explanation TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_questions_dbs101_marks_positive CHECK (marks > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE question_options_dbs101 (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,

    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_options_question_dbs101
        FOREIGN KEY (question_id)
        REFERENCES questions_dbs101 (question_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ==========================================================
-- 5. MODULE: SE201 (Software Engineering)
-- ==========================================================
CREATE TABLE questions_se201 (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,

    question_text TEXT NOT NULL,
    question_type ENUM('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY') NOT NULL,

    marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,

    hint TEXT,
    explanation TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_questions_se201_marks_positive CHECK (marks > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE question_options_se201 (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,

    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_options_question_se201
        FOREIGN KEY (question_id)
        REFERENCES questions_se201 (question_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ==========================================================
-- 6. MODULE: CS101 (Cyber Security Fundamentals)
-- ==========================================================
CREATE TABLE questions_cs101 (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,

    question_text TEXT NOT NULL,
    question_type ENUM('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY') NOT NULL,

    marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,

    hint TEXT,
    explanation TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_questions_cs101_marks_positive CHECK (marks > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE question_options_cs101 (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,

    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_options_question_cs101
        FOREIGN KEY (question_id)
        REFERENCES questions_cs101 (question_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ==========================================================
-- 7. MODULE: PF101 (Programming Fundamentals)
-- ==========================================================
CREATE TABLE questions_pf101 (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,

    question_text TEXT NOT NULL,
    question_type ENUM('MCQ', 'TRUE_FALSE', 'SHORT_ANSWER', 'ESSAY') NOT NULL,

    marks DECIMAL(6,2) NOT NULL DEFAULT 1.00,

    hint TEXT,
    explanation TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_questions_pf101_marks_positive CHECK (marks > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE question_options_pf101 (
    option_id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,

    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_options_question_pf101
        FOREIGN KEY (question_id)
        REFERENCES questions_pf101 (question_id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
