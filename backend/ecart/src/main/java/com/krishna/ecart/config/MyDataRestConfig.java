package com.krishna.ecart.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.krishna.ecart.entity.Product;
import com.krishna.ecart.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer{

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		// TODO Auto-generated method stub
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
		
		cors.addMapping("/api/**")
        .allowedOrigins("http://localhost:4200") // Or "*" to allow all requests
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowedHeaders("*");
		HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};
		
		config.getExposureConfiguration().forDomainType(Product.class).withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions)).withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
		config.getExposureConfiguration().forDomainType(ProductCategory.class).withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions)).withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));
		config.exposeIdsFor(Product.class);
		config.exposeIdsFor(ProductCategory.class);
	}
	

}
