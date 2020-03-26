const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

router.get("/dashboard", auth, async (req, res, next) => {
	res.send(`<ul><li><a href="/budgets">Budgets</a></li></ul>`);
});

module.exports = router;
