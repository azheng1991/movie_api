import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";



export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        function addFavoriteMovie(movie._id) {

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

        return (
            <Card style={{ width: '16rem' }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                    <Button size="sm" onClick={(e) => this.addFavoriteMovie(movie._id)}>
                        Add Favorite
                        </Button>
                    </div>
                </Card.Body>
            </Card >
        );
    };
};
