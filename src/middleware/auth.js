const auth = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}

	res.send("User is not authenticated! <a href='/login'>Login</a>");
};

module.exports = auth;
