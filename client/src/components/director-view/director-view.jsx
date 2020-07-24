import React from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



export function DirectorView(props) {
    const { movie } = props;
    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <div className="movie-view">
                        <div className="movie-title">
                            <span className="label">Name: </span>
                            <span className="value">{movie.Director.Name}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Biography: </span>
                            <span className="value">{movie.Director.Bio}</span>
                        </div>

                        <div className="movie-genre">
                            <span className="label">BirthDate: </span>
                            <span className="value">{movie.Director.Birth}</span>
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
