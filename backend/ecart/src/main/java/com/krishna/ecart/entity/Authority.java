package com.krishna.ecart.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="authorities")
@Data
public class Authority {
	@Id
	@Column(name="username")
	private String userName;
	
	@Column(name="authority")
	private String authority;
}
