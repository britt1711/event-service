/**
 * file defines the application
 */

const express = require('express');
const app = express();
const path = require('Path');
const sql = require('mssql');
const config = require('./config/config.js');
const bodyParser = require('body-parser');

const home = require('./routes/home');
const events = require('./routes/events');

// set the view engine to ejs
app.set('view engine', 'ejs');

// loads all html, css, and js files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// pages from home controller
app.get('/', home.index);

// pages relating to events controller
app.get('/events', events.index);
app.get('/events/userEvents', events.userEvents);
app.get('/events/details/:id?', events.details);
app.get('events/edit', events.edit);
app.post('/events/:userId/:id', events.update);
app.get('/events/create', (req, res) => {
    res.render('events/create', {title: 'Create an Event'})
});

app.get('/events/delete/:id?', events.delete);

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/events/create', urlencodedParser, events.create);

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
        console.log('There has been an error!',err)
    } else {
        console.log('Connected successfully to the database')
    };
});

// listens on port 4111
const PORT = 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))
