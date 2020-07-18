import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        addFavoriteMovie(movieId) {

            axios.post(`https://desolate-forest-59381.herokuapp.com/users/${Username}/Movies/${MovieID}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
                .then(() => {
                alert('Movie successfully added to favorites');
            })

                .catch(e => {
                    alert('Movie could not be added to favorites ' + e);
                });
        }

        deleteFavoriteMovie(event, movieId) {
            event.preventDefault();
            axios.delete(`https://desolate-forest-59381.herokuapp.com/users/${username}/Movies/${movieId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(() => {
                    alert('Movie successfully deleted from favorites');
                })
                .catch(e => {
                    alert('Movie could not be deleted from favorites ' + e)
                });
        }




        return (
            <Card style={{ width: '16rem' }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                    <div key={movie._id} className="fav-movies-button">
                        <Link to={`/movies/:movie._id`}>
                            <Button variant="link">Add to Favorite Movies</Button>
                        </Link>
                        <Button size="sm" onClick={(e) => this.deleteFavoriteMovie(movie._id)}>
                            Remove Favorite
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    };
};
