var express		=	require("express");
var router		=	express.Router();
var passport	=	require("passport");
var Swap        =	require("../models/swap");

	




// SWAP ROUTE
router.get("/swap",function(req,res){
	Swap.find({},function(err,swap){
		if(err){
			console.log(err);
		}
		else{
			res.render("swaps/index",{swap : swap});
		}
	});
});


router.get("/swap/:id/new",isLoggedIn,function(req,res){
	Hostel.findById(req.params.id,function(err,found){
		if(err){
			console.log(err);
		}
		else{
			res.render("swaps/new",{x: found,error: req.flash("error"),success: req.flash("success")})
		}
	});
});

router.post("/swap/:id",isLoggedIn,function(req,res){
	var description = req.body.description;
	var swapowner   = {
		id : req.user._id,
		usn : req.user.username
	}
	var newswap = {description:description, swapowner: swapowner};
		Swap.create(newswap,function(err,swap){
			if(err){
				console.log(err);
			}
			else{
				res.redirect("/hostels");
			}
		});
	
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
		
	}
	req.flash("error","You need to be Logged In");
	res.redirect("/");
}


module.exports	=	router;