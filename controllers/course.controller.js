var mongoose = require("mongoose");
const _ = require("lodash");
const stripe = require("stripe")(process.env.keySecret);
let User = mongoose.model("User");
let Instructor = mongoose.model("Instructor");
let Course = mongoose.model("Course");
let Rating = mongoose.model("Rating");
let Booking = mongoose.model("Booking");
let InstRating = mongoose.model("InstRating");

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dlwrvppbq",
  api_key: "157581731635417",
  api_secret: process.env.CLOUDINARY_SECRET,
});
module.exports.creatCourse = async (req, res) => {
  // req.body.courseVideo = [];
  // await cloudinary.v2.uploader.upload_large(
  //   req.files.courseVideo[0].path,
  //   {
  //     resource_type: "video",
  //     chunk_size: 6000000,
  //     eager_async: true,
  //   },
  //   function (err, result) {
  //     if (err) res.json({ message: err });

  //     req.body.courseVideo.push({
  //       url: result.secure_url,
  //       public_id: result.public_id,
  //     });
  //   }
  // );

  let image = await cloudinary.v2.uploader.upload(
    req.files.courseImage[0].path
  );
  req.body.mainImage = [];

  req.body.mainImage.push({
    url: image.secure_url,
    public_id: image.public_id,
  });
  courseimage = req.body.mainImage;
  // courseVideo = req.body.courseVideo;
  let learnpoints = JSON.parse(req.body.learnPoint);
  let prerequists = JSON.parse(req.body.prerequists);
  if (!req.files) {
    res.json({ message: "no files exist" });
  } else {
    User.findById(req.params.id, (err, docUser) => {
      if (err) {
        res.json({ message: err });
      } else {
        let course = new Course();
        course.mainImage = courseimage;
        // course.video = courseVideo;
        course.courseName = req.body.courseName;
        course.courseDescription = req.body.courseDescription;
        course.priviousSalary = req.body.priviousSalary;
        course.salary = req.body.salary;
        course.coursePlace = req.body.coursePlace;
        course.courseStart = req.body.courseStart;
        course.attendanceNum = req.body.attendanceNum;
        course.category = req.body.category;
        course.learnPoint = learnpoints;
        course.prerequists = prerequists;
        course.courseIncludes.timesInWeek = req.body.timesInWeek;
        course.courseIncludes.numOfMaterial = req.body.numOfMaterial;
        course.courseIncludes.exercise = req.body.exercise;
        course.courseIncludes.certificate = req.body.certificate;
        course.instructorID = docUser.instructor;
        course.save((err, docCourse) => {
          if (err) {
            res.json({ msg: "there are error" + err });
          } else {
            Instructor.findByIdAndUpdate(
              docUser.instructor,
              {
                $push: { myCourses: docCourse._id },
              },
              (err, docInst) => {
                res.send(docCourse);
              }
            );
          }
        });
      }
    });
  }
};
// get all courses in category
module.exports.getCoursesCategory = (req, res) => {
  Course.find({ category: req.params.category })
    .populate("rate")
    .exec((err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        res.json({ message: "there is error" + err });
      }
    });
};

// get specific course
module.exports.getCourse = async (req, res) => {
  await Course.findOne({ _id: req.params.id })
    .populate("rate")
    .exec((err, doc) => {
      if (err) {
        res.json({ message: "there is error" + err });
      } else {
        Instructor.findOne({ myCourses: doc._id }, (err, docInst) => {
          if (err) {
            res.json({ message: "there is inst error" + err });
          } else {
            User.findOne({ instructor: docInst._id }, (err, docUser) => {
              if (err) {
                res.json({ message: "there is user error" + err });
              } else {
                // Course.find({ courseName: /doc.courseName/ }) regex
                Course.find({ $text: { $search: doc.courseName } })
                  .populate("rate")
                  .sort({ createdAt: -1 })
                  .limit(4)
                  .exec((err, relatedDoc) => {
                    if (err) {
                      res.json({ message: "there is relatedDocs error" + err });
                    } else {
                      res.send([doc, docInst, docUser, relatedDoc]);
                    }
                  });
              }
            });
          }
        });
      }
    });
};

// get 12 new courses and 12 top rated courses and 4 top rated inst for home page //lsa
module.exports.homePageCourses = async (req, res) => {
  Course.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate("rate")
    .exec((err, newCourses) => {
      if (err) {
        res.json({ message: "there is error" + err });
      } else {
        Rating.aggregate(
          [
            { $unwind: "$CourseId" },
            {
              $group: {
                _id: "$CourseId",
                ratingAvg: { $avg: "$rateValue" },
              },
            },
            { $limit: 5 },
            { $sort: { ratingAvg: -1 } },
          ],
          function (err, results) {
            if (err) handleError(err);
            Course.populate(
              results,
              { path: "_id", populate: { path: "rate" } },
              function (err, topRatedCourses) {
                if (err) handleError(err);
                else {
                  InstRating.aggregate(
                    [
                      { $unwind: "$InstId" },
                      {
                        $group: {
                          _id: "$InstId",
                          ratingAvg: { $avg: "$rateValue" },
                        },
                      },
                      { $sort: { ratingAvg: 1 } },
                      { $limit: 4 },
                    ],
                    function (err, instResult) {
                      if (err) handleError(err);
                      Instructor.populate(
                        instResult,
                        { path: "_id", populate: { path: "userId" } },
                        function (err, topRatedInst) {
                          if (err) handleError(err);
                          res.send([newCourses, topRatedCourses, topRatedInst]);
                        }
                      );
                    }
                  );
                }
              }
            );
          }
        );
        ////////////////////////////test///////////////////////
      }
    });
};

module.exports.searchForCourses = async (req, res) => {
  var regexCourse = new RegExp(req.params.courseName, "i");
  await Course.find({ $text: { $search: regexCourse } })
    .populate("rate")
    // .sort({ createdAt: -1 })
    // .limit(4)
    .exec((err, searchResult) => {
      if (err) {
        res.json({ message: "there is related Docs error" + err });
      } else {
        res.send(searchResult);
      }
    });
};

module.exports.bookCourse = async (req, res) => {
  await Booking.exists(
    { UserId: req.body.user._id, CourseId: req.body.course._id },
    (err, result) => {
      if (err) {
        res.json({ message: "there is error in exist doc" + err });
      } else {
        if (result) {
          res.json({ message: "course already booked" });
        } else {
          varcharge = stripe.charges.create(
            {
              amount: req.body.course.salary,
              currency: "EGP",
              source: req.body.token,
            },
            (err, charge) => {
              if (err) {
                throwerr;
              } else {
                let bookingObject = new Booking();
                bookingObject.UserId = req.body.user._id;
                bookingObject.CourseId = req.body.course._id;
                bookingObject.paymentId = charge.id;
                bookingObject.save((err, bookDoc) => {
                  if (err) {
                    res.json({ message: "there is error in book doc" + err });
                  } else {
                    User.findByIdAndUpdate(
                      { _id: req.body.user._id },
                      {
                        $push: { bookedCourses: bookDoc._id },
                      },
                      (err, userDoc) => {
                        if (err) {
                          res.json({
                            message: "there is error in user doc" + err,
                          });
                        } else {
                          Course.findByIdAndUpdate(
                            { _id: req.body.course._id },
                            { $push: { userBooked: bookDoc._id } }
                          )
                            // .populate("rate")
                            .exec((err, courseDoc) => {
                              if (err) {
                                res.json({
                                  message: "there is error in course doc" + err,
                                });
                              } else {
                                res.json({
                                  success: true,
                                  message: "Payment Done",
                                });
                                // res.send([userDoc, courseDoc]);
                              }
                            });
                        }
                      }
                    );
                  }
                });
              }
            }
          );
        }
      }
    }
  );
  // varcharge = stripe.charges.create(
  //   {
  //     amount: 1500,
  //     currency: "EGP",
  //     source: req.body.token,
  //   },
  //   (err, charge) => {
  //     if (err) {
  //       throwerr;
  //     }
  //     console.log(charge);
  //     res.json({
  //       success: true,
  //       message: "Payment Done",
  //     });
  //   }
  // );
};

// delete Course
// module.exports.deleteCourse = (req, res) => {
//   Course.findByIdAndDelete({ _id: req.params.courseId }, (err, doc) => {
//     if (err) {
//       res.json({ message: "there is error" + err });
//     } else {
//       User.find({ favouriteCourses: { $in: [req.params.courseId] } }).then(
//         (users) => {
//           Promise.all(
//             users.map((user) =>
//               User.findOneAndUpdate(
//                 user._id,
//                 { $pull: { favouriteCourses: req.params.courseId } },
//                 { new: true }
//               )
//             )
//           );
//         }
//       );
//     }
//   });
// };
