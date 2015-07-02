var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = function(passport){

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index');
    });
    router.get('/login', function (req, res) {
        res.render('login', { message: req.flash('loginMessage') });
    });
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/index', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    router.get('/signup', function (req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash : true
    }));

    router.get('/welcome/:userId', function(req, res){
        var user = new User();
        user.activeUser(req.param('userId'), function(status){
            if(status){
                res.redirect('/');
            }else{
                res.render('error', {
                    message: 'Not Found',
                    error: {
                        status: 404,
                        stack: 'UserId Not Found'
                    }
                })
            }
        });
    });

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