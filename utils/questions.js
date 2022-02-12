const db = require('./connection');
const inquirer = require('inquirer');

let departments = [];


 async function questions() {
    
    const questions = await inquirer.prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all jobs",
            "View all employees",
            "Add a new department",
            "Add a new job",
            "Add a new employee",
            "Update an existing employee"
        ]
    })

    if (questions.task === 'View all departments') {
        showDepartments();
    }

    if (questions.task === 'View all jobs') {
        showJobs();
    }

    if (questions.task === 'View all employees') {
        showEmployees();
    }

    if (questions.task === 'Add a new department') {
        newDept = await inquirer.prompt([
            {
                type: 'input',
                name: 'newDept',
                message: 'What is the name of the Department you wish to add? (REQUIRED)',
                validate: newDept => {
                    if (newDept) {
                        return true;
                    } else {
                        console.log("Please enter a Department name!!!!")
                    }
                }
            }
        ])
        if (newDept) {
            departments.push(newDept);
        }
        addDepartment();
    }
}

const showDepartments = () => {
    departments = [];

    db.query(`SELECT * FROM departments`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < row.length; i++) {
            departments.push(row[i]);
        }
        console.log('', departments);
        console.log('Arrow don to perform more stuff');
    })
};

const showJobs = () => {
    job = [];

    db.query(`SELECT * FROM job`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < row.length; i++) {
            job.push(row[i]);
        }
        console.log('', job);
        console.log('Arrow to perofmr mo');
    })
};

const showEmployees = () => {
    employees = [];

    db.query(`SELECT * FROM employee`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < row.length; i++) {
            employees.push(row[i]);
        }
        console.log('',employees);
        console.log('Populating all employees');
    })
};

const addDepartment = () => {
    const params = [departments[departments.length-1].newDept];

    db.query(`INSERT INTO departments (department_name) VALUES (?)`, params, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log("The department has been added")
        console.log("Yeet")
    });
};

questions();