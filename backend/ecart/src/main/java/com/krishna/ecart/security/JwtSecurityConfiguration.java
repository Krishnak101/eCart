package com.krishna.ecart.security;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class JwtSecurityConfiguration {

	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		return http
                .authorizeHttpRequests(auth -> auth
                		// 1. Allow unrestricted public access to Auth endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        
                        // 2. Allow guest users to view landing/home data and product catalogs
                        .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/home/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/product-category/**").permitAll()
                        
                        // 3. Keep pre-flight OPTIONS requests open for cross-origin compliance (CORS)
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .anyRequest()
                    .authenticated())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.
                    sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(
                        (oauth2) -> oauth2.jwt(jwt -> {}))
                
                .headers(headers -> headers.frameOptions(frameOptionsConfig-> frameOptionsConfig.disable()))
                .build();
    }
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**") // Allow CORS for all endpoints
	                    .allowedOrigins("http://localhost:4200") // Allow requests from the Angular frontend
	                    .allowedMethods("*") // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
	                    .allowedHeaders("*"); // Allow all headers like Content-Type, Authorization, etc.
	        }
	    };
	    
	}

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService) {
        var authenticationProvider = new DaoAuthenticationProvider(userDetailsService);
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public UserDetailsService userDetailsService(DataSource dataSource) {
        

        // fetch the user details from users table in the database and return the user details service object	
       JdbcUserDetailsManager userDetailsManager = new JdbcUserDetailsManager(dataSource);
       userDetailsManager.setUsersByUsernameQuery("select username, password, enabled from users where username=?");
       userDetailsManager.setAuthoritiesByUsernameQuery("select username, authority from authorities where username=?");
       return userDetailsManager;
       
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        JWKSet jwkSet = new JWKSet(rsaKey());
        return (((jwkSelector, securityContext) 
                        -> jwkSelector.select(jwkSet)));
    }

    @Bean
    JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    JwtDecoder jwtDecoder() throws JOSEException {
        return NimbusJwtDecoder
                .withPublicKey(rsaKey().toRSAPublicKey())
                .build();
    }
    
    @Bean
    public RSAKey rsaKey() {
        
        KeyPair keyPair = keyPair();
        
        return new RSAKey
                .Builder((RSAPublicKey) keyPair.getPublic())
                .privateKey((RSAPrivateKey) keyPair.getPrivate())
                .keyID(UUID.randomUUID().toString())
                .build();
    }

    @Bean
    public KeyPair keyPair() {
        try {
            var keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            return keyPairGenerator.generateKeyPair();
        } catch (Exception e) {
            throw new IllegalStateException(
                    "Unable to generate an RSA Key Pair", e);
        }
    }
	
}
