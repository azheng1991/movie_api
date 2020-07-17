import React from 'react';
//Routing
import axios from 'axios';
import { Link } from 'react-router-dom';
//Styling
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const accessToken = localStorage.getItem('token');
const username = localStorage.getItem('user');
const { movies } = this.state;

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
            // movies: []
        };
    }
    componentDidMount() {
        //authentication
        this.getUser(accessToken);

        getUser(accesstoken) {

            axios
                .get(`https://desolate-forest-59381.herokuapp.com/users/username`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        username: res.data.Username,
                        password: res.data.Password,
                        email: res.data.Email,
                        birthday: res.data.Birthday,
                        favoriteMovies: res.data.FavoriteMovies,
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        addFavoriteMovie(movieId) {

            axios.post(`https://desolate-forest-59381.herokuapp.com/users/username/Movies/{movies_Id}`, {
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

        axios.delete(`https://desolate-forest-59381.herokuapp.com/users/username/Movies/{movieId}`, {
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

        axios.delete(`https://desolate-forest-59381.herokuapp.com/users/username`, {
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
    return (
        <div>
            <Container>
                <h1>My Profile</h1>
                <br />
                <Card>
                    <Card.Body>
                        <Card.Text>Username: {this.state.username}</Card.Text>
                        <Card.Text>Password: xxxxxx</Card.Text>
                        <Card.Text>Email: {this.state.email}</Card.Text>
                        <Card.Text>Birthday {this.state.birthday}</Card.Text>
              Favorite Movies:
              if (this.state.favoriteMovies.length === 0) {
                            <p>You have no favorite movies.</p>}
                        {/* return an array of the favoriteMovies using the map function on the FavoriteMovies state   */}
                    else {this.state.favoriteMovies.map((FavoriteMovies) => (
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
