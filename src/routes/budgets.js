const express = require("express");
const router = express.Router();
const ynab = require("ynab");

const auth = require("../middleware/auth");
const ynabAuthorize = require("../middleware/ynabAuthorize");

router.get("/budgets", [auth, ynabAuthorize], async (req, res, next) => {
	const accessToken = req.session.accessToken;

	const ynabAPI = new ynab.API(accessToken);

	try {
		const budgetsResponse = await ynabAPI.budgets.getBudgets();
		const budgets = budgetsResponse.data;
		res.status(200).send({ accessToken, budgets });
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
