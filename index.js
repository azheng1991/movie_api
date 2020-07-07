const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const bodyParser = require('body-parser');

const app = express();

// use express.static to serve “documentation.html” file from the public folder
app.use(express.static('public'));

//library Morgan middleware fct to log all requests
app.use(morgan('common'));

//library body-parser middleware fct to interpret request body data
app.use(bodyParser.json());


let movies = [ {
  id: '1',
  title : "The Shawshank Redemption",
  description : 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  genre : 'Drama',
  director : 'Frank Darabont',
  imagePath : '',
  featured : 'true'
},
{
  id : '2',
  title : 'The Godfather',
  description : 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  genre : 'Crime',
  director : 'Francis Ford Coppola',
  imagePath : '',
  featured : 'true'
},
{
  id : '3',
  title : 'The Dark Knight',
  description : 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  genre : 'Action',
  director : 'Christopher Nolan',
  imagePath : '',
  featured : 'true'
},
{
  id : '4',
  title: 'The Godfather: Part II',
  description: 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.',
  genre : 'Crime',
  director: ' Francis Ford Coppola',
  imagePath : '',
  featured : 'true'
},
{
  id : '5',
  title : 'The Lord of the Rings: The Return of the King',
  description : 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.',
  genres : 'Adventure',
  director : 'Peter Jackson',
  imagePath : '',
  featured : 'true'
},
{
  id : '6',
  title : 'Pulp Fiction',
  description : 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
  genres : 'Crime',
  director : 'Quentin Tarantino',
  imagePath : '',
  featured : 'true'
},
{
  id : '7',
  title : 'Schindler\'s List',
  description : 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
  genres : 'Biography',
  director : 'Steven Spielberg',
  imagePath : '',
  featured : 'true'
},
{
  id : '8',
  title : ' 12 Angry Men',
  description : 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.',
  genre : 'Crime',
  director : 'Sidney Lumet',
  imagePath : '',
  featured : 'true'
},
{
  id: '9',
  title: 'The Lion King',
  description : 'Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny. But not everyone in the kingdom celebrates the new cub\'s arrival. Scar, Mufasa\'s brother—and former heir to the throne—has plans of his own. The battle for Pride Rock is ravaged with betrayal, tragedy and drama, ultimately resulting in Simba\'s exile. With help from a curious pair of newfound friends, Simba will have to figure out how to grow up and take back what is rightfully his.',
  genre : 'Computer animated',
  director: 'Jon Favreau',
  imagePath : '',
  featured : 'true'
},
{
  id: '10',
  title: 'Spiderman, Far From Home',
  description : 'Peter Parker and his friends go on a summer trip to Europe. However, they will hardly be able to rest - Peter will have to agree to help Nick Fury uncover the mystery of creatures that cause natural disasters and destruction throughout the continent.',
  genre : 'Action',
  director:'Jon Watts',
  imagePath : '',
  featured : 'true'
}
];

let genres = [

  {
      name : 'Adventure',
      description : 'Adventure films are a genre of film that typically use their action... '
  },
  {
      name : 'Drama',
      description : 'Dramas are serious, plot-driven presentations, portraying realistic characters,... '
  },
  {
      name : 'Crime',
      description : 'Crime films, in the broadest sense, are a film genre inspired by and ... '
  },
  {
      name : 'Computer animated',
      description : 'Computer animation is the process used for digitally generating animated images... '
  },
  {
      name : 'Action',
      description : 'Action films usually include high energy, big-budget physical stunts and chases, ... '
  },
  {
      name : 'Biography',
      description : 'is a film that dramatizes the life of a non-fictional or historically-based person or people'
  }
];

let directors = [ {
    name : 'Frank Darabont',
    bio : 'Frank Árpád Darabont is a Hungarian-American film director, screenwriter and producer who has been nominated for three Academy Awards and a Golden Globe Award. ',
    birth: '1959',
    death: ' '
  },
  {
      name : 'Francis Ford Coppola',
      bio :  'Francis Ford Coppola is an American retired film director, producer, screenwriter, and film composer.',
      birth: '1939',
      death: ' '
  },
  {
      name : 'Steven Spielberg',
      bio :  'Steven Allan Spielberg is considered one of the… most popular directors and producers in film history.',
      birth: '1946',
      death: ' '
  },
  {
      name : 'Christopher Nolan',
      bio :  'Christopher Edward Nolan CBE is a British-American filmmaker known for making personal, distinctive films within the Hollywood mainstream. ',
      Birth: '1970',
      death: ' '
  },
  {
      name : 'Peter Jackson',
      bio :  'Sir Peter Robert Jackson ONZ KNZM is a New Zealand film director, screenwriter, occasional actor and film producer.',
      Birth: '1961',
      death: ' '
  },
  {
      name : 'Sidney Lumet',
      bio :  'Sidney Arthur Lumet was an American director, producer, and screenwriter with over 50 films to his credit.',
      Birth: '1924',
      death: '2011',
  },
  {
      name : 'Quentin Tarantino',
      bio :  'Quentin Jerome Tarantino is an American film director, screenwriter, …, born in Queens, New York.',
      Birth: '1963',
      death: ''
  },
  {
      name : 'Jon Favreau',
      bio :  'Jonathan Favreau is an American actor, director, producer, and screenwriter.',
      Birth: '1966',
      death: ''
  },
  {
      name : 'Jon Watts',
      bio :  'Jon Watts is an American film director, producer, and screenwriter.',
      Birth: '1981',
      death: ''
  }
  ];

  let users = [ {
  id : '0',
  username : 'azheng',
  password : 'zhengman',
  email : 'zhengman@yahoo.com',
  birthday : '1991-11-11',
  favorites : ['9']
  }
];

//GET requests

//Gets data about all movies
app.get("/movies", function(req, res) {
  res.send("Successful GET request returning data about all movies.");
});

// Gets the data about a single movie, by title
app.get("/movies/:title", (req, res) => {
  res.send("Successful GET request returning data about a single movie.");
});

// Gets the data about a single genre, by name
app.get("/genre/:name", (req, res) => {
  res.send("Successful GET request returning data about a movie genre.");
});


// Gets the data about a single director, by name
app.get("/director/:name", (req, res) => {
  res.send("Successful GET request returning data about a director.");
});

//POST requests

//Posts a new user
app.post('/users', (req, res) => {
  let newUser = req.body;
  if (!newUser.username) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// add a favorite movie to a user's list of favorites
app.post("/favorites/:username/:title", (req, res) => {
  res.send("add favorite movie by user.");
});

//PUT requests
// Update a user's information
app.put("/users/:username/:password/:email/:dateofbirth", (req, res) => {
  res.send("User information updated.");
});

//DELETE requests

// Deletes a movie from a user's favorites list by username
app.delete("/favorites/:username/:title", (req, res) => {
  res.send("Movie successfully deleted from favorites.");
});

// Deletes a user from the user registry
app.delete("/users/:username", (req, res) => {
  res.send("User successfully deleted from registry.");
});

//Error-logging function:
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("There has been an error.");
});

// listen for requests
app.listen(8080, () => console.log("Your app is listening on port 8080."));
