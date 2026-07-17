package com.inkode.quizzleybackend.controller;

import com.inkode.quizzleybackend.dto.AnalyticsDto;
import com.inkode.quizzleybackend.dto.ModuleStatsDto;
import com.inkode.quizzleybackend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping
    public ResponseEntity<AnalyticsDto> getAnalytics() {
        return ResponseEntity.ok(analyticsService.getAnalytics());
    }

    @GetMapping("/module-stats")
    public ResponseEntity<List<ModuleStatsDto>> getModuleStats() {
        return ResponseEntity.ok(analyticsService.getModuleStats());
    }
}
