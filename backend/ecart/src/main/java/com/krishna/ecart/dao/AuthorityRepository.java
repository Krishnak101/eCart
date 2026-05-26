package com.krishna.ecart.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.krishna.ecart.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String> {

	Authority findByUserName(@Param("username")String username);

	
}
