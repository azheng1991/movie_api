import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export class DirectorView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { director } = this.props;
        return (
            <div
                className="container-fluid align-items-center ml-3 mt-2"
                style={{ width: "660px" }}
            >
                <div className="director-title">
                    <h1>{director.Name}</h1>
                </div>
                <div className="director-bio mt-1 mb-3">Bio: {director.Bio}</div>
                <div className="director-birth">Born: {director.Birth}</div>
                <div className="director-birth">Death: {director.Death}</div>
                <Link to={`/`}>
                    <Button className="mt-3" variant="primary">
                        Back to Movies
          </Button>
                </Link>
            </div>
        );
    }
}
