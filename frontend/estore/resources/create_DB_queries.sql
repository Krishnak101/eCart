DROP SCHEMA IF EXISTS `ecommerce`;
CREATE SCHEMA `ecommerce`;
USE `ecommerce` ;

create table ecommerce.product_categories (
id int not null AUTO_INCREMENT,
category varchar(45) default null,
parent_category_id int default null,
primary key (id)
);

INSERT into ecommerce.product_categories (category, parent_category_id) values
('Men', null), ('Women', null), ('Kids', null), 
('Casual Wear', 1), ('Party Wear', 2) , ('Foot Wear', 2) , ('Accessories', 3);

select *  from product_categories;

-- Creating Products table
DROP TABLE IF EXISTS ecommerce.products;
CREATE TABLE IF NOT EXISTS ecommerce.products (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255) DEFAULT NULL,
  `product_description` VARCHAR(255) DEFAULT NULL,
  `price` DECIMAL(13,2) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `active` BIT DEFAULT 1,
  `units_in_stock` INT(11) DEFAULT NULL,
   `ratings` TINYINT(1) DEFAULT NULL,
  `category_id` INT(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`)
  on update cascade on delete cascade
);

INSERT INTO products (product_name, product_description, image_url, active, units_in_stock,
price, ratings, category_id)
VALUES ('Jacket', 'A warm cozy jacket perfect for all seasons',
'shop-1.jpg'
,1,100,100,5,5),
 ('Purse', 'A premium purse made out of leather',
'shop-2.jpg'
,1,100,37, 4.5, 7),
('Dress', 'Nice Party Dress',
'shop-3.jpg'
,1,100,45, 4, 5),
('Denim Jeans', 'Fashionable Denim Jeans',
'shop-4.jpg'
,1,100,45, 4, 5),
('Laced Boots', 'Premium Leather Boots',
'shop-5.jpg'
,1,100,65, 4, 6),
('Back Pack', 'Spacious Modern Back Pack',
'shop-6.jpg'
,1,100,25, 5, 7),
('Ear Rings', 'Beautiful Earrings',
'shop-7.jpg'
,1,100,10, 4, 7),
('Scarf', 'Matching Scarf for Women',
'shop-8.jpg'
,1,100, 30, 4, 7),
('Boots', 'Black Leather Boots',
'shop-9.jpg'
,1,100,70, 4, 6);

select * from products;

alter table ecommerce.products add column keywords varchar(255) null;

update products set keywords = 'jacket,woolen,black,women' where id=1;
update ecommerce.products set keywords = 'bag,purse,leather,black' where id=2;
update ecommerce.products set keywords = 'dress,party,frock' where id=3;
update ecommerce.products set keywords = 'denim,jeans,casual,pant,men' where id=4;
update ecommerce.products set keywords = 'boots,laced,yellow' where id=5;
update ecommerce.products set keywords = 'leather,black,bag' where id=6;
update ecommerce.products set keywords = 'ear,rings,blue,golden,kids' where id=7;
update ecommerce.products set keywords = 'scarf,chocolate,party' where id=8;
update ecommerce.products set keywords = 'leather,black,boots, shoes' where id=9;
