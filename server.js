require("./models/db");
require("dotenv").config();
require("./config/passport");
// require("./config/passportFacebook");
// require("./config/passportGoogle");
const _ = require("lodash");
const bodyParser = require("body-parser");
const express = require("express");
// const elasticsearch = require("elasticsearch");
const app = express();
const http = require("http").createServer(app);
// var io = require('socket.io')(http);
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const rtsIndex = require("./routes/authentication.router");
const rtsUser = require("./routes/user.router");
const rtsInst = require("./routes/instructor.router");
const rtsCourse = require("./routes/course.router");
// const client = new elasticsearch.Client({
//   hosts: ["http://localhost:9200"],
// });
// app.use(
//   session({
//     secret: "s3cr3t",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.use("/auth", rtsIndex);
app.use("/user", rtsUser);
app.use("/inst", rtsInst);
app.use("/course", rtsCourse);
// client.ping(
//   {
//     requestTimeout: 30000,
//   },
//   function (error) {
//     // at this point, eastic search is down, please check your Elasticsearch service
//     if (error) {
//       console.error("Elasticsearch cluster is down!");
//     } else {
//       console.log("Everything is ok");
//     }
//   }
// );
// app.use(express.static(__dirname + "/chat/dist/chat"));
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "/chat/dist/chat/index.html"));
// });

http.listen(process.env.PORT || 4000, () => {
  console.log("http://localhost:4000");
});
