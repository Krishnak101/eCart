package com.krishna.ecart.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.krishna.ecart.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

	User findByUserName(@Param("username")String username);

 //  find Products where Category.parentCategoryId equals (?)
//	Page<Product> findByCategoryParentCategoryId(@Param("parentId")int parentCategoryId, Pageable pageable);

	// update the JdbcUserDetailsManager whenever a new user is created to ensure that the authentication system recognizes the changes.
	

	Optional<User> findByEmail(String email);
	
}
