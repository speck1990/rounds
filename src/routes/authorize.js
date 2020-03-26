const express = require("express");
const router = express.Router();

// Middleware
const auth = require("../middleware/auth");
const ynabAuthorize = require("../middleware/ynabAuthorize");

router.get("/authorize", auth, (req, res, next) => {
	const ynabClientId = process.env.YNAB_CLIENT_ID;
	const ynabRedirectUrl = `${process.env.DOMAIN}/connect`;
	const authorizeUrl = `https://app.youneedabudget.com/oauth/authorize?client_id=${ynabClientId}&redirect_uri=${ynabRedirectUrl}&response_type=code`;
	res.redirect(authorizeUrl);
});

router.get("/connect", [auth, ynabAuthorize], async (req, res, next) => {
	// YNAB was authorized using the ynabAuthorize middleware
	res.status(200).send("YNAB authorized <a href='/dashboard'>Dashboard</a>");
});

module.exports = router;
