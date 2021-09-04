const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please specify event name!"],
	},
	poster: {
		type: String,
		required: [true, "please add event poster!!"],
	},
	posterCover: {
		type: String,
	},
	date: {
		type: Date,
	},
	overview: {
		type: String,
		required: [true, "Please specify event overview!"],
	},
	description: {
		type: String,
		required: [true, "Please specify event description!"],
	},
	mainGuest: {
		type: String,
		require: [true, "Please specify chief guest name!"],
	},
	organizer: {
		type: String,
		require: [true, "Please specify organiser name!"],
	},
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
