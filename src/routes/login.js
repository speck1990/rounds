const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login", (req, res, next) => {
	const html = `<form action="/login" method="post">
    <label for="email">Email:</label><br>
    <input type="text" id="email" name="email"><br>
    <label for="password">Password:</label><br>
    <input type="password" id="password" name="password"><br><br>
    <input type="submit" value="Submit">
    </form>`;
	res.send(html);
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (error, user, info) => {
		if (error) return next(error);

		if (!user) {
			return res.status(400).send("Email or password are incorrect");
		}

		req.logIn(user, error => {
			if (error) {
				return next(error);
			}
			return res.redirect("/dashboard");
		});
	})(req, res, next);
});

module.exports = router;
