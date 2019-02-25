DROP DATABASE IF EXISTS bamazon_db;


CREATE DATABASE bamazon_db;
USE bamazon_db;

create table products (
item_id integer(10) not null auto_increment,
product_name varchar(100),
department_name varchar(50),
price decimal(20,2),
stock_quantity integer(20),
primary key(item_id)
);

insert into products (item_id, product_name, department_name, price, stock_quantity)
values 
(01, "kindle fire", "electronics", 59.99, 5),
(02, "Electric Lawn Mower", "Garden & Outdoor", 79.12, 20),
(03, "Motorola baby monitor", "baby", 79.99, 8),
(04, "lava lamp ", "home improvement", 49.00, 80),
(05, "Carry-on suitcase", "luggage & travel", 255.00, 35),
(06, "Acer Laptop", "computers", 349.99, 20),
(07, "Pet Bolster Bed", "Pet Supplies", 18.99, 300),
(08, "Kingdom Hearts III", "Video Games", 54.99, 250),
(09, "LEGO The LEGO Movie 2 set", "Toys & Games", 32.00, 18),
(10, "Paper Credit Card Shredder", "Office products", 40.99, 220);