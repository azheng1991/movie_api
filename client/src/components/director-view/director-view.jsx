import React from 'react';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const goBack = () => {
    window.open('/client/movies/:movieId', '_self');
}

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
                        <Button size="sm" onClick={goBack}>
    Back
  </Button>

                    </div>
                </Col>
            </Row>
        </Container>
    );
}
