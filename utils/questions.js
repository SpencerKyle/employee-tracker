const db = require('./connection');
const inquirer = require('inquirer');

let departments = [];
let job = [];
let employee = [];


 async function questions() {

    console.log("----------------------------------")
    
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

    if (questions.task === 'Add a new job') {
        newJob = await inquirer.prompt([
            {
                type: 'input',
                name: 'newJobName',
                message: 'What is the new job called? (REQUIRED)',
                validate: newJobName => {
                    if (newJobName) {
                        return true;
                    } else {
                        console.log("Please enter a name! >:(")
                    }
                }
            },
            {
                type: 'input',
                name: 'newJobSalary',
                message: 'What is the new positions salary? (REQUIRED)',
                validate: newJobSalary => {
                    if (newJobSalary) {
                        return true;
                    } else {
                        console.log("Please enter a salary!")
                    }
                }
            },
            {
                type: 'input',
                name: 'newJobId',
                message: 'What is the department ID associated with this position? (REQUIRED)',
                validate: newJobId => {
                    if (newJobId) {
                        return true;
                    } else {
                        console.log("Please give the department ID.")
                    }
                }
            }
        ])
        if (newJob) {
            job.push(newJob);
        }
        addJob();
    }

    if (questions.task === 'Add a new employee') {
        newEmployee = await inquirer.prompt([
            {
                type: 'input',
                name: 'newFirst',
                message: "Please enter the Employee's first name (REQUIRED)",
                validate: newFirst => {
                    if (newFirst) {
                        return true;
                    } else {
                        console.log("Please enter a first name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'newLast',
                message: "Please enter the Employee's last name (REQUIRED)",
                validate: newLast => {
                    if (newLast) {
                        return true;
                    } else {
                        console.log("Please enter a last name!")
                    }
                }
            },
            {
                type: 'input',
                name: 'employeeJobId',
                message: "Please enter the Employee's Job ID",
                validate: employeeJobId => {
                    if (employeeJobId) {
                        return true;
                    } else {
                        console.log("Please enter an ID")
                    }
                }
            },
            {
                type: 'input',
                name: 'employeeManager',
                message: "Please enter the Employee's manager ID",
                validate: employeeManager => {
                    if (employeeManager) {
                        return true;
                    } else {
                        console.log("Please enter a valid Manager ID")
                    }
                }
            },
            {
                type: 'input',
                name: 'employeeDept',
                message: "Please enter the Employee's department ID",
                validate: employeeDept => {
                    if (employeeDept) {
                        return true;
                    } else {
                        console.log("Please enter a department ID")
                    }
                }
            }
        ])
        if (newEmployee) {
            employee.push(newEmployee)
        }
        addEmployee();
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
        // console.log('', departments);
        console.table(departments)
        questions();
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
        // console.log('', job);
        console.table(job)
        questions();
    })
};

const showEmployees = () => {
    employee = [];

    db.query(`SELECT * FROM employee`, (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        for (let i = 0; i < row.length; i++) {
            employee.push(row[i]);
        }
        // console.log('',employee);
        console.table(employee)
        questions();
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
        questions();
    });
};

const addJob = () => {
    const params = [job[job.length-1].newJobName, job[job.length-1].newJobSalary, job[job.length-1].newJobId];

    db.query(`INSERT INTO job (title, salary, department_id) VALUES (?, ?, ?)`, params, (err, res) => {
        if (err) {
            return;
        }
    });

    console.log('The job has been added!')
    questions();
}

const addEmployee = () => {
    const params = [employee[employee.length-1].newFirst, employee[employee.length-1].newLast, employee[employee.length-1].employeeJobId, employee[employee.length-1].employeeManager, employee[employee.length-1].employeeDept];

    db.query(`INSERT INTO employee (first_name, last_name, job_id, manager_id, department_id) VALUES (?, ?, ?, ?, ?)`, params, (err, res) => {
        if (err) {
            return;
        }
    });

    console.log('Employee successfully added!')
    questions();
}
questions();