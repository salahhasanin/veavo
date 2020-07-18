const express = require("express");
const router = express.Router();
const ctrlInst = require("../controllers/instructor.controller");

router.post("/newinst/:id", ctrlInst.createInstructor);
router.get("/instructordata/:id", ctrlInst.getInstructor);
router.get("/instcourses/:id", ctrlInst.getInstructorCourses);
router.post("/rateinst", ctrlInst.rateInstructor);

module.exports = router;
