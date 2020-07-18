const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookCourseSchema = new Schema(
  {
    UserId: { type: Schema.Types.ObjectId, ref: "User" },
    CourseId: { type: Schema.Types.ObjectId, ref: "Course" },
    paymentId: String,
    // rateValue: Number,
  },
  { timestamps: true }
);

mongoose.model("Booking", bookCourseSchema);
