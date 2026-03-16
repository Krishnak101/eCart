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
    
 // Combines Parent Category filtering with Full-Text keyword matching
    @Query(value = "SELECT p.* FROM products p " +
                   "JOIN product_categories pc ON p.category_id = pc.id " +
                   "WHERE pc.parent_category_id = :parentId " +
                   "AND p.keywords REGEXP :keyword", 
           nativeQuery = true)
    Page<Product> findByParentCategoryAndKeywords(
        @Param("parentId") Integer parentId, 
        @Param("keyword") String query, 
        Pageable pageable);

}
