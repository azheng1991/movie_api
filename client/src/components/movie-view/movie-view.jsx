import React from 'react';
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
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <div className="button">
                    <button onClick={goBack}> Back </button>
                </div>
                <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">Director</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">Genre</Button>
                </Link>
            </div>
        );
    }
}
