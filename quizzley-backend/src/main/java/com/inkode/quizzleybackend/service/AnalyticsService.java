package com.inkode.quizzleybackend.service;

import com.inkode.quizzleybackend.dto.AnalyticsDto;
import com.inkode.quizzleybackend.dto.ModuleStatsDto;
import com.inkode.quizzleybackend.dto.QuizPerformanceDto;
import com.inkode.quizzleybackend.model.Module;
import com.inkode.quizzleybackend.model.Quiz;
import com.inkode.quizzleybackend.model.QuizAttempt;
import com.inkode.quizzleybackend.repository.ModuleRepository;
import com.inkode.quizzleybackend.repository.QuizAttemptRepository;
import com.inkode.quizzleybackend.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AnalyticsService {

    @Autowired
    private QuizAttemptRepository attemptRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public AnalyticsDto getAnalytics() {
        List<QuizAttempt> allAttempts = attemptRepository.findAll();
        List<Quiz> allQuizzes = quizRepository.findAll();

        int totalAttempts = allAttempts.size();
        
        // Compute general metrics
        double totalScoreSum = 0;
        int submittedCount = 0;
        int passedCount = 0;

        for (QuizAttempt attempt : allAttempts) {
            String status = attempt.getStatus();
            if ("SUBMITTED".equalsIgnoreCase(status) || "AUTO_SUBMITTED".equalsIgnoreCase(status)) {
                submittedCount++;
                double scorePerc = 0;
                if (attempt.getTotalMarks() > 0) {
                    scorePerc = (attempt.getObtainedMarks() / attempt.getTotalMarks());
                }
                totalScoreSum += scorePerc;

                if (scorePerc >= 0.60) {
                    passedCount++;
                }
            }
        }

        double avgScore = submittedCount > 0 ? (totalScoreSum / submittedCount) * 100 : 0.0;
        double passRate = submittedCount > 0 ? ((double) passedCount / submittedCount) * 100 : 0.0;
        double completionRate = totalAttempts > 0 ? ((double) submittedCount / totalAttempts) * 100 : 0.0;

        // Compute quiz by quiz performance
        List<QuizPerformanceDto> performanceList = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for (Quiz quiz : allQuizzes) {
            List<QuizAttempt> quizAttempts = attemptRepository.findByQuizQuizId(quiz.getQuizId());
            Set<Long> uniqueStudents = new HashSet<>();
            
            double quizScoreSum = 0;
            int quizSubmittedCount = 0;
            int quizPassedCount = 0;

            for (QuizAttempt attempt : quizAttempts) {
                if (attempt.getStudent() != null) {
                    uniqueStudents.add(attempt.getStudent().getUserId());
                }

                String status = attempt.getStatus();
                if ("SUBMITTED".equalsIgnoreCase(status) || "AUTO_SUBMITTED".equalsIgnoreCase(status)) {
                    quizSubmittedCount++;
                    double scorePerc = 0;
                    if (attempt.getTotalMarks() > 0) {
                        scorePerc = (attempt.getObtainedMarks() / attempt.getTotalMarks());
                    }
                    quizScoreSum += scorePerc;

                    if (scorePerc >= 0.60) {
                        quizPassedCount++;
                    }
                }
            }

            double quizAvgScore = quizSubmittedCount > 0 ? (quizScoreSum / quizSubmittedCount) * 100 : -1.0;
            double quizPassRate = quizSubmittedCount > 0 ? ((double) quizPassedCount / quizSubmittedCount) * 100 : -1.0;

            // Resolve Quiz Status
            String quizStatus = "Live";
            if (!quiz.getIsActive()) {
                quizStatus = "Draft";
            } else if (quiz.getAvailableFrom() != null && quiz.getAvailableUntil() != null) {
                if (now.isBefore(quiz.getAvailableFrom())) {
                    quizStatus = "Scheduled";
                } else if (now.isAfter(quiz.getAvailableUntil())) {
                    quizStatus = "Completed";
                }
            }

            String avgScoreStr = quizAvgScore >= 0 ? String.format("%.1f%%", quizAvgScore) : "—";
            String passRateStr = quizPassRate >= 0 ? String.format("%.1f%%", quizPassRate) : "—";

            performanceList.add(new QuizPerformanceDto(
                    quiz.getTitle(),
                    uniqueStudents.size(),
                    avgScoreStr,
                    passRateStr,
                    quizStatus
            ));
        }

        return new AnalyticsDto(
                String.valueOf(totalAttempts),
                String.format("%.1f%%", avgScore),
                String.format("%.0f%%", passRate),
                String.format("%.0f%%", completionRate),
                performanceList
        );
    }

    /**
     * Returns per-module statistics: quiz count and question count.
     */
    public List<ModuleStatsDto> getModuleStats() {
        List<Module> modules = moduleRepository.findAll();
        List<ModuleStatsDto> result = new ArrayList<>();

        for (Module module : modules) {
            // Get quizzes for this module
            List<Quiz> quizzes = quizRepository.findAll().stream()
                    .filter(q -> q.getModule() != null && q.getModule().getModuleId().equals(module.getModuleId()))
                    .collect(java.util.stream.Collectors.toList());

            // Count questions from dynamic module questions table
            String tableName = module.getModuleCode().replaceAll("[^a-zA-Z0-9_]", "").toLowerCase() + "_questions";
            int questionCount = 0;
            try {
                Integer count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM " + tableName, Integer.class);
                if (count != null) {
                    questionCount = count;
                }
            } catch (Exception e) {
                // Table might not exist yet if no quizzes created
            }

            result.add(new ModuleStatsDto(
                    module.getModuleCode(),
                    module.getModuleName(),
                    quizzes.size(),
                    questionCount
            ));
        }

        return result;
    }
}
