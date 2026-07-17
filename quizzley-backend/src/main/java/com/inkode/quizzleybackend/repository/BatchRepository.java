package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.Batch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BatchRepository extends JpaRepository<Batch, Integer> {
}
