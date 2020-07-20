import React from "react";
//Routing
import axios from "axios";
import { Link } from "react-router-dom";
//Styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
      movies: [],
      userData: []
    };
  }
  componentDidMount() {
    const userToken = localStorage.getItem("token");
    this.getUser(userToken);
  }
  getUser(token) {
    const user = localStorage.getItem("user");
    axios
      .get(`https://desolate-forest-59381.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          username: res.data.Username,
          password: res.data.Password,
          email: res.data.Email,
          birthday: res.data.Birthday,
          favoriteMovies: res.data.FavoriteMovies,
          movies: res.data.Movies,
          userData: response.data,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  deleteUser(e) {
    e.preventDefault();
    axios
      .delete(`https://desolate-forest-59381.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        alert("User successfully deleted from registry");
      })
      .catch((e) => {
        alert("User could not be deleted from registry " + e);
      });
  }
  deleteFavoriteMovie(event, favoriteMovie) {
    event.preventDefault();
    const user = localStorage.getItem("user");
    axios
      .delete(
        `https://desolate-forest-59381.herokuapp.com/users/${user}/Movies/${favoriteMovie}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then(() => {
        alert("Movie successfully deleted from favorites");
      })
      .catch((e) => {
        alert("Movie could not be deleted from favorites " + e);
      });
  }
  render() {
    // by destructuring you dont need to use this.state for these below
// spent a while trying to u/s this concept, and what I'm seeing is that destructuring allows you to break down an array into variables
// so the correct code should be like this:

// const { movies, favoriteMovies, username } = this.props;

    const { movies } = this.props;
    const { favoriteMovies, username } = this.props;
    //add a loading element during the data fetching with axios. try adding a spinner or loading icon in its place
    if (!username)
      return (
        <div>
          <span>Loading....</span>
        </div>
      );
    return (
      <Container>
        <h1>My Profile</h1>
        <br />
        <Card>
          <Card.Body>
            <Card.Text>Username: {this.state.username}</Card.Text>
            <Card.Text>Password: xxxxxx</Card.Text>
            <Card.Text>Email: {this.state.email}</Card.Text>
            <Card.Text>Birthday {this.state.birthday}</Card.Text>
            <Card.Text>
              Favorite Movies:
              {favoriteMovies.length === 0 && (
                <div className="value">No Favorite Movies have been added</div>
              )}
              {/* you need to check the length of the array */}
              {/* doesn't the .length method check for the length of an array as I have below?
              the logic of this code makes sense to me: in terms of psuedocode:
              1. check if the length of the favoriteMovies array is greater than zero, if so, return no favorite movies above
              2. If the length of the array > 0, then map a new array where each element is the favorite movie that you can click on to get more info about or delete if you wish */}
              {favoriteMovies.length > 0 && (
                <ul>
                  {favoriteMovies.map((favoriteMovie) => (
                    <li key={favoriteMovie}>
                      <span className="favoriteMovies">
                        {
                          movies.find((movie) => movie._id === favoriteMovie)
                            .Title
                        }
                      </span>
                      <Link to={`/movies/${favoriteMovie}`}>
                        <Button size="sm" variant="info">
                          Open
                        </Button>
                      </Link>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(event) =>
                          this.deleteFavoriteMovie(event, favoriteMovie)
                        }
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </Card.Text>
            <br />
            <br />
            <Link to={"/update/:Username"}>
              <Button variant="primary">Update Profile</Button>
              <br />
              <br />
            </Link>
            {/* you had user here which is not defined, pull username out of state. */}
            {/* should be good for the above comment I believe if I implement the commented out code when I destructure, right? */}
            {/* <Button onClick={this.deleteUser(username)}>Delete User</Button> */}
            <br />
            <br />
            <Link to={`/`}>Back</Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
