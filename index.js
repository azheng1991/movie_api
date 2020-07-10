const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;

const passport = require("passport");
require("./passport");

mongoose.connect(
  "mongodb://localhost:27017/myFlixDB",
  { useNewUrlParser: true }
);

{ useUnifiedTopology: true };

  // app.use initializations
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(express.static("public"));


var auth = require("./auth")(app);

//Read requests

//Gets data about all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.find()
  .then(function(movies) {
      res.status(201).json(movies)
  })
  .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
});

// Gets the data about a single movie, by title
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), function(req, res) {
  Movies.findOne({ Title : req.params.Title })
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Gets data about a genre by name:
app.get('/movies/genres/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({
      'Genre.Name' : req.params.Name
  })
  .then(function(movies) {
    res.json(movies.Genre)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Gets the data about a single director, by name
app.get("/movies/directors/:Name", passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({
      'Director.Name' : req.params.Name
  })
  .then(function(movies) {
    res.json(movies.Director)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//Create requests

//Posts a new user
app.post('/users', function(req, res) {
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
      if (user) {
          return res.status(400).send(req.body.Username + "already exists");
      } else {
          Users
          .create({
              Username: req.body.Username,
              Password: req.body.Password,
              Email: req.body.Email,
              Birthday: req.body.Birthday
          })
          .then(function(user) {res.status(201).json(user) })
          .catch(function(error) {
              console.error(error);
              res.status(500).send("Error: " + error);
          })
      }
  }).catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
  });
});

// add a favorite movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteMovies : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});


//Update requests

// Update a user's information
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username},
    { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if(err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
  });


//DELETE requests

// Deletes a movie from a user's favorites list by username
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
      $pull : { FavoriteMovies : req.params.MovieID }
    },
    { new : true }, // This line makes sure that the updated document is returned
    function(err, updatedUser) {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })
  });

// Deletes a user from the user registry
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
      if (!user) {
          res.status(400).send(req.params.Username + " was not found");
      } else {
          res.status(200).send(req.params.Username + " was deleted.");
      }
  })
  .catch(function(err) {
      console.error(err);
      res.status(500).send("Error: " + err);
  });
});


// error handling middleware, defined last in chain
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('something broke!');
});


// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
