package com.krishna.ecart.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.krishna.ecart.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
