package com.krishna.ecart.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.krishna.ecart.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
//  find Products where Category.id equals (?)
	Page<Product> findByCategoryId(@Param("id")int categoryId, Pageable pageable);
	Page<Product> findByProductName(@Param("name")String productname, Pageable pageable);

//  find Products where Category.parentCategoryId equals (?)
	Page<Product> findByCategoryParentCategoryId(@Param("id")int parentCategoryId, Pageable pageable);
	
// Using REGEXP to match the word at start, middle (between commas), or end
    @Query(value = "SELECT * FROM products p WHERE p.keywords REGEXP :keyword", 
           nativeQuery = true)
    Page<Product> findByKeywordsRegex(@Param("keyword") String regex, Pageable pageable);

}
