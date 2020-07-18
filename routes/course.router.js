const express = require("express");
const router = express.Router();
const ctrlCourse = require("../controllers//course.controller");
const multer = require("multer");

const DIR = "./public/course/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "video/mp3" ||
      file.mimetype == "video/mp4"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});
router.post(
  "/newcourse/:id",
  upload.fields([
    {
      name: "courseVideo",
      maxCount: 1,
    },
    {
      name: "courseImage",
      maxCount: 1,
    },
  ]),
  ctrlCourse.creatCourse
);
router.get("/categorycourses/:category", ctrlCourse.getCoursesCategory);
router.get("/getcourse/:id", ctrlCourse.getCourse);
router.get("/homepage", ctrlCourse.homePageCourses);
router.get("/searchcourse/:courseName", ctrlCourse.searchForCourses);
router.post("/payforcourse", ctrlCourse.bookCourse);

module.exports = router;
