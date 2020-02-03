var express		=	require("express");
var router		=	express.Router();
var passport	=	require("passport");
var User        =	require("../models/user");


router.get("/",function(req,res){
	res.render("home");
});

// =============
// AUTH ROUTES
// =============

 // SHOW REGISTER FORM
router.get("/register",function(req,res){
	res.render("register");
})

// HANDLE REGISTER LOGIC
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password,function(err,user){
		if(err){
			console.log(err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Rgistered you successfully , Welcome "+req.body.username);
			res.redirect("/hostels");
		});
	});
});

// SHOW LOGIN FORM
router.get("/login",function(req,res){
	res.render("login");
});

// HANDLING LOGIN LOGIC
router.post("/login",passport.authenticate("local",{
	successRedirect: "/hostels" ,
	failureRedirect: "/login"
	
 }),function(req,res){
});

// LOGOUT 
router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});


//MIDDLEWARE FOR LOGIN
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
		
	}
	req.flash("error","You need to be Logged In");
	res.redirect("/");
}


module.exports	=	router;