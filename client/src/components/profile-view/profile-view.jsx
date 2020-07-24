import React from "react";
//Routing
import axios from "axios";
import { Link } from "react-router-dom";
//Styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from 'react-bootstrap/Spinner'


export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: null,
    };
  }
  componentDidMount() {
    const userToken = localStorage.getItem("token");
    this.getUser(userToken);
  }
  getUser(token) {
    const user = localStorage.getItem("user");
    axios
      .get(`https://desolate-forest-59381.herokuapp.com/users/${user}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          userData: res.data
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  deleteUser(event, username) {
    // if you are going to use this, event needs to be one of the arguments. just typing event means nothing
    event.preventDefault();
    axios
      .delete(`https://desolate-forest-59381.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        alert("User successfully deleted from registry");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = `/`;
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
        this.getUser(this.state.userData);
      })
      .catch((e) => {
        alert("Movie could not be deleted from favorites " + e);
      });
  }
  render() {
    // by destructuring you dont need to use this.state for these below
    const { movies } = this.props;
    const { userData }=this.state

    //add a loading element during the data fetching with axios. try adding a spinner or loading icon in its place
    if (!userData)
      return (

       <center>
       <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      </center>

      );
    return (
      <Container>
        <h1>My Profile</h1>
        <br />
        <Card>
          <Card.Body>
          <Card.Text>Username: {this.state.userData.Username}</Card.Text>
            <Card.Text>Password: xxxxxx</Card.Text>
            <Card.Text>Email: {this.state.userData.Email}</Card.Text>
            <Card.Text>Birthday: {this.state.userData.BirthDate}</Card.Text>

            <Card.Text>
              Favorite Movies:
              {userData.FavoriteMovies.length === 0 && (
                'No Favorite Movies have been added.'
              )}
              {/* you need to check the length of the array */}
              {userData.FavoriteMovies.length > 0 && (
                <ul>
                  {userData.FavoriteMovies.map((favoriteMovie) => (
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
            <Button onClick={() => this.deleteUser(event, userData.Username)}>
              Delete User
            </Button>
            <br />
            <br />
            <Link to={`/`}>Back</Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
