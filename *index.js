"use strict";

// create express server
const express = require('express');
const app = express();
const sql = require('mssql');
const dotenv = require('dotenv');
const dbconfig = require('./config')

// mssql database connection
var database = {
    user: dbconfig.sql.user,
    password: dbconfig.sql.password,
    server: dbconfig.sql.server,
    database: dbconfig.sql.database,
    options: {
        trustedConnection: true,
        encryption: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

// connect to database
sql.connect(database, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected successfully to the database')
    };
});

// set the view engine to use .ejs
app.set('view engine', 'ejs');

// Routes
// root route to use what's in login.js under routes folder
app.use('/', require('./routes/login'));

// bodyparsing - gives ability to process posted data and store it in the req.body
app.use(express.urlencoded({extended: false}));

const PORT = 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))