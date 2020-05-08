const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseCategorySchema = new Schema(
  {
    categoryType: {
      type: String,
      required: "course category is required",
      enum: [
        "photography",
        "music",
        "cooking",
        "it & software",
        "art",
        "drawing",
        "other",
      ],
    },
    categoryCourses: [{ type: Schema.Types.ObjectId, ref: "Courses" }],
  },
  { timestamps: true }
);

mongoose.model("CourseCategory", CourseCategorySchema);
