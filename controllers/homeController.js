/**
 * this controller deals with the methods around the index page, and any other administrative pages such as contact, about us, etc
*/

// GET request for Home page
// renders home/index.ejs
module.exports.index = function(req, res) {
        res.render('home/index', {title: 'Welcome to Eventeny'});
    }

// use res.render to load up an ejs view file
// important to note that res.render() will look in a views folder for view
// thus, full path of views/home/index doesn't need to be written out
