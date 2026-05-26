package com.krishna.ecart.service;



import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.krishna.ecart.dao.AuthorityRepository;
import com.krishna.ecart.dao.UserRepository;
import com.krishna.ecart.entity.Authority;
import com.krishna.ecart.entity.User;
import com.krishna.ecart.security.RegistrationRequest;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthorityRepository authRepository;
    // Assume you have an authentication component or manager injected here

    // Using Constructor Injection for clean architecture
    public UserService(UserRepository userRepository, AuthorityRepository authRepository) {
        this.userRepository = userRepository;
        this.authRepository = authRepository;
    }

    @Transactional
    public String processUserRegistrationOrLogin(RegistrationRequest request) {
        // Check 1: Does the email already exist in the database?
        Optional<User> existingUser = userRepository.findByEmail(request.email());

        if (existingUser.isPresent()) {
            // Check 2: Pre-execution logic for existing users (e.g., Authenticate/Login route)
            return "User already exists.";
        }

        // Check 3: Data validation or sanitization before persistence
        User newUser = new User();
        newUser.setUserName(request.username());
        newUser.setEmail(request.email());
        // Always hash raw passwords before storing them in production!
        newUser.setPassword("{noop}"+request.password()); 
        newUser.setAddress(request.address());
        newUser.setCity(request.city());
        newUser.setState(request.state());
        newUser.setPin(request.pin());
        newUser.setEnabled(true);
        // Execute the database operation securely after all validations pass
        userRepository.save(newUser);
        Authority authority = new Authority();
        authority.setUserName(request.username());
        authority.setAuthority("ROLE_USER");
        authRepository.save(authority);
        return "Account created successfully.";
    }
}