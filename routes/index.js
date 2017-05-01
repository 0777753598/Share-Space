var express = require('express');
var router = express.Router();
var passport = require('passport');


//var User = require('../app/Models/user');
var Place = require('../app/Controllers/place');
var User =  require('../app/Controllers/user');

require('../app/Controllers/passport');

/* GET home page. */
// router.route('/')
//
// 	.get(function(req, res, next){
// 	res.render('index', {title:"Welcome Page", name:"darshana"});
// });


router.route('/home')

	.get(function(req, res, next){
		res.render('home');
});

router.post('/name',function (req,res){
    console.log('this');
    console.log(req.body);
    res.send('text');
});

router.route('/documents')
    .get(function(req,res){
        res.render('Documents');

});

router.route('/signUp')
    .get(function(req, res ,next){
        res.render('signUp',{ message: req.flash('signupMessage')});  
    
    })

    .post(passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signUp',
        failureFlash : true
}));



router.route('/login')
	
	.get(function(req, res, next) {

  	     res.render('login', { message: req.flash('loginMessage')});
         
    
    })


     .post(passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
}));


router.use(function(req, res, next){
    if(req.isAuthenticated())
        return next();
    
    res.redirect('login');
});

router.route('/profile')

    .get(function(req, res, next){
        res.render('profile',{ user : req.user});     
});

router.route('/map')
    .get(function(req,res,next){
        res.render('map',{ user : req.user});
});

router.get('/logout', function(req, res, next){
    req.logout();
        res.redirect('/home');
});

router.get('/name', function(req, res, next){
   res.json(req.user); 
});

router.route('/postDetails')
    .get(function(req,res,next){
        res.render('postDetails',{ user : req.user, success:req.session.success, errors:req.session.errors});
        req.session.errors = null;
        req.session.success = false;
           
})
    .post(function(req,res,next){
        console.log(req);
        req.check('number','NO feild can not be empty!').notEmpty();
        req.check('street','Street feild can not be empty!').notEmpty();
        req.check('city','City feild can not be empty!').notEmpty();
        req.check('lng','longatiude invalide input!').notEmpty().isFloat();
        req.check('lat','latitude invalide input').notEmpty().isFloat();
        req.check('capacity','capacity invalied input!').notEmpty().isInt();
        req.check('price','price feild can not be empty!').notEmpty();
        
    var errors = req.validationErrors();
    
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
       
    }
    else{
        req.session.success = true;
        Place.addPlace(req);
    }
     res.redirect('/postDetails');
});

router.get('/places', function(req,res,next){
    Place.getAllPlaces(function(places){
        res.render('places',{places : places, user: req.user});
    });
    
});

router.get('/data',function(req,res,next){
    Place.getAllPlaces(function(places){
        res.json(places);
    });
});

router.get('/place/:id',function (req,res,next) {
    Place.getPlace(req,function (place) {
        res.json(place);
    });
});

router.get('/user/:id',function (req,res,next) {
    User.findUser(req,function (user) {
        res.json(user);
    });
});

router.get('/updatePlace',function (req,res,next) {

    console.log(req.query.id+" "+req.query.text+" "+req.query.user_id);
    Place.addReview(req,function(place) {
        res.json(place);
    });
});





module.exports = router;
