/**
 * Created by Darshana on 4/18/2017.
 */
var user = require('../Models/user');

module.exports = {
    findUser: function(req,callback){
        user.findById(req.params.id , function(err,user){
            if (err)
                console.log(err);  // log if there is any error
            callback(user);  // otherwise return the user data
        });
    }
}