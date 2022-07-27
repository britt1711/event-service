// GET request for Home page
// renders home.ejs

/*
const homeView = (req, res) => {
    res.render("Home/index", {
    });
}
*/

module.exports = {
    index: function(req, res) {
        res.render('home/index', {title: 'Home'});
    }

    about: function(req, res) {
        res.render('home/about', {title: 'About'});
    }

    contact: function(req, res) {
        res.render('home/contact', {title: 'Contact'});
    }
}