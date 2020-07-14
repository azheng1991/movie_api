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
        axios
            .get('https://desolate-forest-59381.herokuapp.com/movies')
            .then((response) => {

                this.setState({
                    movies: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie,

        });
    }

    onLoggedIn(username) {
        this.setState({
            user,

        });
    }

    //button to return to all movies view
    onButtonClick() {
        this.setState({
            selectedMovie: null,
        });
    }

    //testing
    onSignedIn(username) {
        this.setState({
            user: user,
            register: false,
        });
    }

    register() {
        this.setState({ register: true });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (!user && register === false)
            return (
                <LoginView
                    onClick={this.onRegistered()}
                    onLoggedIn={this.onLoggedIn(username)}
                />
            );

        if (register)
            return (
                <RegistrationView
                    onClick={this.alreadyMember()}
                    onSignedIn={this.onSignedIn(username)}
                />
            );

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
                                            onClick={(movie) => this.onMovieClick(movie)}
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
