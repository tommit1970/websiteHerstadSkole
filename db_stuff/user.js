var mongoose = require("./mongodb.js");

// Connection is done in mongodb.js

// Schema
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	grade: Number
});

// Model
var User = new mongoose.model("User", userSchema);

// var userCollection = {
// 	userSchema: userSchema,
// 	User: User
// }

module.exports = User;
