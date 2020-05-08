const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    courseName: { type: String, required: "course name is required" },
    courseDescription: {
      type: String,
      required: "course description is required",
    },
    priviousSalary: Number,
    exsistSalary: { type: Number, required: "course salary is required" },
    coursePlace: String,
    courseStart: Date,
    attendanceNum: {
      type: Number,
      required: "course attendance number is required",
    },
    video: {
      url: String,
      public_id: String,
      // required: "course video is required",
    },
    images: [{ url: String, public_id: String }],
    mainImage: {
      url: String,
      public_id: String,
      // required: "course image is required",
    },
    rate: [Number],
    learnPoint: [String],
    prerequists: [String],
    instructorID: { type: Schema.Types.ObjectId, ref: "Instructor" },
    comments: [{ type: Schema.Types.ObjectId, ref: "CourseComment" }],
    category: { type: Schema.Types.ObjectId, ref: "CourseCategory" },

    //  relateCourses: [{ type: Schema.Types.ObjectId, ref: "CourseSchema" }],
    // courseIncludes
  },
  { timestamps: true }
);

mongoose.model("Course", CourseSchema);
