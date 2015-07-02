var util = require('util');
var EventEmitter = require('events').EventEmitter;
var nodemailer = require('nodemailer');
var path           = require('path');
var templatesDir   = path.resolve(__dirname, '..', 'templates');
var emailTemplates = require('email-templates')

function Mail(){
    // create reusable transporter object using SMTP transport
    this.transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'ga21ru21@gmail.com',
            pass: 'ga45ru45'
        }
    });
    // setup e-mail data with unicode symbols
    this.mailOptions = {
        from: 'Gà rù ? <ga21ru21@gmail.com>',
        subject: 'Hello to Demo'
    };
}
util.inherits(Mail, EventEmitter);

Mail.prototype.sendMailWelcome = function(params, cb){
    var self = this;
    emailTemplates(templatesDir, function(err, template) {
        if (err) {
            console.log(new Date()+' BUG BUG BUG emailTemplates');
            console.log(err);
            return cb(false);
        } else {
            // Send a single email
            template('welcome-email', params, function(err, html, text) {
                if (err) {
                    console.log(err);
                } else {
                    self.mailOptions.to = params.local.email;
                    self.mailOptions.subject = 'Welcome to Demo website';
                    self.mailOptions.html = html;
                    self.transporter.sendMail(self.mailOptions, function(err, responseStatus) {
                        if (err) {
                            console.log(new Date() + ' BUG BUG BUG self.transporter.sendMail');
                            console.log(err);
                            return cb(false);
                        } else {
                            console.log('Message sent: ' + responseStatus.response);
                            return cb(true);
                        }
                    });
                }
            });
        }
    });
}
module.exports = Mail;