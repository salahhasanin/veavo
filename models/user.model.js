const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      trim: true,
      index: true,
    },
    fullname: {
      type: String,
      // required: [true, "can't be blank"],
      minlength: 2,
      maxlength: 50,
    },
    password: {
      type: String,
      required: "Password can't be empty",
      minlength: [4, "Password must be atleast 4 character long"],
    },
    image: [{ url: String, public_id: String }],
    favouriteCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    bookedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    phone: {
      type: String,
      // required: [true, "can't be blank"],
      match: [/^01[0-2-5]{1}[0-9]{8}/, "is invalid"],
    },
    bithday: Date,
    gender: {
      type: String,
      // match: [/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, "is invalid"],
    },
    country: {
      type: String,
      match: [/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, "is invalid"],
    },
    city: {
      type: String,
      match: [/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/, "is invalid"],
    },
    role: {
      type: String,
      required: "role is required",
      enum: ["student", "instructor"],
    },
    rate: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    rateInst: [{ type: Schema.Types.ObjectId, ref: "InstRating" }],
    follows: [{ type: Schema.Types.ObjectId, ref: "Instructor" }],
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
    bookedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    salt: String,
    //   payment
  },
  { timestamps: true }
);

// Custom validation for email
UserSchema.path("email").validate((val) => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

// Custom validation for gender
UserSchema.path("gender").validate((val) => {
  genderRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(val);
  return genderRegex;
}, "Invalid gender.");

UserSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};
mongoose.model("User", UserSchema);
