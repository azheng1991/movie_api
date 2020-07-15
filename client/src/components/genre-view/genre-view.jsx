
import React from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function GenreView(props) {
    const { movie } = props;
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="genre-view">

                        <div className="movie-title">
                            <span className="label">Genre: </span>
                            <span className="value">{movie.genre.name}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.genre.description}</span>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    );
}
