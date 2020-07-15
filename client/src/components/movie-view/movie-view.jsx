import React from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import "./movie-view.scss"

export function MovieView(props) {

    const { movie, previous } = props;

    if (!movie) return null;

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="movie-view">
                        <img className="movie-poster" style={{ textAlign: "center" }} src={movie.image} />
                        <div className="movie-title">
                            <span className="label">Title: </span>
                            <span className="value">{movie.title}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.description}</span>
                        </div>

                        <div className="movie-genre">
                            <span className="label">Genre: </span>
                            <span className="value">{movie.genre.name}</span>
                        </div>
                        <div className="movie-director">
                            <span className="label">Director: </span>
                            <span className="value">{movie.director.name}</span>
                        </div>
                        <Button variant="primary" className="back-button" onClick={() => previous(movie)}>
                            Back</Button>
                        <Link to={"/genres/" + movie.genre.name}>
                            <Button variant="link">Genre</Button>
                        </Link>
                        <Link to={"/directors/" + movie.director.name}>
                            <Button variant="link">Director</Button>
                        </Link>
                    </div>
                </Col>
            </Row>

        </Container>

    );
}
