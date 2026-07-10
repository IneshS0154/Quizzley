package com.inkode.quizzleybackend.service;

import com.inkode.quizzleybackend.entity.RoleEntity;
import com.inkode.quizzleybackend.entity.UserEntity;
import com.inkode.quizzleybackend.model.User;
import com.inkode.quizzleybackend.repository.RoleRepository;
import com.inkode.quizzleybackend.repository.BatchRepository;
import com.inkode.quizzleybackend.repository.SpecializationRepository;
import com.inkode.quizzleybackend.repository.UserRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Primary
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final SpecializationRepository specializationRepository;
    private final BatchRepository batchRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(
            UserRepository userRepository,
            RoleRepository roleRepository,
            SpecializationRepository specializationRepository,
            BatchRepository batchRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.specializationRepository = specializationRepository;
        this.batchRepository = batchRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String getUserRole(String email) {
        return userRepository.findByEmail(email)
                .map(user -> user.getRoles().stream()
                        .map(RoleEntity::getRoleName)
                        .findFirst()
                        .orElse("STUDENT"))
                .orElse("STUDENT");
    }

    @Override
    @Transactional
    public User getOrCreateGoogleUser(String email, String name) {
        UserEntity userEntity = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    UserEntity newUser = new UserEntity();
                    newUser.setEmail(email);
                    newUser.setFullName(name);
                    newUser.setPasswordHash(""); // Google auth users have no password
                    
                    RoleEntity studentRole = roleRepository.findByRoleName("STUDENT")
                            .orElseGet(() -> roleRepository.save(new RoleEntity("STUDENT")));
                    newUser.getRoles().add(studentRole);
                    
                    // Assign default specialization and batch for Google users too
                    specializationRepository.findById(1).ifPresent(newUser::setSpecialization);
                    batchRepository.findById(1).ifPresent(newUser::setBatch);
                    
                    return userRepository.save(newUser);
                });
        
        String role = userEntity.getRoles().stream()
                .map(RoleEntity::getRoleName)
                .findFirst()
                .orElse("STUDENT");
                
        return new User(userEntity.getEmail(), userEntity.getFullName(), role, null);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userEntity -> {
                    String role = userEntity.getRoles().stream()
                            .map(RoleEntity::getRoleName)
                            .findFirst()
                            .orElse("STUDENT");
                    return new User(
                            userEntity.getEmail(),
                            userEntity.getFullName(),
                            role,
                            userEntity.getPasswordHash()
                    );
                });
    }

    @Override
    @Transactional
    public User registerUser(String fullName, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        UserEntity newUser = new UserEntity();
        newUser.setEmail(email);
        newUser.setFullName(fullName);
        newUser.setPasswordHash(passwordEncoder.encode(password));
        
        RoleEntity studentRole = roleRepository.findByRoleName("STUDENT")
                .orElseGet(() -> roleRepository.save(new RoleEntity("STUDENT")));
        newUser.getRoles().add(studentRole);
        
        // Assign default specialization and batch so new users can see the assigned quizzes!
        specializationRepository.findById(1).ifPresent(newUser::setSpecialization);
        batchRepository.findById(1).ifPresent(newUser::setBatch);

        UserEntity saved = userRepository.save(newUser);
        return new User(saved.getEmail(), saved.getFullName(), "STUDENT", null);
    }
}

