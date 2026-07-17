package com.inkode.quizzleybackend.controller;

import com.inkode.quizzleybackend.dto.NotificationDto;
import com.inkode.quizzleybackend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    /** GET /api/admin/notifications — list all, latest first */
    @GetMapping
    public ResponseEntity<List<NotificationDto>> getAll() {
        return ResponseEntity.ok(notificationService.getAll());
    }

    /** PUT /api/admin/notifications/mark-all-read — mark every notification as read */
    @PutMapping("/mark-all-read")
    public ResponseEntity<Void> markAllRead() {
        notificationService.markAllRead();
        return ResponseEntity.noContent().build();
    }

    /** DELETE /api/admin/notifications/{id} — delete a single notification */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
