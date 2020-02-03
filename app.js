var express 		= 	require('express'),
	app 			= 	express(),
	bodyParser		= 	require('body-parser'),
    JSAlert 		= 	require("js-alert"),
	Hostel			= 	require("./models/hostel"),
	passport		=	require("passport"),
	flash			=	require("connect-flash"),
	LocalStrategy 	= 	require("passport-local"),
	methodOverride  =	require("method-override"),
	User			=	require("./models/user"),
	Swap			=	require("./models/swap"),
	mongoose		= 	require('mongoose');


// ROUTES

var hostelRoutes		=	require("./routes/hostels"),
	swapRoutes			=	require("./routes/swaps"),
	indexRoutes		    =	require("./routes/index");



// APP CONFIG
// mongoose.connect("mongodb://localhost/hostel", {useNewUrlParser: true})
// .then(cb => {
// 	console.log('connected to db')
// })


mongoose.connect("mongodb+srv://anuj:anuj12345@cluster0-b0u1b.mongodb.net/test?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("connected to db");
}).catch(err => {
	console.log("ERROR:",err.message);
});







app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONGIGURATION

app.use(require("express-session")({
	secret : "Logged In",
	resave : false,
	saveUninitialized : false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// passing current user in every route

app.use(function(req,res,next){
	res.locals.CurrentUser 	= 	req.user;
	res.locals.error		=	req.flash("error");
	res.locals.success		=	req.flash("success");
	next();
});

app.use(hostelRoutes);
app.use(swapRoutes);
app.use(indexRoutes);




// SERVER RUNNING
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function(){
	console.log("sever is running");
});

