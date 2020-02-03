var mongoose	=	require("mongoose");

var SwapSchema = new mongoose.Schema({
	description: String,
	swapowner : {
		id : {
			type : mongoose.Schema.Types.ObjectId,
			ref : "User"
		},
		usn : {type:String, trim:true, required:true},
	}
});



module.exports = mongoose.model("Swap",SwapSchema);