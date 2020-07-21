import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const goBack = () => {
    window.open('/', '_self');
}

export class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movie, onClick } = this.props;

        if (!movie) return null;

        return (
            <div className="movie-view">
                <img className="movie-poster" src={movie.ImagePath} />
                <div className="movie-title">
                    <span class="label">Title: </span>
                    <span class="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span class="label"> Description: </span>
                    <span class="value">{movie.Description}</span>
                </div>
                <div className="genre button">
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button variant="link">Genre</Button>
                    </Link>
                </div>
                <div className="director button">
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">Director</Button>
                    </Link>
                </div>

                    <button size="sm" onClick={goBack}> Back </button>


            </div >
        );
    }
}
