package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.entity.SpecializationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpecializationRepository extends JpaRepository<SpecializationEntity, Integer> {
    Optional<SpecializationEntity> findBySpecializationName(String specializationName);
}
