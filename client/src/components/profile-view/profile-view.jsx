import React from "react";
//Routing
import axios from "axios";
import { Link } from "react-router-dom";
//Styling
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
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
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  deleteUser() {
    event.preventDefault();
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
    axios
      .delete(
        `https://desolate-forest-59381.herokuapp.com/users/${username}/Movies/${movies._id}`,
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
    const { favoriteMovies } = this.state;
    return (

      <div>
        <Container>
          <h1>My Profile</h1>
          <br />
          <Card>
            <Card.Body>
              <Card.Text>Username: {this.state.username}</Card.Text>
              <Card.Text>Password: xxxxxx</Card.Text>
              <Card.Text>Email: {this.state.email}</Card.Text>
              <Card.Text>Birthday {this.state.birthday}</Card.Text>
              <Card.Text>Favorite Movies:

                {this.state.favoriteMovies === 0 &&
                  <div className="value">No Favorite Movies have been added</div>
                }
                {this.state.favoriteMovies > 0 &&
                  <ul>
                    {this.state.favoriteMovies.map(favoriteMovie =>
                      (<li key={favoriteMovie}>
                        <p className="favoriteMovies">
                          {JSON.parse(localStorage.getItem('movies')).find(movie => movie._id === favoriteMovie).Title}
                        </p>
                        <Link to={`/movies/${favoriteMovie}`}>
                          <Button size="sm" variant="info">Open</Button>
                        </Link>
                        <Button variant="secondary" size="sm" onClick={(event) => this.deleteMovieFromFavs(event, favoriteMovie)}>
                          Delete
                        </Button>
                      </li>)
                    )}
                  </ul>
                }

            </Card.Text>
              <br />
              <br />
              <Link to={"/update/:Username"}>
                <Button variant="primary">Update Profile</Button>
                <br />
                <br />
              </Link>
              {/* <Button onClick={deleteUser}>Delete User</Button> */}
              <br />
              <br />
              <Link to={`/`}>Back</Link>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
