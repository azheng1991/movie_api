import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import Button from 'react-bootstrap/Button';

export class MainView extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            user: null,
            register: false
        };
    }

    getMovies = (token) => {
        const endpoint = "https://cors-anywhere.herokuapp.com/https://desolate-forest-59381.herokuapp.com/movies";
        axios.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount = () => {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
                userData: localStorage.getItem('data')
            });
            this.getMovies(accessToken);
        }
    }

    onMovieClick = (movie) => {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn = (authData) => {
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLogOut = () => {
        this.setState({
            user: null,
            register: null
        });

        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    render() {
        const { movies, user } = this.state;

        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                <Router>

                    <Container>
                        <Link to={"/profile"}>
                            <Button variant="link">Profile</Button>
                        </Link>
                        <Row>
                            <Route exact path="/" render={() => {
                                if (!user) {
                                    return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                }
                                return movies.map(m => {
                                    return (
                                        <Col key={m._id} xs={12} sm={6} md={4}>
                                            <MovieCard key={m._id} movie={m} />
                                            <Button onClick={this.onLogOut}>back</Button>
                                        </Col>
                                    );
                                })
                            }
                            } />
                            <Route exact path="/register" render={() => {
                                return <RegistrationView />
                            }} />
                            <Route exact path="/movies/:movieId" render={({ match }) => {
                                return (
                                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                                )

                            }
                            } />
                            <Route exact path="/genres/:name" render={({ match }) => {
                                return (
                                    <GenreView movie={movies.find(m => m.genre.name === match.params.name)} />
                                )
                            }} />
                            <Route exact path="/directors/:name" render={({ match }) => {
                                return (
                                    <DirectorView movie={movies.find(m => m.director.name === match.params.name)} />
                                )
                            }} />

                            <Route exact path="/profile" render={() => {
                                return (
                                    <ProfileView user={user} token={localStorage.getItem("token")} />
                                )
                            }} />
                        </Row>
                    </Container>
                </Router>


            </div>
        );
    }
}
