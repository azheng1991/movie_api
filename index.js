const express = require('express');
const app = express();

//use the Morgan middleware library to log all requests
morgan = require("morgan");
app.use(morgan("common"));

app.get("/secreturl", function(req, res) {
	res.send("This is a secret url with super top-secret content.");
});


let topMovies = [
	{
		title: "Pokemon the Movie 1"
	},
	{
		title: "Pokemon the Movie 2"
	},
	{
		title: "Pokemon the Movie 3"
	},
	{
		title: "Pokemon the Movie 4"
	},
	{
		title: "Pokemon the Movie 5"
	},
	{
		title: "Pokemon the Movie 6"
	},
	{
		title: "Pokemon the Movie 7"
	},
	{
		title: "Pokemon the Movie 8"
	},
	{
		title: "Pokemon the Movie 9"
	},
	{
		title: "Pokemon the Movie 10"
	}
];

//GET requests
app.get("/movies", function(req, res) {
	res.json(topMovies);
});

app.get("/", function(req, res) {
	res.send("My Top Ten Pokemon Movie Collection");
});

  //use express.static to serve  “documentation.html” file from the public folder
app.use(express.static("public"));


//creating error-handling middleware function that will log all application-level errors to the terminal

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
