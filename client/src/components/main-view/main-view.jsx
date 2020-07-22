import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import {BrowserRouter as Router, Route} from "react-router-dom";
import {Link} from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import {MovieCard} from "../movie-card/movie-card";
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {GenreView} from '../genre-view/genre-view';
import {DirectorView} from '../director-view/director-view';
import {ProfileView} from '../profile-view/profile-view';
import {RegistrationView} from '../registration-view/registration-view';
import { UpdateView } from "../profile-view/update-view";



import "./main-view.scss";

class MainView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }



// export class MainView extends Component {
//   constructor() {
//     super();

//     this.state = {
//       movies: [],
//       user: null,
//       register: false,
//     };
//   }


componentDidMount = () => {
  let accessToken = localStorage.getItem("token");
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem("user"),
      userData: localStorage.getItem("data"),
    })
    this.getMovies(accessToken);
  }
};



getMovies(token) {
  axios
    .get('https://desolate-forest-59381.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      // #1
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

  // onMovieClick = (movie) => {
  //   this.setState({
  //     selectedMovie: movie,
  //   })
  // };

  onLoggedIn = (authData) => {
    this.setState({
      user: authData.user.Username,
    })

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  };

  onLogOut = () => {
    this.setState({
      user: null,
    })

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  render() {
    let { movies } = this.props;
    let { user } = this.state;


    if (!movies) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Router basename="/client">
        <Navbar bg="dark" variant="dark">
            <Link to={"/"}>
              <Navbar.Brand className="main-title">MyFlix</Navbar.Brand>
            </Link>
            <Nav className="mr-auto">
            </Nav>
            {user && (
              <div>
                <Link to={"/profile"}>
                  <Button variant="link">Profile</Button>
                </Link>
                <Link to="/">
                  <Button onClick={() => this.onLogOut()}>Log Out</Button>
                </Link>
              </div>
            )}
          </Navbar>


          <Container>
            <Row>
              <Route
                exact
                path="/"
                render={() => {
                  if (!user) {
                    return (
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    );
                  }
                  return movies.map((m) => {
                    return (
                      <Col key={m._id} xs={12} sm={6} md={4}>
                        <MovieCard key={m._id} movie={m} />
                      </Col>
                    );
                  });
                }}
              />
              <Route
                exact
                path="/register"
                render={() => {
                  return <RegistrationView />;
                }}
              />
              <Route
                exact
                path="/movies/:movieId"
                render={({ match }) => {
                  return (
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/genres/:name"
                render={({ match }) => {
                  return (
                    <GenreView
                      movie={movies.find(
                        (m) => m.Genre.Name === match.params.name
                      )}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/directors/:name"
                render={({ match }) => {
                  return (
                    <DirectorView
                      movie={movies.find(
                        (m) => m.Director.Name === match.params.name
                      )}
                    />
                  );
                }}
              />

              <Route
                exact
                path="/profile"
                render={() => {
                  return (
                    <ProfileView
                      user={user}
                      movies={movies}
                      token={localStorage.getItem("token")}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/update/:Username"
                render={() => <UpdateView user={user} />}
              />
            </Row>
          </Container>
        </Router>
      </div>
    );
  }
}


let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);
