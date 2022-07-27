/**
 * file defines the application
 */

const express = require('express');
const app = express();
const sql = require('mssql');
const config = require('./config/config')

// set the view engine to ejs
app.set('view engine', 'ejs');

// check sql connection
const dbConfig = {
    user: config.sql.user,
    password: config.sql.password,
    server: config.sql.server,
    database: config.sql.database,
    options: {
        trustedConnection: true,
        encryption: true,
        enableArithAbort: true,
        trustServerCertificate: true
    }
};

// connect to database
sql.connect(dbConfig, function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected successfully to the database')
    };
});

// use res.render to load up an ejs view file
// important to note that res.render() will look in a views folder for view
// thus, full path of views/home/index doesn't need to be written out

// index page
app.get('/', function(req, res) {
    res.render('home/index');
});

// listens on port 4111
const PORT = 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))

module.exports = {
    dbConfig
}