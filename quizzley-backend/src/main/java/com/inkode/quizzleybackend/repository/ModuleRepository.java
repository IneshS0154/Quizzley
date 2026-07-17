package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    Optional<Module> findByModuleCode(String moduleCode);
=======

public interface ModuleRepository extends JpaRepository<Module, Integer> {
>>>>>>> Stashed changes
}
