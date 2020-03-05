const inquirer = require("inquirer");
// const express = require( 'express' );
const mysql = require( 'mysql' );

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args=[] ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcamp2020",
    database: "employer_tracker" 
});

// const PORT = process.env.PORT || 8080;
// const app  = express();
startPrompts();
async function startPrompts(){
    const firstQ = await inquirer.prompt([
        {
            type: "list", 
            name: "userChoice",
            message: "What would you like to do?", 
            choices: ["Add", "View", "Update"]
        }
    ]);

    if (firstQ.userChoice == "View"){
        const secondQ = await inquirer.prompt([
            {
                type: "list", 
                name: "userViews",
                message: "What would you like to view?", 
                choices: ["view employees","view roles", "view departments" ]
            }
        ]);

        switch (secondQ.userViews) {
            case ("view employees"):
                viewEmp();
                break;
            case ("view roles"):
                viewRoles();
                break;
            case ("view departments"):
                viewDep();
                break;
        }
    
    }else if(firstQ.userChoice  == "Add"){
        const secondQ = await inquirer.prompt([
            {
                type: "list", 
                name: "options",
                message: "What would you like to add to?", 
                choices: ["employee", "department", "role"]
            }
        ]);

        switch(secondQ.options){
            case ("employee"): 
                addEmployee();
                break;
            case ("department"):
                addDepartment();
                break;
            case("role"):
                addRole();
                break;
        }
    }else {
        const secondQ = await inquirer.prompt([
            {
                type: "list", 
                name: "userChanges",
                message: "What would you like to do?", 
                choices: changesArr
            }
        ]);
    }
}


//-------- ADD SECTION ------------//
async function addEmployee(){
    const employeeAdded = await inquirer.prompt([
        {
            type: "input", 
            name: "empFirstName",
            message: "What is the employee's first name?", 
        },
        {
            type: "input", 
            name: "empLastName",
            message: "What is the employee's last name?", 
        },
        {
            type: "input", 
            name: "roleId",
            message: "What is the employee's role id number?", 
        },
        {
            type: "input",
            name: "managerId",
            message: "What is the manager id number?"
        }
    ]); 

    const insertRow = await db.query(
        'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)',
            [employeeAdded.empFirstName, employeeAdded.empLastName, employeeAdded.roleId, employeeAdded.managerId]
    );

}

async function addDepartment(){
    const departmentAdded = await inquirer.prompt([
        {
            type: "input", 
            name: "depName",
            message: "Provide the name of the department", 
        }
    ]); 

    const insertRow = await db.query(
        'INSERT INTO department(name) VALUES(?)',
            [departmentAdded.depName]
    );

}

async function addRole(){
    const roleAdded = await inquirer.prompt([
        {
            type: "input", 
            name: "roleName",
            message: "Provide the role name.", 
        },
        {
            type: "input", 
            name: "salary",
            message:  "What is the salary for this role?", 
        },
        {
            type: "input", 
            name: "deptId",
            message: "What is the department id number?", 
        }
    ]); 

    const insertRow = await db.query(
        'INSERT INTO role(title,salary,department_id ) VALUES(?,?,?)',
            [roleAdded.roleName, roleAdded.salary, roleAdded.deptId]
    );

}


//-------- VIEW SECTION ------------//
async function viewEmp(){
    const sqlTable = await db.query("SELECT * FROM employee");
    console.table(sqlTable);
}
async function viewDep(){
    const sqlTable = await db.query("SELECT * FROM department");
    console.table(sqlTable);
}
async function viewRoles(){
    const sqlTable = await db.query("SELECT * FROM role");
    console.table(sqlTable);
}
//-------- UPDATE SECTION ------------//

