package com.inkode.quizzleybackend.repository;

import com.inkode.quizzleybackend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< Updated upstream
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for role lookups via the user_roles join table.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Returns the first role_name for a given userId by joining
     * the roles table with the user_roles join table.
     */
    @Query(value = "SELECT r.role_name FROM roles r " +
                   "JOIN user_roles ur ON r.role_id = ur.role_id " +
                   "WHERE ur.user_id = :userId LIMIT 1",
           nativeQuery = true)
    Optional<String> findFirstRoleByUserId(@Param("userId") Long userId);
=======
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleName(String roleName);
>>>>>>> Stashed changes
}
