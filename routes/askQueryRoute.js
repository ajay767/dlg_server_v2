const express = require("express");
const queryController = require("./../controllers/askQueryController");

const Router = express.Router();

Router.route("/")
	.get(queryController.getAllQuery)
	.post(queryController.createQuery);

module.exports = Router;
