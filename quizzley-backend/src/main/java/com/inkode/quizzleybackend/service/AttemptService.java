package com.inkode.quizzleybackend.service;

import com.inkode.quizzleybackend.dto.AnswerSubmissionDto;
import com.inkode.quizzleybackend.dto.AttemptResponseDto;
import com.inkode.quizzleybackend.dto.OptionDto;
import com.inkode.quizzleybackend.dto.QuestionDto;
import com.inkode.quizzleybackend.dto.SubmitAttemptRequest;
import com.inkode.quizzleybackend.model.*;
import com.inkode.quizzleybackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AttemptService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionOptionRepository questionOptionRepository;

    @Autowired
    private AttemptQuestionRepository attemptQuestionRepository;

    @Autowired
    private StudentAnswerRepository studentAnswerRepository;

    @Transactional
    public AttemptResponseDto startAttempt(Integer quizId, Integer studentId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Determine attempt number
        Optional<QuizAttempt> latestAttempt = quizAttemptRepository
                .findFirstByQuizQuizIdAndStudentUserIdOrderByAttemptNumberDesc(quizId, studentId);
        int nextAttemptNumber = latestAttempt.map(attempt -> attempt.getAttemptNumber() + 1).orElse(1);

        // Create new attempt
        QuizAttempt attempt = new QuizAttempt();
        attempt.setQuiz(quiz);
        attempt.setStudent(student);
        attempt.setAttemptNumber(nextAttemptNumber);
        attempt.setStatus(QuizAttempt.AttemptStatus.IN_PROGRESS);
        attempt.setStartedAt(LocalDateTime.now());
        attempt.setTotalMarks(BigDecimal.ZERO);
        attempt.setObtainedMarks(BigDecimal.ZERO);
        attempt.setAutoSubmitted(false);

        QuizAttempt savedAttempt = quizAttemptRepository.save(attempt);

        // Shuffle questions
        List<Question> questions = questionRepository.findByQuizQuizId(quizId);
        List<Question> activeQuestions = questions.stream()
                .filter(Question::getIsActive)
                .collect(Collectors.toList());
        Collections.shuffle(activeQuestions);

        // Save question order
        List<QuestionDto> questionDtos = new ArrayList<>();
        BigDecimal totalMarks = BigDecimal.ZERO;

        for (int i = 0; i < activeQuestions.size(); i++) {
            Question q = activeQuestions.get(i);
            totalMarks = totalMarks.add(q.getMarks());

            AttemptQuestion aq = new AttemptQuestion();
            aq.setAttempt(savedAttempt);
            aq.setQuestion(q);
            aq.setQuestionOrder(i + 1);
            attemptQuestionRepository.save(aq);

            // Map to DTO (hiding correct answers)
            QuestionDto qDto = new QuestionDto();
            qDto.setQuestionId(q.getQuestionId());
            qDto.setQuizId(quizId);
            qDto.setQuestionText(q.getQuestionText());
            qDto.setQuestionType(q.getQuestionType().name());
            qDto.setMarks(q.getMarks());

            List<QuestionOption> options = questionOptionRepository.findByQuestionQuestionId(q.getQuestionId());
            List<OptionDto> optionDtos = options.stream().map(opt -> new OptionDto(
                    opt.getOptionId(),
                    q.getQuestionId(),
                    opt.getOptionText(),
                    false // Cheat prevention: set to false
            )).collect(Collectors.toList());

            qDto.setOptions(optionDtos);
            questionDtos.add(qDto);
        }

        // Update total marks for attempt
        savedAttempt.setTotalMarks(totalMarks);
        quizAttemptRepository.save(savedAttempt);

        AttemptResponseDto response = new AttemptResponseDto();
        response.setAttemptId(savedAttempt.getAttemptId());
        response.setQuizId(quizId);
        response.setTitle(quiz.getTitle());
        response.setTimerMinutes(quiz.getTimerMinutes());
        response.setFocusModeEnabled(quiz.getFocusModeEnabled());
        response.setQuestions(questionDtos);

        return response;
    }

    @Transactional
    public QuizAttempt submitAttempt(SubmitAttemptRequest request) {
        QuizAttempt attempt = quizAttemptRepository.findById(request.getAttemptId())
                .orElseThrow(() -> new RuntimeException("Attempt not found"));

        if (attempt.getStatus() != QuizAttempt.AttemptStatus.IN_PROGRESS) {
            throw new RuntimeException("Attempt has already been submitted.");
        }

        attempt.setSubmittedAt(LocalDateTime.now());
        attempt.setStatus(QuizAttempt.AttemptStatus.SUBMITTED);
        
        // Calculate duration
        long seconds = Duration.between(attempt.getStartedAt(), attempt.getSubmittedAt()).getSeconds();
        attempt.setTimeTakenSeconds((int) seconds);

        BigDecimal obtainedMarks = BigDecimal.ZERO;

        if (request.getAnswers() != null) {
            for (AnswerSubmissionDto ansDto : request.getAnswers()) {
                Question question = questionRepository.findById(ansDto.getQuestionId())
                        .orElseThrow(() -> new RuntimeException("Question not found"));

                StudentAnswer sa = new StudentAnswer();
                sa.setAttempt(attempt);
                sa.setQuestion(question);
                sa.setAnsweredAt(LocalDateTime.now());

                if (ansDto.getSelectedOptionId() != null) {
                    QuestionOption selectedOpt = questionOptionRepository.findById(ansDto.getSelectedOptionId())
                            .orElseThrow(() -> new RuntimeException("Option not found"));
                    sa.setSelectedOption(selectedOpt);

                    if (selectedOpt.getIsCorrect()) {
                        sa.setIsCorrect(true);
                        sa.setMarksAwarded(question.getMarks());
                        obtainedMarks = obtainedMarks.add(question.getMarks());
                    } else {
                        sa.setIsCorrect(false);
                        sa.setMarksAwarded(BigDecimal.ZERO);
                    }
                } else if (ansDto.getWrittenAnswer() != null) {
                    sa.setWrittenAnswer(ansDto.getWrittenAnswer());
                    // Essay or short answers require manual grading, set default marks to 0 for now
                    sa.setIsCorrect(null);
                    sa.setMarksAwarded(BigDecimal.ZERO);
                } else {
                    sa.setIsCorrect(false);
                    sa.setMarksAwarded(BigDecimal.ZERO);
                }

                studentAnswerRepository.save(sa);
            }
        }

        attempt.setObtainedMarks(obtainedMarks);
        return quizAttemptRepository.save(attempt);
    }

    public List<QuizAttempt> getStudentAttempts(Integer studentId) {
        return quizAttemptRepository.findByStudentUserId(studentId);
    }
}
