
import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export class GenreView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { genre } = this.props;
        return (
            <div
                className="container-fluid align-items-center ml-3 mt-2"
                style={{ width: "660px" }}
            >
                <div className="genre-title">
                    <h1>{genre.Name}</h1>
                </div>
                <div className="genre-description">
                    <div className="mt-1 mb-3">{genre.Description}</div>
                </div>
                <Link to={`/`}>
                    <Button className="mt-3" variant="primary">
                        Back to Movies
          </Button>
                </Link>
            </div>
        );
    }
}
