package com.inkode.quizzleybackend.controller;

import com.inkode.quizzleybackend.entity.QuizAttemptEntity;
import com.inkode.quizzleybackend.entity.QuizEntity;
import com.inkode.quizzleybackend.entity.UserEntity;
import com.inkode.quizzleybackend.repository.QuizAttemptRepository;
import com.inkode.quizzleybackend.repository.QuizRepository;
import com.inkode.quizzleybackend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/student/dashboard")
public class StudentDashboardController {

    private final UserRepository userRepository;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;

    public StudentDashboardController(
            UserRepository userRepository,
            QuizRepository quizRepository,
            QuizAttemptRepository quizAttemptRepository
    ) {
        this.userRepository = userRepository;
        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
    }

    @GetMapping("/summary")
    public StudentDashboardSummary getDashboardSummary() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        String email = authentication.getName();
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Integer specId = user.getSpecialization() != null ? user.getSpecialization().getId() : null;
        Integer batchId = user.getBatch() != null ? user.getBatch().getId() : null;

        String specName = user.getSpecialization() != null ? user.getSpecialization().getSpecializationName() : "General";
        String batchName = user.getBatch() != null ? user.getBatch().getBatchName() : "N/A";

        // --- DYNAMIC DATABASE MODE ---
        
        // 1. Profile
        StudentProfileResponse profile = new StudentProfileResponse(
                user.getFullName(),
                user.getEmail(),
                "QZ-2026-" + user.getId(),
                specName,
                batchName
        );

        // 2. Stats
        List<QuizAttemptEntity> completedAttempts = quizAttemptRepository.findByStudentIdAndStatusIn(
                user.getId(),
                List.of(QuizAttemptEntity.AttemptStatus.SUBMITTED, QuizAttemptEntity.AttemptStatus.AUTO_SUBMITTED)
        );
        double totalPercentage = 0.0;
        int completedCount = completedAttempts.size();

        for (QuizAttemptEntity attempt : completedAttempts) {
            if (attempt.getTotalMarks() != null && attempt.getTotalMarks().compareTo(BigDecimal.ZERO) > 0) {
                double pct = (attempt.getObtainedMarks().doubleValue() / attempt.getTotalMarks().doubleValue()) * 100.0;
                totalPercentage += pct;
            }
        }
        double avgScore = completedCount == 0 ? 0.0 : totalPercentage / completedCount;

        long upcomingCount = 0;
        long missedCount = 0;
        if (specId != null && batchId != null) {
            upcomingCount = quizRepository.countUpcomingQuizzesForStudent(specId, batchId, LocalDateTime.now());
            missedCount = quizRepository.countMissedQuizzesForStudent(user.getId(), specId, batchId, LocalDateTime.now());
        }

        DashboardStatsResponse stats = new DashboardStatsResponse(
                String.format("%.0f", avgScore),
                String.valueOf(completedCount),
                String.valueOf(upcomingCount),
                String.valueOf(missedCount)
        );

        // 3. Live Quiz
        ActiveQuizResponse liveQuiz = null;
        if (specId != null && batchId != null) {
            List<QuizEntity> activeQuizzes = quizRepository.findActiveQuizzesForStudent(
                    user.getId(), specId, batchId, LocalDateTime.now()
            );
            if (!activeQuizzes.isEmpty()) {
                QuizEntity q = activeQuizzes.get(0);
                liveQuiz = new ActiveQuizResponse(
                        q.getId(),
                        q.getTitle(),
                        q.getModule().getModuleName() + " • " + q.getModule().getModuleCode(),
                        calculateTimeLeft(q.getAvailableUntil())
                );
            }
        }

        // 4. Upcoming Quizzes List
        List<UpcomingQuizResponse> upcomingQuizzes = new ArrayList<>();
        if (specId != null && batchId != null) {
            List<QuizEntity> upList = quizRepository.findUpcomingQuizzesForStudent(specId, batchId, LocalDateTime.now());
            upcomingQuizzes = upList.stream().map(q -> new UpcomingQuizResponse(
                    q.getId(),
                    q.getTitle(),
                    q.getModule().getModuleName(),
                    formatQuizTime(q.getAvailableFrom(), q.getAvailableUntil()),
                    quizRepository.countQuestionsByQuizId(q.getId())
            )).collect(Collectors.toList());
        }

        // 5. Recently Completed List
        List<RecentlyCompletedResponse> recentlyCompleted = completedAttempts.stream()
                .limit(5)
                .map(a -> {
                    String scoreInfo = String.format("Score: %.0f/%.0f", 
                            a.getObtainedMarks() != null ? a.getObtainedMarks() : BigDecimal.ZERO, 
                            a.getTotalMarks() != null ? a.getTotalMarks() : BigDecimal.ZERO
                    );
                    return new RecentlyCompletedResponse(
                            a.getId(),
                            a.getQuiz().getTitle(),
                            scoreInfo,
                            "Submitted " + formatRelativeTime(a.getSubmittedAt() != null ? a.getSubmittedAt() : a.getStartedAt())
                    );
                }).collect(Collectors.toList());

        // 6. Recently Missed List
        List<RecentlyMissedResponse> recentlyMissed = new ArrayList<>();
        if (specId != null && batchId != null) {
            List<QuizEntity> misList = quizRepository.findMissedQuizzesForStudent(user.getId(), specId, batchId, LocalDateTime.now());
            recentlyMissed = misList.stream().map(q -> new RecentlyMissedResponse(
                    q.getId(),
                    q.getTitle(),
                    "Scheduled on " + formatQuizTime(q.getAvailableFrom(), q.getAvailableUntil())
            )).collect(Collectors.toList());
        }

        return new StudentDashboardSummary(profile, stats, liveQuiz, upcomingQuizzes, recentlyCompleted, recentlyMissed);
    }



    private String calculateTimeLeft(LocalDateTime until) {
        if (until == null) {
            return "No time limit";
        }
        LocalDateTime now = LocalDateTime.now();
        if (now.isAfter(until)) {
            return "Expired";
        }
        long minutes = ChronoUnit.MINUTES.between(now, until);
        if (minutes < 60) {
            return minutes + " minutes left";
        }
        long hours = ChronoUnit.HOURS.between(now, until);
        if (hours < 24) {
            return hours + " hours left";
        }
        long days = ChronoUnit.DAYS.between(now, until);
        return days + " days left";
    }

    private String formatQuizTime(LocalDateTime from, LocalDateTime until) {
        if (from == null && until == null) {
            return "Always Available";
        }
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMM d, yyyy");
        if (from != null && until != null) {
            if (from.toLocalDate().equals(until.toLocalDate())) {
                return String.format("%s, %s - %s", from.format(dateFormatter), from.format(timeFormatter), until.format(timeFormatter));
            } else {
                return String.format("%s %s - %s %s", from.format(dateFormatter), from.format(timeFormatter), until.format(dateFormatter), until.format(timeFormatter));
            }
        } else if (from != null) {
            return String.format("From %s %s", from.format(dateFormatter), from.format(timeFormatter));
        } else {
            return String.format("Until %s %s", until.format(dateFormatter), until.format(timeFormatter));
        }
    }

    private String formatRelativeTime(LocalDateTime dateTime) {
        if (dateTime == null) return "Unknown";
        LocalDateTime now = LocalDateTime.now();
        long days = ChronoUnit.DAYS.between(dateTime, now);
        if (days == 0) {
            long hours = ChronoUnit.HOURS.between(dateTime, now);
            if (hours == 0) {
                long minutes = ChronoUnit.MINUTES.between(dateTime, now);
                return minutes <= 1 ? "Just now" : minutes + " minutes ago";
            }
            return hours == 1 ? "1 hour ago" : hours + " hours ago";
        }
        return days == 1 ? "Yesterday" : days + " days ago";
    }

    // DTO records
    public record StudentDashboardSummary(
            StudentProfileResponse profile,
            DashboardStatsResponse stats,
            ActiveQuizResponse liveQuiz,
            List<UpcomingQuizResponse> upcomingQuizzes,
            List<RecentlyCompletedResponse> recentlyCompleted,
            List<RecentlyMissedResponse> recentlyMissed
    ) {}

    public record StudentProfileResponse(
            String fullName,
            String email,
            String studentId,
            String specialization,
            String batch
    ) {}

    public record DashboardStatsResponse(
            String averageScore,
            String quizzesAttempted,
            String upcomingQuizzes,
            String missedQuizzes
    ) {}

    public record ActiveQuizResponse(
            Integer quizId,
            String title,
            String subject,
            String timeLeft
    ) {}

    public record UpcomingQuizResponse(
            Integer quizId,
            String title,
            String subject,
            String time,
            long questionsCount
    ) {}

    public record RecentlyCompletedResponse(
            Integer attemptId,
            String title,
            String scoreInfo,
            String submittedAt
    ) {}

    public record RecentlyMissedResponse(
            Integer quizId,
            String title,
            String time
    ) {}
}
