const fetch = require("node-fetch");

const ynabAuthorize = async (req, res, next) => {
	// Check if accessToken is stored in a session variable
	if (req.session.accessToken) {
		// There was an access token. YNAB is authorized.
		// Move on...
		return next();
	}

	// Variables needed for YNAB api
	const ynabClientId = process.env.YNAB_CLIENT_ID;
	const ynabClientSecret = process.env.YNAB_CLIENT_SECRET;
	const ynabRedirectUrl = `${process.env.DOMAIN}/connect`;

	// Set the beginning of the fetchUrl to obtain tokens
	let fetchUrl = `https://app.youneedabudget.com/oauth/token?client_id=${ynabClientId}&client_secret=${ynabClientSecret}&redirect_uri=${ynabRedirectUrl}`;
	// Check to see if code is given in url
	if (req.query.code) {
		// If this is true, user is authorizing for the first time
		fetchUrl += `&grant_type=authorization_code&code=${req.query.code}`;
	} else if (req.user.refreshToken) {
		// If this is true, user has authorized, but access token has expired
		fetchUrl += `&grant_type=refresh_token&refresh_token=${req.user.refreshToken}`;
	} else {
		// If nothing else is true, user has not authorized YNAB
		return res.status(401).send("YNAB not authorized");
	}

	// If we made it to this point, user has authorized YNAB and accessToken is expired
	// or user is authorizing for the first time

	try {
		// Make call to fetchUrl to obtain new tokens
		const response = await fetch(fetchUrl, { method: "POST" });
		// convert to json
		const data = await response.json();

		// Update database with new refresh token
		req.user.refreshToken = data.refresh_token;
		await req.user.save();

		// Add access token to session variable
		req.session.accessToken = data.access_token;
	} catch (error) {
		return res.status(500).send(error);
	}

	// We've got our new tokens and ready to move on
	// Move on...
	next();
};

module.exports = ynabAuthorize;
