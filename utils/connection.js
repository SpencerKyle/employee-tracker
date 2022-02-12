const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Sp8226743',
        database: 'employeeTracker'
    },
    console.log('Connected to employee tracker database!')
);

module.exports = db;