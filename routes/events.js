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

// GET form to edit a specific event
module.exports.edit = function(req, res) {
    eventsController.edit(req, res);
}

// UPDATE specific event
module.exports.update = function(req, res) {
    eventsController.update(req, res);
}

// POST form to create an event
module.exports.create = function(req, res) {
    eventsController.create(req, res);
}

// POST form to delete an event
module.exports.delete = function(req, res) {
    eventsController.delete(req, res);
}