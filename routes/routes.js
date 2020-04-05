var express = require("express");

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

// other routes below



module.exports = app;