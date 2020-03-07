//Dependencies
const inquirer = require("inquirer");
const mysql = require( 'mysql' );
require('events').EventEmitter.defaultMaxListeners = 15;

//connection to my sql
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

startPrompts();

async function startPrompts(){
    const startChoices = ["Add employee","Add department","Add role","View employees","View role","View departments","View all", "Update Employee"];
    const firstQ = await inquirer.prompt([
        {
            type: "list", 
            name: "userChoice",
            message: "What would you like to do?", 
            choices: startChoices
        }
    ]);

    switch(firstQ.userChoice){
        case ("Add employee"):
            return addEmployee();
        case ("Add department"):
            return addDepartment();
        case ("Add role"):
            return addRole();
        case ("View employees"):
            return viewEmp();
        case ("View role"):
            return viewRoles();
        case ("View departments"):
            return viewDep();
        case ("View all"):
            return viewAll();
        case ("Update Employee"):
            return updateInfo();
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
            message: "What is the manager id number? "
        }
    ]); 

    const insertRow = await db.query(
        'INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)',
            [employeeAdded.empFirstName, employeeAdded.empLastName, employeeAdded.roleId, employeeAdded.managerId]
    );
    startAgain();
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
    const askRestart = await inquirer.prompt([
        {
            name: "startAgain",
            type: "input",
            message: "Do you want to start again?"
        }
    ]);

    startAgain();
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
        'INSERT INTO role(title, salary, department_id ) VALUES(?,?,?)',
            [roleAdded.roleName, roleAdded.salary, roleAdded.deptId]
    );
    
    startAgain();

}


//-------- VIEW SECTION ------------//
async function viewEmp(){
    const sqlTable = await db.query("SELECT * FROM employee");
    console.table(sqlTable);

    startAgain();

};

async function viewDep(){
    const sqlTable = await db.query("SELECT * FROM department");
    console.table(sqlTable);

    startAgain();

};

async function viewRoles(){
    const sqlTable = await db.query("SELECT * FROM role");
    console.table(sqlTable);

    startAgain();   
};

async function viewAll(){
    const sqlTable = await db.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.RoleId LEFT JOIN department ON role.department_id = department.DepId");
    console.table(sqlTable);
    startAgain();

};


//-------- UPDATE SECTION ------------//
async function updateInfo (){
    const updateEmployeeRole = await inquirer.prompt([
        {
            type: "input", 
            name: "empFirstName",
            message: "What is the employee's first name?", 
        },
        {
            type: "input", 
            name: "updateRoleId",
            message: "What would you to update the employee's role to?", 
        }
    ])
    
    userUpdateName = updateEmployeeRole.empFirstName
    updateRole = updateEmployeeRole.updateRoleId;
    const updatedTable = await db.query("UPDATE employee SET role_id=? WHERE employee_name=?", [updateRole, userUpdateName]);
    const sqlTable = await db.query("SELECT * FROM role");

    startAgain();

}

async function startAgain(){
    const askUser = await inquirer.prompt([
        {
            type: "input",
            message: "Start Again?",
            name: "userConfirm"
        }
    ]);

    if(askUser.userConfirm == "yes"){
        return startPrompts();
    }else{
        process.exit;
    }
}

