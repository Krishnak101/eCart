package com.krishna.ecart.security;
//Record for handling Signin payload
public record JwtTokenRequest(
 String username, 
 String password
) {}