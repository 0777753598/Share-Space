var place = require('../Models/place'); // taking the user reference

// define the place controller module functions
module.exports = {

    // function to add a place to the database.
    addPlace: function(req){
        // create a new place schema object
        var Place = new place();

        // assign the variables with the prameters coming form the "req"
        Place.capacity = req.body.capacity;
        Place.price = req.body.price;
        Place.postedBy = req.user._id;
        Place.address.no = req.body.number;
        Place.address.street = req.body.street;
        Place.position.lng = req.body.lng;
        Place.position.lat = req.body.lat;
        Place.address.city = req.body.city;
        Place.description = req.body.description;
        //save the object in to the database.
        Place.save(function(err,place){
            if(err)
                console.log(err);
            
            return place;
        });

       

    },
//function to take all the places in the database    
    getAllPlaces: function(callback){
        //get all places through schema
        place.find(function(err,places){
            if(err)
                console.log(err);
            callback(places); // if no error occurs return places
        });
               
    },
//function to get a unique place using object id

    getPlace: function (req, callback) { // id is coming form the http req uses a callback to get data back

        place.findById(req.params.id , function(err,place){
            if (err)
                console.log(err);  // log if there is any error
            callback(place);  // otherwise return the place data
        });
    },

    addReview: function (req,callback){

        place.findByIdAndUpdate(req.query.id,{$push:{"review":{text:req.query.text, postedBy:req.query.user_id}}},{safe:true, upsert:true, new : true},function(err,place){
            if (err)
                console.log(err);

            callback(place);
        });

    }



};