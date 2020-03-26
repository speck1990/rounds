const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		lowercase: true
	},
	firstName: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	refreshToken: {
		type: String
	},
	secretToken: {
		type: String
	},
	active: {
		type: Boolean
	}
});

UserSchema.plugin(passportLocalMongoose, {
	usernameField: "email"
});

module.exports = mongoose.model("User", UserSchema);
