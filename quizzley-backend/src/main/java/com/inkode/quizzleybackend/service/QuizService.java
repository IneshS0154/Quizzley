package com.inkode.quizzleybackend.service;

<<<<<<< Updated upstream
import com.inkode.quizzleybackend.dto.QuizDto;
import com.inkode.quizzleybackend.dto.QuestionDto;
import com.inkode.quizzleybackend.dto.QuestionOptionDto;
import com.inkode.quizzleybackend.model.Quiz;
import com.inkode.quizzleybackend.model.Module;
import com.inkode.quizzleybackend.model.Question;
import com.inkode.quizzleybackend.model.QuestionOption;
import com.inkode.quizzleybackend.repository.QuizRepository;
import com.inkode.quizzleybackend.repository.ModuleRepository;
import com.inkode.quizzleybackend.repository.QuestionRepository;
import com.inkode.quizzleybackend.repository.QuestionOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
=======
import com.inkode.quizzleybackend.dto.OptionDto;
import com.inkode.quizzleybackend.dto.QuestionDto;
import com.inkode.quizzleybackend.dto.QuizDto;
import com.inkode.quizzleybackend.model.*;
import com.inkode.quizzleybackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
>>>>>>> Stashed changes
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
<<<<<<< Updated upstream
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionOptionRepository optionRepository;

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
        // description maps to instructions in the form
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
            // Fallback: use first module in DB or throw
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
        
        // Map status to isActive
        if ("PUBLISHED".equalsIgnoreCase(dto.getStatus()) || Boolean.TRUE.equals(dto.getIsActive())) {
            quiz.setIsActive(true);
        } else {
            quiz.setIsActive(false);
        }

        quiz.setAvailableFrom(dto.getAvailableFrom());
        quiz.setAvailableUntil(dto.getAvailableUntil());
        quiz.setCreatedBy(1L); // Default to seeded admin/teacher user

        // Save Quiz
        Quiz savedQuiz = quizRepository.save(quiz);

        // 3. Save Questions & Options
        if (dto.getQuestions() != null) {
            for (QuestionDto qDto : dto.getQuestions()) {
                Question question = new Question();
                question.setQuiz(savedQuiz);
                question.setQuestionText(qDto.getText());
                
                String qType = qDto.getType() != null ? qDto.getType() : "MCQ";
                try {
                    question.setQuestionType(Question.QuestionType.valueOf(qType.toUpperCase()));
                } catch (IllegalArgumentException e) {
                    question.setQuestionType(Question.QuestionType.MCQ);
                }
                
                question.setMarks(qDto.getMarks() != null ? qDto.getMarks() : 1.0);
                question.setIsActive(true);

                Question savedQuestion = questionRepository.save(question);

                if (qDto.getOptions() != null) {
                    for (QuestionOptionDto optDto : qDto.getOptions()) {
                        QuestionOption option = new QuestionOption();
                        option.setQuestion(savedQuestion);
                        option.setOptionText(optDto.getText());
                        option.setIsCorrect(optDto.getCorrect() != null ? optDto.getCorrect() : false);
                        optionRepository.save(option);
=======
    private UserRepository userRepository;

    @Autowired
    private QuizAssignmentRepository quizAssignmentRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionOptionRepository questionOptionRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    public List<QuizDto> getAllQuizzesForAdmin() {
        List<Quiz> quizzes = quizRepository.findAll();
        return quizzes.stream()
                .map(this::convertToDtoAdmin)
                .collect(Collectors.toList());
    }

    public List<QuizDto> getQuizzesForStudent(Integer studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (student.getSpecialization() == null || student.getBatch() == null) {
            return new ArrayList<>();
        }

        List<QuizAssignment> assignments = quizAssignmentRepository
                .findBySpecializationSpecializationIdAndBatchBatchId(
                        student.getSpecialization().getSpecializationId(),
                        student.getBatch().getBatchId()
                );

        return assignments.stream()
                .map(assignment -> convertToDtoStudent(assignment.getQuiz(), studentId))
                .collect(Collectors.toList());
    }

    public QuizDto getQuizDetails(Integer quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        QuizDto dto = convertToDtoAdmin(quiz);
        
        // Fetch questions
        List<Question> questions = questionRepository.findByQuizQuizId(quizId);
        List<QuestionDto> questionDtos = questions.stream().map(q -> {
            QuestionDto qDto = new QuestionDto();
            qDto.setQuestionId(q.getQuestionId());
            qDto.setQuizId(quizId);
            qDto.setQuestionText(q.getQuestionText());
            qDto.setQuestionType(q.getQuestionType().name());
            qDto.setMarks(q.getMarks());
            qDto.setHint(q.getHint());
            qDto.setExplanation(q.getExplanation());

            List<QuestionOption> options = questionOptionRepository.findByQuestionQuestionId(q.getQuestionId());
            List<OptionDto> optionDtos = options.stream().map(opt -> new OptionDto(
                    opt.getOptionId(),
                    q.getQuestionId(),
                    opt.getOptionText(),
                    opt.getIsCorrect()
            )).collect(Collectors.toList());

            qDto.setOptions(optionDtos);
            return qDto;
        }).collect(Collectors.toList());

        dto.setQuestions(questionDtos);
        return dto;
    }

    @Transactional
    public QuizDto saveQuiz(QuizDto dto, Integer creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Module module = moduleRepository.findById(dto.getModuleId())
                .orElseThrow(() -> new RuntimeException("Module not found"));

        Quiz quiz = new Quiz();
        if (dto.getQuizId() != null) {
            quiz = quizRepository.findById(dto.getQuizId())
                    .orElseThrow(() -> new RuntimeException("Quiz not found"));
        }

        quiz.setTitle(dto.getTitle());
        quiz.setDescription(dto.getDescription());
        quiz.setQuizType(Quiz.QuizType.valueOf(dto.getQuizType().toUpperCase()));
        quiz.setTimerMinutes(dto.getTimerMinutes());
        quiz.setFocusModeEnabled(dto.getFocusModeEnabled() != null ? dto.getFocusModeEnabled() : false);
        quiz.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        quiz.setIsTemporarilyDisabled(dto.getIsTemporarilyDisabled() != null ? dto.getIsTemporarilyDisabled() : false);
        quiz.setAvailableFrom(dto.getAvailableFrom());
        quiz.setAvailableUntil(dto.getAvailableUntil());
        quiz.setModule(module);
        quiz.setCreatedBy(creator);

        Quiz savedQuiz = quizRepository.save(quiz);

        // Save Assignment if specialization and batch are specified
        if (dto.getSpecializationId() != null && dto.getBatchId() != null) {
            // Delete old assignment if exists
            List<QuizAssignment> existing = quizAssignmentRepository.findAll();
            for (QuizAssignment ass : existing) {
                if (ass.getQuiz().getQuizId().equals(savedQuiz.getQuizId())) {
                    quizAssignmentRepository.delete(ass);
                }
            }

            QuizAssignment assignment = new QuizAssignment();
            assignment.setQuiz(savedQuiz);
            
            Specialization spec = new Specialization();
            spec.setSpecializationId(dto.getSpecializationId());
            assignment.setSpecialization(spec);

            Batch batch = new Batch();
            batch.setBatchId(dto.getBatchId());
            assignment.setBatch(batch);
            
            assignment.setAssignedBy(creator);
            quizAssignmentRepository.save(assignment);
        }

        // Save questions
        if (dto.getQuestions() != null) {
            // Clear existing questions for update
            if (dto.getQuizId() != null) {
                List<Question> existingQs = questionRepository.findByQuizQuizId(dto.getQuizId());
                questionRepository.deleteAll(existingQs);
            }

            for (QuestionDto qDto : dto.getQuestions()) {
                Question question = new Question();
                question.setQuiz(savedQuiz);
                question.setQuestionText(qDto.getQuestionText());
                question.setQuestionType(Question.QuestionType.valueOf(qDto.getQuestionType().toUpperCase()));
                question.setMarks(qDto.getMarks());
                question.setHint(qDto.getHint());
                question.setExplanation(qDto.getExplanation());
                question.setIsActive(true);

                Question savedQ = questionRepository.save(question);

                if (qDto.getOptions() != null) {
                    for (OptionDto optDto : qDto.getOptions()) {
                        QuestionOption opt = new QuestionOption();
                        opt.setQuestion(savedQ);
                        opt.setOptionText(optDto.getOptionText());
                        opt.setIsCorrect(optDto.getIsCorrect() != null ? optDto.getIsCorrect() : false);
                        questionOptionRepository.save(opt);
>>>>>>> Stashed changes
                    }
                }
            }
        }

<<<<<<< Updated upstream
        return savedQuiz;
    }

    /**
     * Updates an existing Quiz identified by id with DTO data.
     */
    public Quiz updateQuiz(Long id, QuizDto dto) {
        Quiz existing = quizRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Quiz not found with id: " + id));
        
        if (dto.getTitle() != null)          existing.setTitle(dto.getTitle());
        if (dto.getDescription() != null)    existing.setDescription(dto.getDescription());
        if (dto.getTimerMinutes() != null)   existing.setTimerMinutes(dto.getTimerMinutes());
        if (dto.getFocusMode() != null)      existing.setFocusModeEnabled(dto.getFocusMode());
        if (dto.getFocusModeEnabled() != null) existing.setFocusModeEnabled(dto.getFocusModeEnabled());
        if (dto.getIsActive() != null)       existing.setIsActive(dto.getIsActive());
        if (dto.getAvailableFrom() != null)  existing.setAvailableFrom(dto.getAvailableFrom());
        if (dto.getAvailableUntil() != null) existing.setAvailableUntil(dto.getAvailableUntil());

        if (dto.getQuizType() != null) {
            try {
                existing.setQuizType(Quiz.QuizType.valueOf(dto.getQuizType().toUpperCase()));
            } catch (IllegalArgumentException e) {
                // ignore invalid type
            }
        }

        return quizRepository.save(existing);
    }

    /**
     * Deletes a quiz by id. Throws 404 if not found.
     */
    public void deleteQuiz(Long id) {
        if (!quizRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found with id: " + id);
        }
        quizRepository.deleteById(id);
=======
        return convertToDtoAdmin(savedQuiz);
    }

    @Transactional
    public void deleteQuiz(Integer quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        quizRepository.delete(quiz);
    }

    private QuizDto convertToDtoAdmin(Quiz quiz) {
        QuizDto dto = new QuizDto();
        dto.setQuizId(quiz.getQuizId());
        dto.setModuleId(quiz.getModule().getModuleId());
        dto.setModuleName(quiz.getModule().getModuleName());
        dto.setModuleCode(quiz.getModule().getModuleCode());
        dto.setCreatedBy(quiz.getCreatedBy() != null ? quiz.getCreatedBy().getUserId() : null);
        dto.setCreatedByName(quiz.getCreatedBy() != null ? quiz.getCreatedBy().getFullName() : null);
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setQuizType(quiz.getQuizType().name());
        dto.setTimerMinutes(quiz.getTimerMinutes());
        dto.setFocusModeEnabled(quiz.getFocusModeEnabled());
        dto.setIsActive(quiz.getIsActive());
        dto.setIsTemporarilyDisabled(quiz.getIsTemporarilyDisabled());
        dto.setAvailableFrom(quiz.getAvailableFrom());
        dto.setAvailableUntil(quiz.getAvailableUntil());

        // Find Assignment
        List<QuizAssignment> existing = quizAssignmentRepository.findAll();
        for (QuizAssignment ass : existing) {
            if (ass.getQuiz().getQuizId().equals(quiz.getQuizId())) {
                dto.setSpecializationId(ass.getSpecialization().getSpecializationId());
                dto.setSpecializationName(ass.getSpecialization().getSpecializationName());
                dto.setBatchId(ass.getBatch().getBatchId());
                dto.setBatchName(ass.getBatch().getBatchName());
                break;
            }
        }

        // Calculate attempts and participants for display stats
        List<QuizAttempt> attempts = quizAttemptRepository.findByQuizQuizId(quiz.getQuizId());
        dto.setParticipationCount((int) attempts.stream().map(a -> a.getStudent().getUserId()).distinct().count());
        dto.setTotalParticipants(28); // Mock class size, or we could count users in that batch

        return dto;
    }

    private QuizDto convertToDtoStudent(Quiz quiz, Integer studentId) {
        QuizDto dto = convertToDtoAdmin(quiz);
        
        // Hide correct options for student unless they completed it
        // (AttemptService will handle specific layout)
        return dto;
>>>>>>> Stashed changes
    }
}
