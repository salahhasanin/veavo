const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
  {
    UserId: { type: Schema.Types.ObjectId, ref: "User" },
    CourseId: { type: Schema.Types.ObjectId, ref: "Course" },
    rateValue: Number,
  },
  { timestamps: true }
);

mongoose.model("Rating", ratingSchema);
