import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from "react-router-dom";



export class MovieCard extends React.Component {
    render() {
        const { movie, user } = this.props;

        function addFavoriteMovie(burrito) {

            axios.post(`https://desolate-forest-59381.herokuapp.com/users/${user}/Movies/${movie._id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
                .then(() => {
                    alert('Movie successfully added to favorites');
                })

                .catch(e => {
                    alert('Movie could not be added to favorites ' + e);
                })
        };

        return (
            <Card style={{ width: '16rem' }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                    <Button size="sm" onClick={(e) => addFavoriteMovie(movie._id)}>
                        Add Favorite
                        </Button>
                </Card.Body>
            </Card >
        );
    };
};
