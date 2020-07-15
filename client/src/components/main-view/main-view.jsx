import React from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();

        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            register: false,
        };
    }

    componentDidMount() {

        getMovies(token) {
            axios.get('https://desolate-forest-59381.herokuapp.com/movies', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    // Assign the result to the state
                    this.setState({
                        movies: response.data
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


        onMovieClick = (movie) => {
            this.setState({
                selectedMovie: movie,
            });
        }

        onLoggedIn(authData) {
            console.log(authData);
            this.setState({
                user: authData.user.Username
            });

            localStorage.setItem('token', authData.token);
            localStorage.setItem('user', authData.user.Username);
            this.getMovies(authData.token);
        }

        //button to return to all movies view
        onButtonClick = () => {
            this.setState({
                selectedMovie: null,
            });
        }

        //testing
        onSignedIn = (username) => {
            this.setState({
                user: user,
                register: false,
            });
        }



        onRegister = () => {
            this.setState({ register: true });
        }

        onUserRegister = () => {
            this.setState({ register: false });
        }



        render() {
            const { movies, selectedMovie, user, register } = this.state;

            if (!user && !register) {
                return (
                    <LoginView
                        onClick={this.onRegister}
                        onLoggedIn={this.onLoggedIn}
                    />
                );
            }

            if (register && !user) {
                return (
                    <RegistrationView
                        onSignedIn={this.onUserRegister}
                    />
                );
            }

            //before the movies has been loaded
            if (!movies) return <div className="main-view" />;
            return (
                <div className="main-view">
                    <Container>
                        <Row>
                            {selectedMovie ? (
                                <MovieView
                                    movie={selectedMovie}
                                    onClick={this.onButtonClick}
                                />
                            ) : (
                                    movies.map((movie) => (
                                        <Col key={movie._id} xs={10} sm={2} md={5}>
                                            <MovieCard
                                                key={movie._id}
                                                movie={movie}
                                                onClick={this.onMovieClick}
                                            />
                                        </Col>
                                    ))
                                )}
                        </Row>
                    </Container>
                </div>
            );
        }
    }
