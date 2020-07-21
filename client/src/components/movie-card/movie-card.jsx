import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link } from "react-router-dom";
export class MovieCard extends React.Component {


    addFavoriteMovie(movieData) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: `https://desolate-forest-59381.herokuapp.com/users/${username}/Movies/${movieData._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert("Movie successfully added to favorites");
      })
      .catch((e) => {
        alert("Movie could not be added to favorites " + e);
      });
  }
  render() {
    const { movie, user } = this.props;
    return (

<Card style={{ width: "20rem", height: "50rem" }}>;
<Card.Img variant="top" src={movie.ImagePath} />
<Card.Body>
  <Card.Title>{movie.Title}</Card.Title>
  <Card.Text>{movie.Description}</Card.Text>
  <Link to={`/movies/${movie._id}`}>
    <Button variant="link">Open</Button>
  </Link>
  <Button size="sm" onClick={(e) => this.addFavoriteMovie(movie)}>
    Add Favorite
  </Button>
</Card.Body>
</Card>



    );
  }
}
