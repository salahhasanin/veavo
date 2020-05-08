require("./models/db");
require("dotenv").config();
require("./config/passport");
// require("./config/passportFacebook");
// require("./config/passportGoogle");
const _ = require("lodash");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
// const io = require("socket.io")(http);
const path = require("path");
// const favicon = require("serve-favicon");
// const logger = require("morgan");
// const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");

const rtsIndex = require("./routes/authentication.router");
const rtsUser = require("./routes/user.router");

app.use(
  session({
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.use("/auth", rtsIndex);
app.use("/user", rtsUser);
// app.use("/chat", rtsChat);

// socket io
// io.on("connection", function(socket) {
//   console.log("User connected");
//   socket.on("disconnect", function() {
//     console.log("User disconnected");
//   });
//   socket.on("save-message", function(data) {
//     // console.log(data);
//     io.emit("new-message", { message: data });
//   });
// });
// app.use(express.static(__dirname + "/chat/dist/chat"));
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "/chat/dist/chat/index.html"));
// });

http.listen(process.env.PORT || 4000, () => {
  console.log("http://localhost:4000");
});
