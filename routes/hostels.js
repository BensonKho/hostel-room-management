var express		=	require("express");
var router		=	express.Router();
var passport	=	require("passport");
var Hostel      =	require("../models/hostel");



router.get("/hostels",isLoggedIn,function(req,res){
	res.render("hostels/hostel");
});


// INDEX ROUTE
router.get("/hostels/:block",function(req,res){
	Hostel.find({block: req.params.block },function(err,rooms){
		if(err){
			console.log(err);
		}
		else{
			res.render("hostels/index",{rooms : rooms,block: req.params.block});
		}
	});	
});




// NEW ROUTE

router.get("/hostels/:block/new",isLoggedIn,function(req,res){
	var owner = {
		id : req.user._id,
		usn : req.user.username
	};
	Hostel.findOne({owner: owner },function(err,found){
		if(found){
			req.flash("error","You have already been allocated a room");
			res.redirect("/hostels");
		}
		else{
			 res.render("hostels/new",{block : req.params.block});
		}
	});
});



// CREATE ROUTE

router.post("/hostels/:block",isLoggedIn,function(req,res){
	
		Hostel.findOne({ $and: [{block: req.body.block},{proom: req.body.proom}]},function(err,room){
			if(room){
				req.flash("error","THIS ROOM IS ALREADY FILLED TRY NEW ONE");
				res.redirect("/hostels");
			}
			else{
				
		var proom = req.body.proom;
		var name = req.body.name;
		var department = req.body.department;
		var year = req.body.year;
		var contact = req.body.contact;
		var block = req.body.block;
		var email = req.body.email;
		var owner = {
			 id : req.user._id,
			 usn : req.user.username
		};
	
		var newCamp	=	{proom: proom, name: name,department: department,year: year,contact:contact,block:block,email:email,owner: owner};
	
	
		Hostel.create(newCamp,function(err,newroom){
		if(err){
			
			console.log(err);
		}
		else{
				res.redirect("/hostels/"+newroom.block);
		}
   }); 
		}  
	});
		
});
	

// SHOW ROUTE

router.get("/hostels/:block/student/:id",isLoggedIn,function(req,res){
	Hostel.findById(req.params.id,function(err,foundroom){
		if(err){
			res.redirect("/hostels");
		}
		else{
			res.render("hostels/info",{room: foundroom});
		}
	});
});

// UPDATE ROUTE

router.get("/hostels/:block/student/:id/new",function(req,res){
	Hostel.findById(req.params.id,function(err,found){
		if(err){
			console.log(err);
		}
		else{
			res.render("hostels/updateform",{x : found});
		}
	});
});



router.put("/hostels/:block/student/:id",isLoggedIn,function(req,res){
	
	if(req.user.isAdmin){
		var proom = req.body.proom;
		var name = req.body.name;
		var department = req.body.department;
		var year = req.body.year;
		var contact = req.body.contact;
		var block = req.body.block;
		var email = req.body.email;
		var owner = {
			 id : req.user._id,
			 usn : req.user.username
		};
	
		var newCamp	=	{proom: proom, name: name,department: department,year: year,contact:contact,block:block,email:email,owner: owner};
	
	
	Hostel.findByIdAndUpdate(req.params.id,newCamp,function(err,updated){
		if(err){
			console.log(err);
		}
		else{
			req.flash("success","Congrats room updated !!");
			res.redirect("/hostels/"+req.params.block);
		}

	});
	}
		else{
		 req.flash("error","You are not Admin");
		res.redirect("/hostels");
		}
});

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
		
	}
	req.flash("error","You need to be Logged In");
	res.redirect("/");
}




module.exports	=	router;