import React from 'react';
//Routing
import axios from 'axios';
import { Link } from 'react-router-dom';
//Styling
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


export class ProfileView extends React.Component {
    constructor() {
        super();
    };
}
componentDidMount() {


    addFavoriteMovie(movieId) {

        axios.post(`https://desolate-forest-59381.herokuapp.com/users/:Username/Movies/:MovieID}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(() => {
                document.location.reload(true);
            })
            .then(() => {
                alert('Movie successfully added to favorites');
            })

            .catch(e => {
                alert('Movie could not be added to favorites ' + e)
            });
    }

}

deleteFavoriteMovie(movieId) {

    axios.delete(`https://desolate-forest-59381.herokuapp.com/users/:Username/Movies/:MovieID`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
        .then(() => {
            document.location.reload(true);
        })
        .then(() => {
            alert('Movie successfully deleted from favorites');
        })

        .catch(e => {
            alert('Movie could not be deleted from favorites ' + e)
        });
}

deleteUser() {

    axios.delete(`https://desolate-forest-59381.herokuapp.com/users/:Username`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
        .then(() => {
            document.location.reload(true);
        })
        .then(() => {
            alert('User successfully deleted from registry');
        })

        .catch(e => {
            alert('User could not be deleted from registry ' + e)
        });
}
}



render() {

    // const favoriteMovieList = users.filter((FavoriteMovie) =>
    //     this.state.favoriteMovies.includes(movie._id)
    // );

    const { user } = this.props

    return (
        <div>
            <Container>
                <h1>My Profile</h1>
                <br />
                <Card>
                    <Card.Body>
                        <Card.Text>Username: {this.props.user.Username}</Card.Text>
                        <Card.Text>Password: xxxxxx</Card.Text>
                        <Card.Text>Email: {this.props.user.Email}</Card.Text>
                        <Card.Text>Birthday {this.props.user.Birthday}</Card.Text>
              Favorite Movies:
              if (this.props.user.FavoriteMovies.length === 0) {
                            <p>You have no favorite movies.</p>}
                        {/* return an array of the favoriteMovies using the map function on the FavoriteMovies state   */}
                    else {this.props.user.FavoriteMovies.map((FavoriteMovie) => (
                            <div key={movie._id} className="fav-movies-button">
                                <Link to={`/movies/:movie._id`}>
                                    <Button variant="link">{movie.Title}</Button>
                                </Link>
                                <Button
                                    size="sm"
                                    onClick={(e) => this.deleteFavoriteMovie(movie._id)}
                                >
                                    Remove Favorite
                  </Button>
                            </div>
                        ))}
                        <br />
                        <br />
                        <Link to={'/update/:Username'}>
                            <Button variant="primary">Update Profile</Button>
                            <br />
                            <br />
                        </Link>
                        <Button onClick={this.deleteUser()}>Delete User</Button>
                        <br />
                        <br />
                        <Link to={`/`}>Back</Link>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
}
