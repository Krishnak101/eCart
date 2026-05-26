package com.krishna.ecart.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//Record for handling Signup payload
public record RegistrationRequest(
		
		String username,
		String email,
		String password,
		String address,
		String city,
		String state,
		String pin
 

) {}