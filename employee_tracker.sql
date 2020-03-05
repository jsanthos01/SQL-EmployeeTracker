CREATE DATABASE employer_track;
USE employer_tracker;
CREATE TABLE department (
id INT PRIMARY KEY auto_increment,
name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
id INT PRIMARY KEY auto_increment ,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INT
);
CREATE TABLE employee (
id INT PRIMARY KEY auto_increment,
first_name VARCHAR(30) NOT NULL ,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NOT NULL
);