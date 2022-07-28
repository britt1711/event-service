/**
 * @module eventsController
 */

const app = require("express");
const sql = require('mssql');
const markdown = require('markdown').markdown;
const config = require('../config/config.js');
const { loggedInUser } = require("./AccountController.js");
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
                model = result.recordset;
                console.log('IN DETAILS');
                console.log(model);
                res.render('events/details', {title: 'Event Details', model});
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
                model = result.recordsets;
                console.log(model);
                res.render('events/edit', {title: 'Edit Event', model});
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

    // UPDATE Single Event
    update: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            
            request.input('title', req.body.title);
            request.input('description', req.body.description);
            request.input('startDatetime', req.params.startDatetime);
            request.input('endDatetime', req.body.endDatetime);
            request.input('eventTypeId', req.body.eventTypeId);
            request.input('venueName', req.body.venueName);
            request.input('street', req.params.street);
            request.input('city', req.body.city);
            request.input('state', req.body.state);
            request.input('zipcode', req.params.zipcode);
            request.input('country', req.params.country);

            request.query('UPDATE Recipes SET title = @title, \
                description = @description, \
                startDatetime = @startDate, \
                endDatetime = @endDate, \
                eventTypeId = @eventTypeId, \
                venueName = @venueName, \
                street = @street, \
                city = @city, \
                state = @state, \
                zipcode = @zipcode, \
                country = @country, \
                WHERE id = @id;', function(err) {
                if (err) {
                    res.render('events/error', {err});
                } else  {
                    res.render('events/sucess', {action: 'Event Updated!'})
                }              
            });
        });
    }
}
