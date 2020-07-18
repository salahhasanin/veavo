const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    courseName: {
      type: String,
      required: "course name is required",
      text: true,
    },
    courseDescription: {
      type: String,
      required: "course description is required",
    },
    priviousSalary: Number,
    salary: { type: Number, required: "course salary is required" },
    coursePlace: String,
    courseStart: Date,
    attendanceNum: {
      type: Number,
      required: "course attendance number is required",
    },
    video: [
      {
        url: String,
        public_id: String,
      },
    ],
    mainImage: [
      {
        url: String,
        public_id: String,
      },
    ],
    rate: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    avgrate: Number,
    learnPoint: [String],
    prerequists: [String],
    instructorID: { type: Schema.Types.ObjectId, ref: "Instructor" },
    userBooked: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "CourseComment" }],
    category: {
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
    courseIncludes: {
      timesInWeek: { type: Number, required: "number of times is required" },
      numOfMaterial: {
        type: Number,
        required: "number of material is required",
      },
      exercise: { type: Number, required: "number of Exercises is required" },
      certificate: { type: Boolean, required: "certificate is required" },
    },
    userBooked: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

mongoose.model("Course", CourseSchema);

// models.Project.find(function(err, result) {
//   //result = doc below
// }).populate('media')
// {
// _id: 57f36baa6cf34d079c8474a0,
// code: 'ZMIA',
// __v: 0,
// media:[
//   {
//     _id: 57f36bb26cf34d079c847766,
//     project_code: 'ZMIA',
//     amount: 228,
//     __v: 0
//   },
//   {
//     _id: 57f36bb26cf34d079c84775c,
//     project_code: 'ZMIA',
//     amount: 250,
//     __v: 0
//   }
// ]
// },
// {
// _id: 57f36baa6cf34d079c8474a1,
// code: 'ZMJU',
// __v: 0,
// media: []
// }
// models.Project.aggregate([
//   { "$unwind": "$media" },
//   {
//       "$lookup": {
//           "from": "media", // <-- collection to join
//           "localField": "media",
//           "foreignField": "_id",
//           "as": "media_joined"
//       }
//   },
//   { "$unwind": "$media_joined" },
//   {
//       "$group": {
//           "_id": "$media_joined.project_code",
//           "total": { "$sum": "$media_joined.amount" }
//       }
//   }
// ], function(err, result){
//   console.log(result);
// })
