const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/veavo-backend", (err) => {
  if (!err) {
    console.log("MongoDB connection succeeded.");
  } else {
    console.log(err);
  }
});

require("./user.model");
require("./course-category.model");
require("./course-comment.model");
require("./course.model");
require("./user.model");
