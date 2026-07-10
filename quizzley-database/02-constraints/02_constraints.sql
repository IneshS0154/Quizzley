USE quiz_platform_db;

-- ==========================================================
-- 11. INDEXES FOR PERFORMANCE
-- ==========================================================

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

CREATE INDEX idx_questions_quiz_id ON questions (quiz_id);
CREATE INDEX idx_question_options_question_id 
ON question_options (question_id);

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
