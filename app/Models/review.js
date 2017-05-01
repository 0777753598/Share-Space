var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema =  new Schema({
    postedBy:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    content:String
});

module.exports = mongoose.model('Review',reviewSchema);