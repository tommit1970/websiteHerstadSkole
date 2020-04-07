var express = require("express"); // routeshandling is in here
var User = require("../db_stuff/user.js"); // mongo db
var jsSHA = require("../encryption/encrypt.js"); // encryption

var app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

var bodyP = require("body-parser");

app.use(bodyP.json());

var data = {
	sitename: "herstadMusikk2020"
}

// Main route
app.get("/", (req, res)=>{
	res.render("index", {data: data});
});

// Loginhandling
app.post("/login", (req,res)=>{

	var shaObj = new jsSHA("SHA-512", "TEXT");
	shaObj.update(req.body.password);
	// shaObj.update("test");
	var hash = shaObj.getHash("HEX");

	var userObj = {
		username: req.body.username,
		password: hash
	}

	User.find({username:userObj.username}, (err, user) => {

		var message;

		if(err){
			console.log("Something went wrong! - User not found!" + err);
		}else{

			if(user.length === 1){
				
				if(user[0].password === userObj.password){
					message = "Full match! " + user[0];
					console.log(message);
				}else{
					message = "FU - Found user, but password was wrong! Right one is: " + user[0]["password"];
					console.log(message);
				}

			}else{
				message = "NUF - No user found";
			}
		}

		res.send(message);
	});

});

// Registrationhandling
app.post("/reg", (req,res)=>{
	

	// Initial feedback
	var message = "User save request sent!";

	// Retrive all userdata
	User.find({},{username:1, _id:0}, (err, usernameArray) => { // User.find({},{username:1, _id:0}, callback) = returns only username with no _id

		console.log(usernameArray);

		if(err){
			console.log("Something went wrong!");
		}else{
			console.log("All users retrieved for main page!"); //Got the users - what now

			var testFailed;

			// Check for similar users
			usernameArray.forEach((dbUserObj)=>
{				if(dbUserObj.username === req.body.username){
					testFailed = true;
				}
			});


			if(testFailed){
				console.log("Save request Failed");
				res.send("User already exits");
			}else{

				// encryption - hashing the password - can be done after usercheck - improve
				var shaObj = new jsSHA("SHA-512", "TEXT");
				shaObj.update(req.body.password);
				var hash = shaObj.getHash("HEX");

				// Creating the userObj
				var clientUserObj = {
						username: req.body.username,
						password: hash,
						grade: 7 // hardcoded - improve
				};

				// Preparing userObj for saving
				var user = new User(clientUserObj);

				user.save(function(err){
					if(err){
						message = "Something went wrong!";
					}else{
						message: `User registered on ${data.sitename}`
					}
					console.log(message);
					res.send(message);

				}); // end user.save

			} // end if testFailed else

		} // end if err else
	
	}); // end User.find

}); // end app.post



// other routes below



module.exports = app;