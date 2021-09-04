const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name cannot be empty!"],
	},
	email: {
		type: String,
		unique: true,
		required: [true, "Email is required!"],
	},
	photo: {
		type: String,
	},
	password: {
		type: String,
		required: [true, "password not provided!"],
	},
	confirmPassword: {
		type: String,
		required: [true, "Please provide password Confirm"],
		validate: {
			validator: function(el) {
				return el === this.password;
			},
			message: "passwords are not same!",
		},
	},
});

userSchema.pre("save", async function(next) {
	//only run is password is modified
	if (!this.isModified("password")) return next();

	//hash the password security-insure 12
	this.password = await bcrypt.hash(this.password, 12);

	//set confirmPassword field undefined
	this.confirmPassword = undefined;

	next();
});

userSchema.methods.correctPassword = async function(
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
