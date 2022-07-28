/**
 * this controller deals with the methods required to display and manipulate data in the events table
 */

// import necessary external modulules
const sql = require('mssql');
const config = require('../config/config.js');
const { loggedInUser } = require("./AccountController.js");

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

// function to get AllEventsCount to display
//TODO: can't access this anywhere else... why?
function getAllEventsCount() {
    // instantiate new connection to database
    const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
        // instantiate new request
        const request = new sql.Request(dbConn);
        // run sql query to get all events to display to user
        request.query('SELECT * FROM events;', function(err, result) {
            console.log(result.recordset.length);
            return result.recordset.length;
        });
    });
}

// TESTING
var x = getAllEventsCount();
console.log('printing all events count',x);

module.exports = {
    // GET ALl Events
    // displays all events created to user
    index: function(req, res) {
        // instantiate new connection to database
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            // instantiate new request
            const request = new sql.Request(dbConn);
            // run sql query to get all events to display to user
            request.query('SELECT * FROM events;', function(err, result, x) {
                model = result.recordset
                // CHECKING query result
                //console.log('IN INDEX');
                //console.log(model);
                //TODO: add functionality to display events in sorted orders

                // render events index page to user
                // create variables that holds how many events user is viewing
                const DisplayedEventsCount = model.length;
                const AllEventsCount = model.length;
                res.render('events/index', {title: 'Events', model, DisplayedEventsCount, AllEventsCount});
            });
        });
    },

    // GET Single User's Events
    userEvents: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            userId = loggedInUser.id;
            console.log('IN USEREVENTS');
            // run sql query to get all events created by the user logged in
            request.query('SELECT * FROM events WHERE userId='+userId+';', function(err, result) {
                model = result.recordset
                // CHECKING query result
                //console.log('IN USER EVENTS')
                //console.log(model);
                // create variable that holds how many events user is viewing
                const DisplayedEventsCount = model.length;
                res.render('events/userEvents', {title: 'My Events', model, DisplayedEventsCount});
            });
        });
    },

    // GET Details of a single event
    details: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            request.query('SELECT *, users.firstName, users.lastName FROM events JOIN users on users.id = events.userId WHERE events.id = '+req.query.id+';', function(err, result) {
                
                model = result.recordset[0];
                // CHECKING sql query
                console.log(model.firstName)
                console.log('IN DETAILS');
                console.log(result);
                res.render('events/details', {title: 'Event Details', model, loggedInUserId: loggedInUser.id});
            });
        });
    },

    // GET form to edit a single event
    // TODO: change this to produce a form
    edit: function(req, res) {
        const dbConn = new sql.ConnectionPool(dbConfig, function(err) {
            const request = new sql.Request(dbConn);
            // query the information for the exact event user is wanting to edit
            // will allow form to prepopulate with all current event information
            console.log(req.query.id.split(','));
            request.query('SELECT * FROM events WHERE id = '+req.query.id.split(',')[0]+';', function(err, result) {
                let model = result.recordset[0];
                console.log("IN EVENTSCONTROLLER EDIT");
                console.log(result);
                // CHECKING sql query
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
                        res.render('events/error', {title:"Success!", err});
                    } else  {
                        res.render('events/success', {title:"Success!", action: 'Event Updated!'})
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
                    res.render('events/error', {title:"Error!", err});
                } else  {
                    res.render('events/success', {title:"Success!", action: 'Event Created!'});
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
                    res.render('events/error', {title:"Error!", err});
                } else  {
                    res.render('events/success', {title:"Success!", action: 'Event Deleted!'});
                }              
            });
        });
    }
}
