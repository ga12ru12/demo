/**
 * Copyright (c) 2015 QUp World Inc. All Rights Reserved.
 *
 * This document contains proprietary and confidential information of QUp World.
 * It may not be used for any other purposes, reproduced in whole or in part, nor passed to any organization or person
 * without the specific permission in writing of the Technical Director, QUp World.
 *
 * @author QUp World
 *
 * @see http://qupworld.com/terms
 * @see http://qupworld.com/privacy
 *
 * Description
 *
 */
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var passportLocalMongoose = require('passport-local-mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        username     : String,
        password     : String,
        email        : String,
        name         : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema,'User');