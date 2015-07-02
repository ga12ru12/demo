var util = require('util');
var EventEmitter = require('events').EventEmitter;
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

function User(){}
util.inherits(User, EventEmitter);

/**
 * Active user when click link in email
 *
 * @method activeUser
 * @param userId
 * @return {Bollean} success or fail
 */
User.prototype.activeUser = function(userId, cb){
    if(userId){
        UserModel.update({_id: userId}, {$set: {isActive: true}}, function(err){
            if(err){
                console.log(new Date() + ' BUG BUG BUG UserModel.update: '+userId);
                console.log(err);
                return cb(false);
            }else{
                return cb(true);
            }
        });
    }else{
        return cb(false);
    }
}

module.exports = User;
