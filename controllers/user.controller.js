var mongoose = require("mongoose");
const _ = require("lodash");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dlwrvppbq",
  api_key: "157581731635417",
  api_secret: process.env.CLOUDINARY_SECRET,
});
const User = mongoose.model("User");
const Instructor = mongoose.model("Instructor");
const Course = mongoose.model("Course");
const Rating = mongoose.model("Rating");
//get login user data
module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }).exec((err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res.status(200).json({
        status: true,
        // user: _.pick(user, ["fullname", "email", "_id", "image"]),
        user: user,
      });
  });
};
// edit user data
module.exports.editUserProfile = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  if (!req.file) {
    res.json({ message: "no files exist" });
  } else {
    let image = await cloudinary.v2.uploader.upload(req.file.path);
    req.file = [];
    req.file.push({
      url: image.secure_url,
      public_id: image.public_id,
    });
    userimage = req.file;
    userdata = {
      image: userimage,
      phone: req.body.phone,
      birthday: req.body.birthday,
      fullname: req.body.fullname,
      gender: req.body.gender,
      country: req.body.country,
      city: req.body.city,
    };

    await User.findByIdAndUpdate(
      req.params.id,
      { $set: userdata },
      { new: true },
      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          res.send(doc);
        }
      }
    );
  }
};
//add favourit course from user
module.exports.addFavouritCourse = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $push: { favouriteCourses: req.body.courseId },
    },
    (err, docUser) => {
      if (err) {
        res.json({ message: "there is error ->" + err });
      } else {
        res.send(docUser);
      }
    }
  );
};
//remove favourit course in user
module.exports.removeFavouritCourse = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $pull: { favouriteCourses: req.body.courseId },
    },
    (err, docUser) => {
      if (err) {
        res.json({ message: "there is error ->" + err });
      } else {
        res.send(docUser);
      }
    }
  );
};
//get all user's favourit courses
module.exports.getUserFavouritCourses = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .populate({ path: "favouriteCourses", populate: { path: "rate" } })
    // .populate({ path: "rate", model: Course })
    .exec((err, docCourses) => {
      if (err) {
        res.json({ message: "there is error ->" + err });
      } else {
        res.send(docCourses);
      }
    });
};
// rate course
module.exports.rateCourse = async (req, res) => {
  await Rating.exists(
    { UserId: req.body.userId, CourseId: req.body.courseId },
    (err, result) => {
      if (err) {
        res.json({ message: "there is error in exist doc" + err });
      } else {
        if (result) {
          Rating.findOneAndUpdate(
            { UserId: req.body.userId, CourseId: req.body.courseId },
            { $set: { rateValue: req.body.rate } },
            (err, ratingDoc) => {
              if (err) {
                res.json({
                  message: "there is error in update rating doc" + err,
                });
              } else {
                res.json({ message: "success added" });
              }
            }
          );
        } else {
          let rateObject = new Rating();
          rateObject.UserId = req.body.userId;
          rateObject.CourseId = req.body.courseId;
          rateObject.rateValue = req.body.rate;
          rateObject.save((err, rateDoc) => {
            if (err) {
              res.json({ message: "there is error in rate doc" + err });
            } else {
              User.findByIdAndUpdate(
                { _id: req.body.userId },
                {
                  $push: { rate: rateDoc._id },
                },
                (err, userDoc) => {
                  if (err) {
                    res.json({ message: "there is error in user doc" + err });
                  } else {
                    Course.findByIdAndUpdate(
                      { _id: req.body.courseId },
                      { $push: { rate: rateDoc._id } }
                    )
                      .populate("rate")
                      .exec((err, courseDoc) => {
                        if (err) {
                          res.json({
                            message: "there is error in course doc" + err,
                          });
                        } else {
                          res.send([userDoc, courseDoc]);
                        }
                      });
                  }
                }
              );
            }
          });
        }
      }
    }
  );
};
//add follow from user to Instructor
module.exports.followInst = async (req, res) => {
  console.log(req.body.userId);
  console.log(req.body.instId);
  await User.findByIdAndUpdate(
    req.body.userId,
    {
      $push: { follows: req.body.instId },
    },
    (err, userDoc) => {
      if (err) res.send(err);
      else {
        Instructor.findByIdAndUpdate(
          req.body.instId,
          {
            $push: { followers: req.body.userId },
          },
          (err, InstDoc) => {
            if (err) res.send(err);
            else {
              res.send([userDoc, InstDoc]);
            }
          }
        );
      }
    }
  );
};
//add unfollow from user to Instructor
module.exports.unFollowInst = async (req, res) => {
  console.log(req.body.userId);
  console.log(req.body.instId);
  await User.findByIdAndUpdate(
    req.body.userId,
    {
      $pull: { follows: req.body.instId },
    },
    (err, userDoc) => {
      if (err) res.send(err);
      else {
        Instructor.findByIdAndUpdate(
          req.body.instId,
          {
            $pull: { followers: req.body.userId },
          },
          (err, InstDoc) => {
            if (err) res.send(err);
            else {
              res.send([userDoc, InstDoc]);
            }
          }
        );
      }
    }
  );
};

// get all Instructor that user follow
// .populate("follows")
module.exports.followingInst = async (req, res) => {
  User.findById(req.params.id)
    .populate("follows")
    .exec((err, user) => {
      if (!user)
        return res
          .status(404)
          .json({ status: false, message: "User record not found." });
      else
        Instructor.populate(
          user,
          {
            path: "follows.userId",
            model: User,
          },
          (err, instDoc) => {
            if (err) {
              res.json({ status: false, message: err });
            } else {
              res.send(instDoc);
            }
          }
        );
      // return res.status(200).json({
      //   status: true,
      //   user: user,
      // });
    });
};

// var phone = new Schema({
//   name: String
// });
// var Phone = mongoose.model('Phone', phone);

// var user = new Schema({
//   name: String
// , phone: { type: Schema.ObjectId, ref: 'Phone' }
// });
// var User = mongoose.model('User', user);

// var blogpost = Schema({
//   title: String
// , tags: [String]
// , author: { type: Schema.ObjectId, ref: 'User' }
// });
// var BlogPost = mongoose.model('BlogPost', blogpost);

// BlogPost.find({ tags: 'fun' }).lean().populate('author').exec(function (err, docs) {
//   assert.ifError(err);

//   User.populate(docs, {
//     path: 'author.phone',
//     select: 'name',
//     model: Phone // <== We are populating phones so we need to use the correct model, not User
//   }, callback);

//   // or use the model directly

//   Phone.populate(docs, {
//     path: 'author.phone',
//     select: 'name',
//   }, callback);
// })

////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// var mongoose = require("mongoose");

// //SCHEMA SET UP
// var movieSchema = new mongoose.Schema({
//    title: String,
//    director: String,
//    year: Number,
//    comments:[
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Comment"
//       }
//       ]
// });module.exports = mongoose.model("Movie", movieSchema);
// var commentSchema = mongoose.Schema({
//    author: String,
//    text: String,
//    rating: Number,
//    movie: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Movie"
//       }
//       ]
// });module.exports = mongoose.model("Comment", commentSchema);

// Course.aggregate([
//   { "$unwind": "$rate" },
//   {
//       "$group": {
//           "_id": "$rate",
//           "ratingAvg": { "$avg": "$rateValue" }
//       }
//   }
// ], function(err, results) {
//   // if(err) handleError(err);
//   // Movie.populate(results, { "path": "_id" }, function(err, result) {
//       if(err) handleError(err);
//       console.log(results);
//   // });
// })
