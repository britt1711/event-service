//For Register Page
// renders the dashboard.ejs as view
// accesses req.user which is available once there is an active session est by espressjs
const dashboardView = (req, res) => {
    res.render("dashboard", {
        user: req.user
    });
};

module.exports = {
    dashboardView,
};