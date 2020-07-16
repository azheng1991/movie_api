import React from 'react';
//Routing
import axios from 'axios';
import { Link } from 'react-router-dom';
//Styling
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
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
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
    }
    getUser(token) {
        const username = localStorage.getItem('user');
        axios
            .get(`https://desolate-forest-59381.herokuapp.com/users/${username}`, {
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

    deleteFavoriteMovie(movieId) {
        axios.delete(`https://desolate-forest-59381.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${movieId}`, {
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
        axios.delete(`https://desolate-forest-59381.herokuapp.com/users/${localStorage.getItem('user')}`, {
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



    render() {
        const { movies } = this.state;
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
              {this.state.favoriteMovies.length === 0 && <p>You have no favorite movies.</p>}
                            {this.state.favoriteMovies.map((FavoriteMovies) => (
                                <div key={movie._id} className="fav-movies-button">
                                    <Link to={`/movies/${movie._id}`}>
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
                            <Button onClick={deleteUser()}>Delete User</Button>
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
