const mongoose = require("mongoose");

const recruitmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please enter your email."],
  },
  mobile: {
    type: Number,
    required: [true, "please enter your mobile no."],
  },
  gender: {
    type: String,
    required: [true, "please enter your gender."],
  },
  year: {
    type: Number,
    required: [true, "please enter your academic year"],
  },
  enrollment: {
    type: String,
    unique: true,
    required: [true, "please enter your enrollment no."],
  },
  branch: {
    type: String,
    required: [true, "please enter your branch name."],
  },
  skills: {
    type: String,
    default: "No skill set provided!",
  },
  why: {
    type: String,
    required: [true, "please write why you want to join DLG?."],
  },
  domain: {
    type: [String],
    required: [true, "please choose your domain."],
  },
});

const Recruitment = mongoose.model("Recruitment", recruitmentSchema);
module.exports = Recruitment;
