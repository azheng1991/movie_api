import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();

        // Initialize the state to an empty object so we can destructrue it later
        this.state = {
            movies: null,
            selectedMovie: null
        };
    }

    componentDidMount() {
        axios.get('https://desolate-forest-59381.herokuapp.com/movies')
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

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    // this overrides the render() method of the superclass
    render() {

        // Before data is initially loaded
        const { movies, selectedMovie } = this.state;

        // Before movies have been loaded
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} />
                    : movies.map(movie => (
                        <MovieCard key={movie.id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                    ))
                }
            </div>
        );
    }
}
