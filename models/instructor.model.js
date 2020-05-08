const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
  // username: {
  //   type: String,
  //   lowercase: true,
  //   unique: true,
  //   match: [/^[a-zA-Z0-9]+$/, "is invalid"],
  //   trim: true,
  //   index: true,
  // },
  // email: {
  //   type: String,
  //   lowercase: true,
  //   unique: true,
  //   match: [/\S+@\S+\.\S+/, "is invalid"],
  //   trim: true,
  //   index: true,
  // },
  // name: { type: String },
  // image: String,
  // password: {
  //   type: String,
  //   required: "Password can't be empty",
  //   minlength: [4, "Password must be atleast 4 character long"],
  // },
  // bithday: Date,
  // phone: String,

  description: { type: String, required: [true, "can't be blank"] },
  college: { type: String, required: [true, "can't be blank"] },
  education: { type: String, required: [true, "can't be blank"] },
  governorate: { type: String, required: [true, "can't be blank"] },
  yearsOfExperience: { type: Number, required: [true, "can't be blank"] },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  myCourses: [{ type: Schema.Types.ObjectId, ref: "Courses" }],
  rating: [Number],
  socialMedia: {
    facebook: String,
    twitter: String,
    google: String,
  },
  //   totalStudent
  //   reviewers
});

mongoose.model("Instructor", InstructorSchema);
