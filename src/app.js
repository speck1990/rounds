var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const passport = require("passport");
const expressSession = require("express-session");
var logger = require("morgan");

// connect to database
require("./db/mongoose");

var app = express();

// passport config
const User = require("./models/user");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
	expressSession({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false
	})
);

// passport initialize
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes/index"));
app.use("/", require("./routes/register"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/authorize"));
app.use("/", require("./routes/dashboard"));
app.use("/", require("./routes/budgets"));

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
