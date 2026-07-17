package com.inkode.quizzleybackend.service;

import com.inkode.quizzleybackend.dto.NotificationDto;
import com.inkode.quizzleybackend.model.Notification;
import com.inkode.quizzleybackend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<NotificationDto> getAll() {
        return notificationRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(n -> new NotificationDto(
                        n.getNotificationId(),
                        n.getTitle(),
                        n.getMessage(),
                        n.getType(),
                        n.getIsRead(),
                        n.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public void markAllRead() {
        notificationRepository.markAllRead();
    }

    public void deleteById(Long id) {
        if (!notificationRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Notification not found");
        }
        notificationRepository.deleteById(id);
    }

    /**
     * Creates a new notification record. Called by other services (QuizService etc.)
     */
    public void createNotification(String title, String message, String type) {
        Notification n = new Notification(title, message, type);
        notificationRepository.save(n);
    }
}
