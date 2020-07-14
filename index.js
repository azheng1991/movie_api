const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  Models = require('./models.js')

const passport = require('passport')
require('./passport')

const { check, validationResult } = require('express-validator')

const app = express()
const Movies = Models.Movie
const Users = Models.User


/*connect locally
mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
*/


//Connect to online database hosted on MongoDB Atlas
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });



app.use(bodyParser.json())
// Logging with Morgan
app.use(morgan('common'))

//creates a list of allowed domains
let allowedOrigins = ['http://localhost:1234']

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn’t found on the list of allowed origins
        let message =
          'The CORS policy for this application doesn’t allow access from origin ' +
          origin
        return callback(new Error(message), false)
      }
      return callback(null, true)
    },
  })
)


let auth = require('./auth')(app)



app.get('/', (req, res) => {
  res.send('<h1>' + '<b>Welcome to myFlix !<b>' + '</h1>')
})

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

// Get all MovieTitles with Description
app.get(
  '/movies',
  (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error: ' + err)
      })
  }
)

// Get a Movie by Title
app.get(
  '/movies/:Title',
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movies) => {
        res.status(201).json(movies)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error: ' + err)
      })
  }
)

// Get a Genre by Name
app.get(
  '/movies/genres/:Name',
  (req, res) => {
    Movies.findOne({ 'Genre.Name': req.params.Name })
      .then((movies) => {
        res.status(201).json(movies.Genre)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error: ' + err)
      })
  }
)

// Get a Director by Name
app.get(
  '/movies/directors/:Name',
  (req, res) => {
    Movies.findOne({ 'Director.Name': req.params.Name })
      .then((movies) => {
        res.status(201).json(movies.Director)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error: ' + err)
      })
  }
)

// Get all users
app.get(
  '/users',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.find()
      .then((users) => {
        res.status(201).json(users)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error: ' + err)
      })
  }
)

// Get a user by username
app.get(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user)
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error: ' + err)
      })
  }
)

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post(
  '/users',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    let hashedPassword = Users.hashPassword(req.body.Password)
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + 'already exists')
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user)
            })
            .catch((error) => {
              console.error(error)
              res.status(500).send('Error: ' + error)
            })
        }
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send('Error: ' + error)
      })
  }
)

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put(
  '/users/:Username',
  [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check(
      'Username',
      'Username contains non alphanumeric characters - not allowed.'
    ).isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail(),
  ],
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    let hashedPassword = Users.hashPassword(req.body.Password)
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: hashedPassword,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error: ' + err)
        } else {
          res.json(updatedUser)
        }
      }
    )
  }
)

// Add a movie to a user's list of favorites
app.post(
  '/users/:Username/Movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }, // This line makes sure that the updated document is returned
      (err, updatedUser) => {
        if (err) {
          console.error(err)
          res.status(500).send('Error: ' + err)
        } else {
          res.json(updatedUser)
          res
            .status(200)
            .send(req.params.MovieID + ' was added to list of Favorites.')
        }
      }
    )
  }
)

// Delete a movie from user's list of favorites
app.delete(
  '/users/:Username/Movies/:MovieID',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { FavoriteMovies: req.params.MovieID },
      }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          res.status(400).send(req.params.MovieID + ' was not found')
        } else {
          res
            .status(200)
            .send(
              req.params.MovieID + ' was deleted from the list of Favorites.'
            )
        }
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error: ' + err)
      })
  }
)

// Delete a user by username
app.delete(
  '/users/:Username',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found')
        } else {
          res.status(200).send(req.params.Username + ' was deleted.')
        }
      })
      .catch((err) => {
        console.error(err)
        res.status(500).send('Error: ' + err)
      })
  }
)

// Serving Static Files
app.use('/dev', express.static('public'))

/// Error Handling
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  } else {
    console.log('Added to log.')
  }
})

// listen for requests
const port = process.env.PORT || 8080
app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port)
})
