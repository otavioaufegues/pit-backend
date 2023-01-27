require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

// file upload - zip lattes
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

// Setting up port
const connUri = process.env.MONGO_LOCAL_CONN_URL;
let PORT = 3000;

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());

// for parsing application/json
app.use(express.json({ limit: "50mb" }));

// for parsing application/xwww-
app.use(express.urlencoded({ limit: "50mb", extended: true }));
//form-urlencoded

app.use(morgan('dev'));
app.use(express.static('uploads'));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//=== 2 - SET UP DATABASE
//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect(connUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () =>
  console.log("MongoDB --  database connection established successfully!")
);
connection.on("error", (err) => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

//=== 4 - CONFIGURE ROUTES
//Configure Route
require("./routes/index")(app);

//=== 5 - START SERVER
app.listen(PORT, () =>
  console.log("Server running on http://localhost:" + PORT + "/")
);
