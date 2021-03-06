var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var engine          = require('ejs-locals');
var mongoose        = require('mongoose');
var passport        = require('passport');
var flash           = require('connect-flash');
var morgan          = require('morgan');
var session         = require('express-session');
var i18n            = require("i18n");

//console.log wrapper for a bit more readable output in Node.js
require('better-log').install();

var dataConfig = require('./config/setting');
// configuration ===============================================================
var mongodb_connection_string = dataConfig.dbUrl;
if(process.env.OPENSHIFT_MONGODB_DB_URL){
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'demo';
}
console.log(new Date().toISOString()+' mongoDB url: '+mongodb_connection_string)
mongoose.connect(mongodb_connection_string); // connect to our database

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./config/passport')(passport)

i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['en', 'vi'],
    // you may alter a site wide default locale
    defaultLocale: 'vi',
    // where to store json files - defaults to './locales' relative to modules directory
    directory: __dirname + '/locales'
});

app.all('*', function (req, res, next) {
    res.locals.title = 'Demo';
    //console.log(res.locals);
    next();
});


var routes = require('./routes/index')(passport);
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;