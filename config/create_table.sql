CREATE DATABASE IF NOT EXISTS uas_web;

USE uas_web;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    ip_address VARCHAR(255),
    browser VARCHAR(255)
);
