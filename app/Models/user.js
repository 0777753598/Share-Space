var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var Schema = mongoose.Schema;

var userSchema =  new Schema({
    first_name:String,
    last_name:String,
    nic: String,
	email: String,
	password: String,
    date:{type:Date , default:Date.now}
});

userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);