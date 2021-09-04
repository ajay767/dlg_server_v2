const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Query cannot be created without name!!"],
	},
	email: {
		type: String,
		required: [true, "Query cannot be created without email!!"],
	},
	query: {
		type: String,
		required: [true, "Query cannot be empty!!"],
	},
});

const QueryModel = mongoose.model("Query", querySchema);

module.exports = QueryModel;
