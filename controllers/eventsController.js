/**
 * @module eventsController
 */

const app = require("express");
const sql = require('mssql');
const markdown = require('markdown').markdown;
const config = require('../config/config.js');
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
            request.query('SELECT *, format(startTime, \'hh\\:mm\') AS startTimef, format(endTime, \'hh\\:mm\') AS endTimef FROM events;', function(err, result) {
                // REMOVE LATER
                console.log('In eventsControllerIndex', result.recordset);
                //console.log(typeof result);
                //var models = JSON.stringify(result.recordsets);
                model = result.recordset
                res.render('events/index', {title: 'Events', model});
            });
        });
    },

    // GET Single User's Events
    userEvents: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            request.query('SELECT * FROM events WHERE userId='+req.params.userId+';', function(err, result) {
                // REMOVE LATER
                console.log('In eventsControllerUserEvents', result.recordset);
                console.log(typeof result);
                res.render('events/userEvents', {title: 'My Events', model: result});
            });
        });
    },

    // GET Details of a single event
    // TODO: this isn't working at all
    details: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            
            if(req.accepts('html')) {
                for(var i = 0; i < recordset.length; i++){
                    recordset[i].descriptionAsHTML = markdown.toHTML(recordset[i].description, 'Maruku');
                }

                res.render('events/details', {title: 'Event Details', model: recordset[0]});
            }
            else {
                res.json(recordset[0]);
            }
        });
    },

    // UPDATE Single Event
    update: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            
            request.input('title', req.body.title);
            request.input('description', req.body.description);
            request.input('startDate', req.params.startDate);
            request.input('startTime', req.body.startTime);
            request.input('endDate', req.body.endDate);
            request.input('endTime', req.params.endTime);
            request.input('eventTypeId', req.body.eventTypeId);
            request.input('venueName', req.body.venueName);
            request.input('street', req.params.street);
            request.input('city', req.body.city);
            request.input('state', req.body.state);
            request.input('zipcode', req.params.zipcode);
            request.input('country', req.params.country);

            request.query('UPDATE Recipes SET title = @title, \
                description = @description, \
                startDate = @startDate, \
                startTime = @startTime, \
                endDate = @endDate, \
                endTime = @endTime, \
                eventTypeId = @eventTypeId, \
                venueName = @venueName, \
                street = @street, \
                city = @city, \
                state = @state, \
                zipcode = @zipcode, \
                country = @country, \
                WHERE id = @id;', function(err) {
                request.query('SELECT * FROM Recipes WHERE id='+req.params.id+';', function(err, recordset) {
                    for(var i = 0; i < recordset.length; i++){
                        recordset[i].descriptionAsHTML = markdown.toHTML(recordset[i].description, 'Maruku');
                    }

                    res.render('events/details', {title: 'Events', model: recordset[0]});
                });
            });
        });
    }
}