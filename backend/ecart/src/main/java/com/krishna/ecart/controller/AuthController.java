package com.krishna.ecart.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krishna.ecart.security.JwtTokenRequest;
import com.krishna.ecart.security.JwtTokenResponse;
import com.krishna.ecart.security.JwtTokenService;
import com.krishna.ecart.security.RegistrationRequest;
import com.krishna.ecart.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenService tokenService;
    private final AuthenticationManager authenticationManager;

    // Utilizing Constructor Injection
    public AuthController(UserService userService, 
                          JwtTokenService tokenService, 
                          AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Endpoint for User Signup / Registration
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signup( @RequestBody RegistrationRequest registrationRequest) {
        String result = userService.processUserRegistrationOrLogin(registrationRequest);
        
        if (result.contains("already exists")) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message",result));
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message",result));
    }

    /**
     * Endpoint for User Signin / Login
     */
    @PostMapping("/signin")
    public ResponseEntity<JwtTokenResponse> signin( @RequestBody JwtTokenRequest jwtTokenRequest) {
        // 1. Authenticate the credentials against the database
        var authenticationToken = new UsernamePasswordAuthenticationToken(
                jwtTokenRequest.username(), 
                jwtTokenRequest.password());
        
        var authentication = authenticationManager.authenticate(authenticationToken);
        
        // 2. If authentication is successful, generate the JWT
        var token = tokenService.generateToken(authentication);
        
        // 3. Return the token token in a structured response object
        return ResponseEntity.ok(new JwtTokenResponse(token));
    }
}