/*
this controller deals with the methods required to login or register
*/

// GET request for Register
// for register page; renders register.ejs
const registerView = (req, res) => {
    res.render("register", {
    });
}

// POST request for Register
const registerUser = (req, res) => {
    const { name, email, location, password, confirm } = req.body;
    if (!name || !email || !password || !confirm) {
        console.log("Fill empty fields");
    }
    //Confirm Passwords
    if (password !== confirm) {
        console.log("Password must match");
    } else {
        //Validation
        User.findOne({ email: email }).then((user) => {
        if (user) {
            console.log("email exists");
            res.render("register", {
                name,
                email,
                password,
                confirm,
            });
        } else {
            //Validation
            const newUser = new User({
                name,
                email,
                location,
                password,
            });
            //Password Hashing
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(res.redirect("/login"))
                    .catch((err) => console.log(err));
                })
            );
        }
        });
    }
};

// GET request for Login
// for login view; renders login.ejs
const loginView = (req, res) => {
    res.render("login", {
    } );
}

// POST request for Login
// declare a loginUser function
// looks for email and password entered on Login page
// checks to see if password or email field is empty
const loginUser = (req, res) => {
    const { email, password } = req.body;
    //Required
    if (!email || !password) {
        console.log("Please fill in all the fields");
        res.render("login", {
            email,
            password,
        });
    } else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res);
    }
};

// export the views to be called on in other files
module.exports =  {
    registerView,
    loginView,
    loginUser,
    registerUser
};