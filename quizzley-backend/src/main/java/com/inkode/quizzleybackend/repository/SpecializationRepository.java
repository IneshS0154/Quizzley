package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecializationRepository extends JpaRepository<Specialization, Integer> {
}
