const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instSchema = new Schema(
  {
    UserId: { type: Schema.Types.ObjectId, ref: "User" },
    InstId: { type: Schema.Types.ObjectId, ref: "Instructor" },
    rateValue: Number,
  },
  { timestamps: true }
);

mongoose.model("InstRating", instSchema);
