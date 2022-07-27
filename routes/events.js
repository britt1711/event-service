/**
 * file contains CRUD for event table
 */

const eventsController = require('../controllers/eventsController')

// GET all events
module.exports.index = function(req, res) {
    eventsController.index(req, res);
}

// GET all events for a certain user
module.exports.userEvents = function(req, res) {
    eventsController.userEvents(req, res);
}

// GET details for a specific event
module.exports.details = function(req, res) {
    eventsController.details(req, res);
}

// UPDATE specific event
module.exports.update = function(req, res) {
    eventsController.update(req, res);
}




/*
module.exports = function(app) {
    // GET all events
    app.get('/events', function(req, res) {
        eventController.index(req, res);
    });

    // GET all events for a certain user
    app.get('/events/:userId', function(req, res) {
        eventController.userEvents(req, res);
    });
    
    // GET details for a specific event
    app.get('/events/:id', function(req, res) {
        eventController.details(req, res);
    });

    // UPDATE specific event
    app.post('/events/:id', function(req, res) {
        eventController.update(req, res);
    });

}
*/