package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.entity.BatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BatchRepository extends JpaRepository<BatchEntity, Integer> {
    Optional<BatchEntity> findByBatchNameAndBatchYear(String batchName, Integer batchYear);
}
