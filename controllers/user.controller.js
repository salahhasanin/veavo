var mongoose = require("mongoose");
const _ = require("lodash");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dlwrvppbq",
  api_key: "157581731635417",
  api_secret: process.env.CLOUDINARY_SECRET,
});
var User = mongoose.model("User");

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
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

module.exports.editUserProfile = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  // userdata = {
  //   image: url + "/public/" + req.file.filename,
  //   phone: req.body.phone,
  //   birthday: req.body.birthday,
  //   fullname: req.body.fullname,
  //   gender: req.body.gender,
  //   country: req.body.country,
  //   city: req.body.city,
  // };

  if (!req.file) {
    console.log("Please upload a file");
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
    console.log(userdata);

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

  // res.send(req.file);
  // image phone bithday gender country city

  // console.log(req.body);
  // console.log(req.params);
};
