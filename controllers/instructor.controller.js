var mongoose = require("mongoose");
const _ = require("lodash");
const User = mongoose.model("User");
const Instructor = mongoose.model("Instructor");
const InstRating = mongoose.model("InstRating");

module.exports.createInstructor = async (req, res) => {
  let instructor = new Instructor();
  instructor.jobTitle = req.body.jobTitle;
  instructor.description = req.body.description;
  instructor.education = req.body.education;
  instructor.college = req.body.college;
  instructor.yearsOfExperience = req.body.experience;
  instructor.socialMedia.facebook = req.body.facebook;
  instructor.socialMedia.twitter = req.body.twitter;
  instructor.socialMedia.linkedin = req.body.linkedin;
  instructor.userId = req.params.id;
  await instructor.save((err, doc) => {
    if (err) {
      res.json({ msg: "there are error" + err });
    } else {
      user = {
        role: "instructor",
        instructor: doc._id,
      };
      User.findByIdAndUpdate(
        req.params.id,
        { $set: user },
        { new: true },
        (err, userDoc) => {
          if (err) {
            res.json({ msg: "there are error User" + err });
          } else {
            res.send(userDoc);
          }
        }
      );
    }
  });
};
//get instructor
module.exports.getInstructor = async (req, res) => {
  await Instructor.findById(req.params.id)
    .populate("myCourses")

    .exec((err, docInst) => {
      if (err) {
        res.json({ message: err });
      } else {
        User.findOne({ instructor: req.params.id }, (err, docUser) => {
          if (err) {
            res.json({ message: err });
          } else {
            res.send([docInst, docUser]);
          }
        });
      }
    });
};
//get all instructor's courses
module.exports.getInstructorCourses = async (req, res) => {
  await User.findById(req.params.id, (err, docUser) => {
    if (err) {
      res.json({ message: err });
    } else {
      Instructor.findOne({ _id: docUser.instructor })
        .populate("myCourses")
        .populate("followers")
        .exec((err, docCourses) => {
          if (err) {
            res.json({ message: "there is error ->" + err });
          } else {
            res.send(docCourses);
          }
        });
    }
  });
};

// rate Instructor ////////lsa
module.exports.rateInstructor = async (req, res) => {
  await InstRating.exists(
    { UserId: req.body.userId, InstId: req.body.instId },
    (err, result) => {
      if (err) {
        res.json({ message: "there is error in exist doc" + err });
      } else {
        if (result) {
          InstRating.findOneAndUpdate(
            { UserId: req.body.userId, InstId: req.body.instId },
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
          let rateObject = new InstRating();
          rateObject.UserId = req.body.userId;
          rateObject.InstId = req.body.instId;
          rateObject.rateValue = req.body.rate;
          rateObject.save((err, rateDoc) => {
            if (err) {
              res.json({ message: "there is error in rate doc" + err });
            } else {
              User.findByIdAndUpdate(
                { _id: req.body.userId },
                {
                  $push: { rateInst: rateDoc._id },
                },
                (err, userDoc) => {
                  if (err) {
                    res.json({ message: "there is error in user doc" + err });
                  } else {
                    Instructor.findByIdAndUpdate(
                      { _id: req.body.instId },
                      { $push: { userRate: rateDoc._id } },
                      (err, instDoc) => {
                        if (err) {
                          res.json({
                            message: "there is error in course doc" + err,
                          });
                        } else {
                          res.send([userDoc, instDoc]);
                        }
                      }
                    );
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
