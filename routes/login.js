// create express server
const express = require('express');

// other requirements
const { protectRoute } = require("../auth/protect");
const { dashboardView } = require("../controllers/dashboardController");


// allow specific views, exported from loginController, to be used
const {registerView, loginView, loginUser, registerUser} = require('../controllers/loginController');
const router = express.Router();

// get methods to get respective views
router.get('/register', registerView);
router.get('/login', loginView);
router.get("/dashboard", protectRoute, dashboardView);

// post methods for views
router.post('/login', loginUser);
router.post('/register', registerUser);

// exports
module.exports = router;