package com.krishna.ecart.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="users")
@Data
public class User {
	
	@Id
	@Column(name="username")
	private String userName;
	
	@Column(name="password")
	private String password;
	
	@Column
	private String email;
	
	@Column
	private String address;
	
	@Column
	private String city;
	
	@Column
	private String state;
	
	@Column
	private String pin;
	
	@Column
	private boolean enabled;
	

}
