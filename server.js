const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser
app.use(cors());
app.use(bodyParser.json()); // Add body-parser middleware
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "student_database"
});

app.get('/', (req, res) => {
    con.query('SELECT * FROM students', (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.post('/create', (req, res) => {
    const { name, email } = req.body; // Destructure name and email from req.body
    con.query('INSERT INTO students (`name`,`email`) VALUES (?,?)', [name, email], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});
