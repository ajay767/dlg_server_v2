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
    validate: {
      validator: (email) => {
        return validator.isEmail(email);
      },
    },
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
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin",
  },
  coupan: {
    type: String,
    required: [true, "Enter a valid coupan provided by super admin"],
    validate: {
      validator: (coupan) => {
        return coupan.length > 8;
      },
      message: "Enter a Valid Coupan",
    },
  },
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  typed_password,
  userPassword
) {
  return await bcrypt.compare(typed_password, userPassword);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
