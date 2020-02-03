var mongoose	=	require("mongoose");

var HostelSchema = new mongoose.Schema({
	proom: {type:String, trim:true, required:true},
	block: {type:String, trim:true, required:true},
	name: {type:String, trim:true, required:true},
	contact:{type:Number, trim:true, required:true},
	email:{type:String, trim:true, required:true},
	year: {type:Number, trim:true, required:true},
	department: {type:String, trim:true, required:true},
	owner : {
		id : {
			type : mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		usn : {type:String, trim:true, required:true},
	}
});


module.exports = mongoose.model("Hostel",HostelSchema);