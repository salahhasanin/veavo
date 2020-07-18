const express = require("express");
const router = express.Router();
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const ctrlUser = require("../controllers/user.controller");
const jwtHelper = require("../config/jwtHelper");

// Multer File upload settings
const DIR = "./public/";
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
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// get person data after login
router.get("/profile", jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post(
  "/editprofile/:id",
  upload.single("image"),
  ctrlUser.editUserProfile
);

router.post("/ratecourse", ctrlUser.rateCourse);
router.post("/addfavouritcourse/:id", ctrlUser.addFavouritCourse);
router.post("/removefavouritcourse/:id", ctrlUser.removeFavouritCourse);
router.get("/favouritcourses/:id", ctrlUser.getUserFavouritCourses);
router.post("/followInst", ctrlUser.followInst);
router.post("/unFollowInst", ctrlUser.unFollowInst);
router.get("/followingInst/:id", ctrlUser.followingInst);
module.exports = router;
