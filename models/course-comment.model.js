const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseCommentSchema = new Schema(
  {
    reviewerId: { type: Schema.Types.ObjectId, ref: "Instructor" },
    rate: [Number],
    comment: String,
  },
  { timestamps: true }
);

mongoose.model("CourseComment", CourseCommentSchema);
