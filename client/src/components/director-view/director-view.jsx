import React from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export function DirectorView(props) {
    const { movie } = props;
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="movie-view">
                        <div className="movie-title">
                            <span className="label">Name: </span>
                            <span className="value">{movie.director.name}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Biography: </span>
                            <span className="value">{movie.director.bio}</span>
                        </div>

                        <div className="movie-genre">
                            <span className="label">BirthDate: </span>
                            <span className="value">{movie.director.birth}</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
