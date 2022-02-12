function firstAction() {
    inquirer.prompt({
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
    .then(function ({ task })) {
        
    }
}