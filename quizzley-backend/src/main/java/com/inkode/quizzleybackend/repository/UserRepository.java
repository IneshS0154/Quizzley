package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
=======
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
>>>>>>> Stashed changes
    Optional<User> findByEmail(String email);
}
