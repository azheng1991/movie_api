import React from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';


export function GenreView(props) {
    const { movie } = props;
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="genre-view">

                        <div className="movie-title">
                            <span className="label">Genre: </span>
                            <span className="value">{movie.Genre.Name}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Genre.Description}</span>
                        </div>
                        <Link to={`/movies/${movie._id}`}>
                            <Button variant="link" className="Back Button">Back</Button>
                          </Link>


                    </div>
                </Col>
            </Row>
        </Container>
    );
}
