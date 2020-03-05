const inquirer = require("inquirer");
const express = require( 'express' );

const PORT = process.env.PORT || 8080;
const app  = express();

app.use( express.urlencoded({ extended: false }) );

async function startPrompts(){
    const changesArr = ["Add", "View", "Update"]
    const firstQ = await inquirer.prompt([
        {
            type: "list", 
            name: "userChoice",
            message: "What would you like to do?", 
            choices: changesArr
        }
    ]);

    if (firstQ.userChoice  == "View"){
        const secondQ = await inquirer.prompt([
            {
                type: "list", 
                name: "userChanges",
                message: "What would you like to do?", 
                choices: changesArr
            }
        ]);

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
            message: "What is the employee's first name?", 
        },
        {
            type: "input", 
            name: "roleId",
            message: "What is the employee's role id number?", 
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the manager id number?"
        }
    ]); 
}

async function addDepartment(){
    const departmentAdded = await inquirer.prompt([
        {
            type: "input", 
            name: "depName",
            message: "Provide the name of the department", 
        }
    ]); 
}

async function addRole(){
    const roleAdded = await inquirer.prompt([
        {
            type: "input", 
            name: "roleId",
            message: "Provide the roleId", 
        },
        {
            type: "input", 
            name: "roleId",
            message: "Provide the salary", 
        },
        {
            type: "input", 
            name: "roleId",
            message: "Provide the roleId", 
        }
    ]); 
}

startPrompts();
app.listen( PORT, function(){
    console.log( `[pictures] RUNNING, http://localhost:${PORT}` );
});