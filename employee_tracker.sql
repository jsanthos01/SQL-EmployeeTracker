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
	FOREIGN KEY (role_id) REFERENCES role(RoleId),
	FOREIGN KEY (manager_id) REFERENCES role(RoleId) #wrong
);

-- INSERT INTO department(name) VALUES("School Board");
-- INSERT INTO role(title, salary, department_id) VALUES("Teacher", "300", "1");
-- INSERT INTO employee(first_name, last_name, role_id) VALUES("Joanna", "Santhosh", "1");
-- INSERT INTO department(NAME) VALUES("School Board");

SELECT * FROM employee 
LEFT JOIN role ON employee.role_id = role.RoleId
LEFT JOIN department ON role.department_id = department.DepId
;


