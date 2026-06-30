package com.inkode.quizzleybackend.service;

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
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
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
                    }
                }
            }
        }

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

        // Resolve Module by code (or fallback by ID)
        Module module = null;
        if (dto.getModuleCode() != null) {
            module = moduleRepository.findByModuleCode(dto.getModuleCode()).orElse(null);
        }
        if (module == null && dto.getModuleId() != null) {
            module = moduleRepository.findById(dto.getModuleId()).orElse(null);
        }
        if (module != null) {
            existing.setModule(module);
        }

        // Save updated Quiz metadata first
        Quiz savedQuiz = quizRepository.save(existing);

        // Delete existing questions
        List<Question> existingQuestions = questionRepository.findByQuizQuizId(id);
        questionRepository.deleteAll(existingQuestions);

        // Recreate new questions & options
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
                    }
                }
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

        // Map questions
        List<Question> questions = questionRepository.findByQuizQuizId(id);
        List<QuestionDto> questionDtos = new java.util.ArrayList<>();
        for (Question q : questions) {
            QuestionDto qDto = new QuestionDto();
            qDto.setText(q.getQuestionText());
            qDto.setType(q.getQuestionType() != null ? q.getQuestionType().name() : "MCQ");
            qDto.setMarks(q.getMarks());
            
            // Map options
            List<QuestionOptionDto> optDtos = new java.util.ArrayList<>();
            if (q.getOptions() != null) {
                for (QuestionOption opt : q.getOptions()) {
                    QuestionOptionDto optDto = new QuestionOptionDto();
                    optDto.setText(opt.getOptionText());
                    optDto.setCorrect(opt.getIsCorrect());
                    optDtos.add(optDto);
                }
            }
            qDto.setOptions(optDtos);
            questionDtos.add(qDto);
        }
        dto.setQuestions(questionDtos);

        return dto;
    }

    /**
     * Deletes a quiz by id. Throws 404 if not found.
     */
    public void deleteQuiz(Long id) {
        if (!quizRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Quiz not found with id: " + id);
        }
        quizRepository.deleteById(id);
    }
}
