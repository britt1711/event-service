/**
 * file contains routes for homeController
 */

const homeController = require('../controllers/homeController')

module.exports.index = function (req, res) {
    homeController.index(req, res)
}



    /*
module.exports = function(app) {
    // GET home index page
    app.get('/', function(req, res) {
        homeController.index(req, res);
    })

    // GET about page
    app.get('/about', function(req, res){
        homeController.about(req, res);
    });

    // GET contact page
    app.get('/contact', function(req, res){
        homeController.contact(req, res);
    })
}
    */