create database inventoryDB;

use inventoryDB;

create table products (
	name varchar(20),
    description varchar(100),
    price float,
    quantity int,
    category varchar(20)
);

-- Insert sample products
INSERT INTO products (name, description, price, quantity, category) VALUES
('Laptop', 'High-performance laptop', 999.99, 50, 'Electronics'),
('Smartphone', 'Latest model smartphone', 699.99, 100, 'Electronics'),
('Desk Chair', 'Ergonomic office chair', 199.99, 30, 'Furniture'),
('Coffee Maker', 'Programmable coffee machine', 79.99, 20, 'Appliances'),
('Running Shoes', 'Comfortable athletic shoes', 89.99, 75, 'Footwear');

-- Retriving all products from the table
select * from products;

-- Retrieving products with price less than 200
SELECT * FROM products WHERE price < 200;

-- Retrieving products with more than 50 in stock
SELECT * FROM products WHERE quantity > 50;

-- Update the price of a specific product
UPDATE products SET price = 1099.99 WHERE name = 'Laptop';

-- Delete a product
DELETE FROM products WHERE name = 'Coffee Maker';