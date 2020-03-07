DROP DATABASE IF EXISTS employer_tracker;

CREATE DATABASE employer_tracker;
USE employer_tracker;

CREATE TABLE department (
	DepId INT PRIMARY KEY auto_increment,
	name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	RoleId INT PRIMARY KEY auto_increment ,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL,
	department_id INT,
	FOREIGN KEY (department_id) REFERENCES department(DepId)
);

CREATE TABLE employee (
	employee_id INT PRIMARY KEY auto_increment,
	first_name VARCHAR(30) NOT NULL ,
	last_name VARCHAR(30) NOT NULL,
	role_id INT NOT NULL,
	manager_id INT,
	FOREIGN KEY (role_id) REFERENCES role(RoleId)
	-- FOREIGN KEY (manager_id) REFERENCES role(RoleId) 
);

INSERT INTO department(name) VALUES("IT");
INSERT INTO department(name) VALUES("HR");
INSERT INTO department(name) VALUES("Accounting");
INSERT INTO department(name) VALUES("Engineering");
INSERT INTO department(name) VALUES("Sales");

INSERT INTO role(title, salary, department_id) VALUES("Financial Controller", "300", "3");
INSERT INTO role(title, salary, department_id) VALUES("Accountant", "300", "3");
INSERT INTO role(title, salary, department_id) VALUES("Software engineer", "300", "4");
INSERT INTO role(title, salary, department_id) VALUES("Civil Engineer", "300", "4");
INSERT INTO role(title, salary, department_id) VALUES("Technical Support", "300", "1");
INSERT INTO role(title, salary, department_id) VALUES("Data Analyst", "300", "1");
INSERT INTO role(title, salary, department_id) VALUES("Technical Support", "300", "1");
INSERT INTO role(title, salary, department_id) VALUES("Computer Technician", "300", "1");
INSERT INTO role(title, salary, department_id) VALUES("IT Manager", "300", "1");
INSERT INTO role(title, salary, department_id) VALUES("HR Tech Lead ", "300", "2");
INSERT INTO role(title, salary, department_id) VALUES("Staffing specialist", "300", "2");
INSERT INTO role(title, salary, department_id) VALUES("HR representative", "300", "2");
INSERT INTO role(title, salary, department_id) VALUES("HR analyst", "300", "2");
INSERT INTO role(title, salary, department_id) VALUES("Sales Director", "300", "5");
INSERT INTO role(title, salary, department_id) VALUES("Sales Analyst", "300", "5");
INSERT INTO role(title, salary, department_id) VALUES("Sales Engineer", "300", "5");
INSERT INTO role(title, salary, department_id) VALUES("Sales Consultant", "300", "5");
INSERT INTO role(title, salary, department_id) VALUES("Sales Trainer", "300", "5");


INSERT INTO employee(first_name, last_name, role_id) VALUES("Joanna", "Santhosh", "3");
INSERT INTO employee(first_name, last_name, role_id) VALUES("Norma", "Moras", "9");
INSERT INTO employee(first_name, last_name, role_id) VALUES("Sara", "Munir", "3");
INSERT INTO employee(first_name, last_name, role_id) VALUES("Akanksha", "Gupta", "5");
INSERT INTO employee(first_name, last_name, role_id) VALUES("Jasper", "Menon", "10");
INSERT INTO employee(first_name, last_name, role_id) VALUES("Jason", "Mornie", "11");
INSERT INTO employee(first_name, last_name, role_id) VALUES("Hans", "Maryil", "13");
INSERT INTO employee(first_name, last_name, role_id) VALUES("Abigail", "Raja", "6");
INSERT INTO employee(first_name, last_name, role_id) VALUES("Sarah", "Saba", "4");

SELECT * FROM employee 
LEFT JOIN role ON employee.role_id = role.RoleId
LEFT JOIN department ON role.department_id = department.DepId
;
