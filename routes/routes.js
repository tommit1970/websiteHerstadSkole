var express = require("express"); // routeshandling is in here
var User = require("../db_stuff/user.js"); // mongo db
var jsSHA = require("../encryption/encrypt.js"); // encryption

var app = express();

app.use(express.static("public"));

app.set("view engine", "ejs"); // embeded javascript

var bodyP = require("body-parser");

app.use(bodyP.json()); // using json-parsing with the body-parser, option is -> bodyP.urlencoded({ extended: false })

var data = {
	sitename: "websiteHerstadMusikk2020"
}
///////////////////////////////////////////////////////////////////////////////
// The routes here are:
	// Main - homepage - index.ejs
	// Loginhandling
	// Registrationhandling
///////////////////////////////////////////////////////////////////////////////



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

	var inputObj = {
		username: req.body.username,
		password: hash
	}


	User.find({username:inputObj.username}, (err, user) => {

		var responseObj = {username: "unknown", msg: "no message"};

		if(err){
			console.log("Something went wrong! - User not found!" + err);

		}else{

			// must be only 1
			if(user.length === 1){
				
				// password check
				if(user[0].password === inputObj.password){
					responseObj.username = user[0].username;
					responseObj.email = user[0].email;
					responseObj.msg = "Full match!";
					console.log(responseObj.msg);
				}else{
					responseObj.msg = "FU - Found user, but password was wrong!"; // username or password is wrong
					responseObj.username = user[0].username;
					responseObj.email = user[0].email;
					console.log(responseObj.msg);
				}

			}else{
				responseObj.msg = "NUF - No user found"; // username or password is wrong
			}
		}
		console.log(responseObj);

		res.send(responseObj);
	});

});




// Registrationhandling
app.post("/reg", (req,res)=>{
	

	// Initial feedback
	var message;
	console.log("User save request sent!");

	// Retrive all userdata
	User.find({},{username:1, _id:0}, (err, usernameArray) => { // User.find({},{username:1, _id:0}, callback) = returns only username with no _id

		console.log(usernameArray);

		if(err){
			console.log("Something went wrong!");
		}else{
			console.log("All users retrieved for registration check!"); //Got the users - what now

			var testFailed;

			// usernameArray.forEach((dbinputObj)=>{
			// });

			// Check for similar users
			for(var i = 0;i < usernameArray.length;i++){
				if(usernameArray[i]["username"] === req.body.username){
					testFailed = true;
					break;
				}

			}

			var responseObj = {
				u: usernameArray
			}

			if(testFailed){
				console.log("Save request Failed with " + req.body.username);
				responseObj.msg = "User already exits";
				res.send(responseObj); // failed to create new user
			}else{

				// encryption - hashing the password - can be done after usercheck - improve
				var shaObj = new jsSHA("SHA-512", "TEXT");
				shaObj.update(req.body.password);
				var hash = shaObj.getHash("HEX");

				// Creating the inputObj
				var clientinputObj = {
						username: req.body.username,
						email: req.body.email,
						password: hash,
						grade: 7 // hardcoded - improve
				};

				// Preparing inputObj for saving
				var user = new User(clientinputObj);

				user.save(function(err){
					if(err){
						message = "Something went wrong!";
					}else{
						message = `User registered on ${data.sitename}`;
					}
					
					console.log(message); // serverside

					responseObj.msg = message;

					res.send(responseObj); // sent to clientside

				}); // end user.save


			} // end if testFailed else

		} // end if err else
	
	}); // end User.find

}); // end app.post



// other routes below



module.exports = app;