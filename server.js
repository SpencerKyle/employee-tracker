const express = require('express');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//db connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Sp8226743',
        database: 'employeeTracker'
    },
    console.log('Connected to employee tracker database!')
);

app.get('/api/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    firstAction();
  });

// INQUIRER STUFF

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
}