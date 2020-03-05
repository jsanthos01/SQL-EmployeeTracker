const inquirer = require("inquirer");
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
                choices: ["view employees","view roles", "view departments", "view all" ]
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
            case ("view all"):
                viewAll();
                break;
        }
    
    }else if (firstQ.userChoice == "Add"){
        const secondQ = await inquirer.prompt([
            {
                type: "list", 
                name: "userAdd",
                message: "What would you like to add to?", 
                choices: ["employee", "department", "role"]
            }
        ]);

        switch(secondQ.userAdd){
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
                type: "input", 
                name: "userUpdate",
                message: "Which employee would you like to update?", 
            },
            {
                type: "input", 
                name: "updateRole",
                message: "Provide information to update the role.", 
            }
        ]);

        updateInfo(userUpdate, updateRole);
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
        'INSERT INTO role(title, salary, department_id ) VALUES(?,?,?)',
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

async function viewAll(){
    const sqlTable = await db.query("SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.RoleId LEFT JOIN department ON role.department_id = department.DepId");
    console.table(sqlTable);
}


//-------- UPDATE SECTION ------------//
async function updateInfo (userUpdateName, updateRole){
    const updatedTable = await db.query("UPDATE employee SET role_id=? WHERE name=?", [updateRole, userUpdateName]);
    const sqlTable = await db.query("SELECT * FROM role");
    return updatedTable;
}
