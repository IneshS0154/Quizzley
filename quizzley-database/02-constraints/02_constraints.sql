-- ==========================================================
-- 11. INDEXES FOR PERFORMANCE - MAIN PLATFORM DB
-- ==========================================================
USE quiz_platform_db;

CREATE INDEX idx_users_specialization_id ON users (specialization_id);
CREATE INDEX idx_users_batch_id ON users (batch_id);

CREATE INDEX idx_user_roles_user_id ON user_roles (user_id);
CREATE INDEX idx_user_roles_role_id ON user_roles (role_id);

CREATE INDEX idx_module_specializations_module_id 
ON module_specializations (module_id);

CREATE INDEX idx_module_specializations_specialization_id 
ON module_specializations (specialization_id);

CREATE INDEX idx_quizzes_module_id ON quizzes (module_id);
CREATE INDEX idx_quizzes_created_by ON quizzes (created_by);
CREATE INDEX idx_quizzes_quiz_type ON quizzes (quiz_type);

CREATE INDEX idx_quiz_assignments_quiz_id ON quiz_assignments (quiz_id);
CREATE INDEX idx_quiz_assignments_specialization_id 
ON quiz_assignments (specialization_id);
CREATE INDEX idx_quiz_assignments_batch_id 
ON quiz_assignments (batch_id);

CREATE INDEX idx_quiz_attempts_quiz_id ON quiz_attempts (quiz_id);
CREATE INDEX idx_quiz_attempts_student_id ON quiz_attempts (student_id);

CREATE INDEX idx_attempt_questions_attempt_id 
ON attempt_questions (attempt_id);

CREATE INDEX idx_student_answers_attempt_id 
ON student_answers (attempt_id);

CREATE INDEX idx_student_answers_question_id 
ON student_answers (question_id);

CREATE INDEX idx_memory_bank_student_id ON memory_bank (student_id);
CREATE INDEX idx_memory_bank_module_id ON memory_bank (module_id);

CREATE INDEX idx_module_progress_student_id ON module_progress (student_id);
CREATE INDEX idx_module_progress_module_id ON module_progress (module_id);

CREATE INDEX idx_announcements_created_by ON announcements (created_by);

CREATE INDEX idx_group_quizzes_quiz_id ON group_quizzes (quiz_id);

CREATE INDEX idx_group_members_group_quiz_id 
ON group_members (group_quiz_id);

CREATE INDEX idx_group_members_student_id 
ON group_members (student_id);


-- ==========================================================
-- 11. INDEXES FOR PERFORMANCE - QUESTIONS DB
-- ==========================================================
USE quiz_questions_db;

-- OSA
CREATE INDEX idx_questions_osa_quiz_id ON questions_osa (quiz_id);
CREATE INDEX idx_question_options_osa_question_id ON question_options_osa (question_id);

-- OOP
CREATE INDEX idx_questions_oop_quiz_id ON questions_oop (quiz_id);
CREATE INDEX idx_question_options_oop_question_id ON question_options_oop (question_id);

-- DBS101
CREATE INDEX idx_questions_dbs101_quiz_id ON questions_dbs101 (quiz_id);
CREATE INDEX idx_question_options_dbs101_question_id ON question_options_dbs101 (question_id);

-- SE201
CREATE INDEX idx_questions_se201_quiz_id ON questions_se201 (quiz_id);
CREATE INDEX idx_question_options_se201_question_id ON question_options_se201 (question_id);

-- CS101
CREATE INDEX idx_questions_cs101_quiz_id ON questions_cs101 (quiz_id);
CREATE INDEX idx_question_options_cs101_question_id ON question_options_cs101 (question_id);

-- PF101
CREATE INDEX idx_questions_pf101_quiz_id ON questions_pf101 (quiz_id);
CREATE INDEX idx_question_options_pf101_question_id ON question_options_pf101 (question_id);
