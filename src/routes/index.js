const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.status(200).send("Rounds for YNAB" + "<a href='/login'>Login</a>");
});

module.exports = router;
