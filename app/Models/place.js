var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var placeSchema =  new Schema({
    postedBy:{
        type:Schema.ObjectId,
        ref:'User'
    },
    address:{
        no:String ,
        street:String ,
        city:String
    },
    position:{
        lat:Number,
        lng:Number
    },
    capacity:Number,
    price:Number,
    description:String,
    review:[{
            text:String,
            postedBy:{
                type:Schema.Types.ObjectId , 
                ref:'User'
            }
        }
    ],
    date:{type:Date , default:Date.now}
});

module.exports = mongoose.model('Place',placeSchema);