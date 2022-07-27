const app = require("express");
const {sql} = require("../config/config");
const dbconfig = require('./config/config')

// 

// GET events
app.get('/events/employeeid', function(req, res) {
    getEvents()
});
function getEvents() {
    const dbConn = new sql.Connection(dbConfig);
    dbConn.connect().then(function() {
        const request = new sql.Request(dbConn);
        request.query('select * from events where userId ='+req.params.id+';', function(err, recordset) {
        
        res.render('events/index')
        });
    });
}

// UPDATE events
app.put('/events/employeeid/:eventId', function(req, res) {
    updateEvent()
});
function updateEvent() {
    const dbConn = new sql.Connection(dbConfig);
    dbConn.connect().then(function() {
        const request = new sql.Request(dbConn);
        request.query('update events set \
            title = @title, \
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
            where id = @id;', function(err) {
                request.query('select * from events where id='+req.params.id+';', function(err, recordset) {
                    for()
                })
            })

    })
}













module.exports = {
    // GET ALl Events
    // displays all events created to user
    index: function(req, res) {
        const dbConn = new sql.Connection(dbConfig, function(err) {
            const request = new sql.Request(dbConn);

            request.query('SELECT * FROM events;', function(err, recordset) {
                res.render('events/index', {title: 'Events', model: recordset});
            });
        });
    },

    // GET Single User's Events
    userEvents: function(req, res) {
        const dbConn = new sql.Connection(dbConfig, function(err) {
            const request = new sql.Request(dbConn);

            request.query('SELECT * FROM events WHERE userId='+req.params.userId+';', function(err, recordset) {
                res.render('events/employeeId', {title: 'My Events', model: recordset});
            });
        });
    },

    // GET Details of a single event
    details: function(req, res) {
        const dbConn = new sql.Connection(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            
            if(req.accepts('html')) {
                for(var i = 0; i < recordset.length; i++){
                    recordset[i].descriptionAsHTML = markdown.toHTML(recordset[i].description, 'Maruku');
                }

                res.render('recipes/details', {title: 'Recipes', model: recordset[0]});
            }
            else {
                res.json(recordset[0]);
            }
        });
    },

    // UPDATE Single Event
    update: function(req, res) {
        const dbConn = new sql.Connection(dbConfig, function(err) {
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

                    res.render('recipes/details', {title: 'Recipes', model: recordset[0]});
                });
            });
        });
    }
}