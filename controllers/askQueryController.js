const Query = require("./../models/askQueryModel");

exports.getAllQuery = async (req, res) => {
	try {
		const query = await Query.find({});
		res.status(200).json({
			status: "success",
			length: query.length,
			querys: query,
		});
	} catch (error) {
		res.status(404).json({
			status: "error",
			message: error.message,
		});
	}
};

exports.createQuery = async (req, res) => {
	try {
		console.log(req.body);
		const query = await Query.create({
			name: req.body.name,
			email: req.body.email,
			query: req.body.query,
		});
		res.status(200).json({
			status: "success",
			querys: query,
		});
	} catch (error) {
		res.status(404).json({
			status: "error",
			message: error.message,
		});
	}
};
