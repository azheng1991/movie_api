import React from 'react';

export class MovieCard extends React.Component {
    render() {
        // This is given to the <MovieCard/> component by the outer world
        // which, in this case, is `MainView`, as `MainView` is what’s
        // connected to your database via the movies endpoint of your API
        const { movie } = this.props;

        return <div className='movie-card'>{movie.Title}</div>;
    }
}
