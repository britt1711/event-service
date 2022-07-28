/**
 * @module eventsController
 */

const app = require("express");
const sql = require('mssql');
const markdown = require('markdown').markdown;
const config = require('../config/config.js');
const { loggedInUser } = require("./AccountController.js");
const bodyParser = require('body-parser');
//const ejsLint = require('ejs-lint');

// information to connect to the database
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

module.exports = {
    // GET ALl Events
    // displays all events created to user
    index: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            request.query('SELECT * FROM events;', function(err, result) {
                model = result.recordset
                console.log('IN INDEX');
                console.log(model);
                res.render('events/index', {title: 'Events', model});
            });
        });
    },

    // GET Single User's Events
    userEvents: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            // this wouldn't be hardcoded in reality
            // would check the userid of the userloggedin
            // is there an identity lib like in asp.net?
            userId = loggedInUser.id;
            console.log('IN USEREVENTS');
            request.query('SELECT * FROM events WHERE userId='+userId+';', function(err, result) {
                model = result.recordset
                console.log(model);
                res.render('events/userEvents', {title: 'My Events', model});
            });
        });
    },

    // GET Details of a single event
    details: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            request.query('SELECT * FROM events WHERE id = '+req.query.id+';', function(err, result) {
                console.log(result);
                model = result.recordset[0];
                console.log('IN DETAILS');
                console.log(model);
                res.render('events/details', {title: 'Event Details', model, loggedInUserId: loggedInUser.id});
            /*
            if(req.accepts('html')) {
                for(var i = 0; i < recordset.length; i++){
                    recordset[i].descriptionAsHTML = markdown.toHTML(recordset[i].description, 'Maruku');
                }

                res.render('events/details', {title: 'Event Details', model: recordset[0]});
            }
            else {
                res.json(recordset[0]);
            }
            */
            });
        });
    },

    // GET form to edit a single event
    // TODO: change this to produce a form
    edit: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            request.query('SELECT * FROM events WHERE id = '+req.query.id+';', function(err, result) {
                let model = result.recordset[0];
                console.log("IN EVENTSCONTROLLER EDIT");
                console.log(model);
                res.render('events/edit', {title: 'Edit Event', model});
            });
        });
    },

    // POST edit
    // UPDATE Single Event
    update: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            // change the datetime values to remove 'T'
            let startdt = String(req.body.startDatetime).replace('T',' ');
            let enddt = String(req.body.endDatetime).replace('T',' ');
            console.log(req.body.id)
            // query to insert row into table
            request.query('UPDATE events SET \
                userId ='+loggedInUser.id+', \
                title = N\''+req.body.title+'\', \
                description = N\''+req.body.description+'\', \
                startDatetime = \''+startdt+'\', \
                endDatetime = \''+enddt+'\', \
                eventTypeId = '+req.body.eventTypeId+', \
                venueName = N\''+req.body.venueName+'\', \
                street = N\''+req.body.street+'\', \
                city = N\''+req.body.city+'\', \
                state = N\''+req.body.state+'\', \
                zipcode = \''+req.body.zipcode+'\', \
                country = N\''+req.body.country+'\' WHERE id='+req.body.id+'', function(err) {
                    if (err) {
                        res.render('events/error', {err});
                    } else  {
                        res.render('events/success', {action: 'Event Updated!'})
                    }              
            });
        });
    },

    // GET create
    // CREATE form for an event
    getCreate: function (req, res) {
        // send user to the form
        res.render('events/create', {title: 'Create an Event'})
    },

    // POST create
    // CREATE an event
    create: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            colnames = '(userId, title, [description], startDatetime, endDatetime, eventTypeId, venueName, street, city, [state], zipcode, country)';
            // change the datetime values to remove 'T'
            let startdt = String(req.body.startDatetime).replace('T',' ');
            let enddt = String(req.body.endDatetime).replace('T',' ');
            // query to insert row into table
            request.query('INSERT INTO events '+colnames+' VALUES (\
            '+loggedInUser.id+', \
            N\''+req.body.title+'\', \
            N\''+req.body.description+'\', \
            \''+startdt+'\', \
            \''+enddt+'\', \
            '+req.body.eventTypeId+', \
            N\''+req.body.venueName+'\', \
            N\''+req.body.street+'\', \
            N\''+req.body.city+'\', \
            N\''+req.body.state+'\', \
            \''+req.body.zipcode+'\', \
            N\''+req.body.country+'\')', function(err) {
                if (err) {
                    console.log(err)
                    res.render('events/error', {err});
                } else  {
                    res.render('events/success', {action: 'Event Created!'});
                }              
            });
        });
    },

    // DELETE an event
    delete: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            console.log("IN DELETE POST");
            console.log(req.query.id);
            
            request.query('DELETE FROM events WHERE id ='+req.query.id+';', function(err) {
                if (err) {
                    console.log(err)
                    res.render('events/error', {err});
                } else  {
                    res.render('events/success', {action: 'Event Deleted!'});
                }              
            });
        });
    }
}
