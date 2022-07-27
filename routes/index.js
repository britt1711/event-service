// route module for the home page
var express = require('express');
var router = express.Router();

// home page route
router.get('/', HomeView);
router.get('/', function (req, res) {
    res.send()
})