import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        //Call the superclass constructor
        // so React can initialize it
        super();

        // Initialize the state to an empty object so we can destructure it later
        this.state = {
            movie: null,
            selectedMovie: null
        };
    }

    //One fot the "hooks" available in a react component
    componentDidMount() {
        axios
            .get('https://desolate-forest-59381.herokuapp.com/movies')
            .then(response => {
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

    onBackClick(movie) {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        // If the state isn't initialized, this will throw on runtime
        // before the data is initially loaded
        const { movies, selectedMovie } = this.state;

        //Before the movies have been loaded
        if (!movies) return <div className='main-view' />;

        return (
            <div className='main-view'>
                {selectedMovie ? (
                    <MovieView
                        movie={selectedMovie}
                        onClick={button => this.onBackClick()}
                    />
                ) : (
                        movies.map(movie => (
                            <MovieCard
                                key={movie._id}
                                movie={movie}
                                onClick={movie => this.onMovieClick(movie)}
                            />
                        ))
                    )}
            </div>
        );
    }
}
