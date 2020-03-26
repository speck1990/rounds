const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/register", (req, res) => {
	const { email, firstName, lastName, password } = req.body;

	const active = true;

	User.register(new User({ email, firstName, lastName, active }), password, (errors, user) => {
		if (errors) {
			return res.status(500).send(errors);
		}

		return res.status(201).send(user);
	});
});

module.exports = router;
