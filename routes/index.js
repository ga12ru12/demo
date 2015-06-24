var express = require('express');
var router = express.Router();

module.exports = function(passport){

    /* GET home page. */
    router.get('/index', function (req, res) {
        res.render('index');
    });
    router.get('/', function (req, res) {
        res.render('login', { message: req.flash('loginMessage') });
    });
    router.post('/login', function (req, res) {
        console.log(1);
        res.render('index');
    });
    router.get('/signup', function (req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/index',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}