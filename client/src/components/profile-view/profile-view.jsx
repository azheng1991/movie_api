import React from 'react';
//Routing
import axios from 'axios';
import { Link } from 'react-router-dom';

//Styling
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const deleteUser = () => {
    window.open('/', '_self');
}

const Models = require("movie_api/models.js");
const users = Models.User;


export class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: [],
            movies: [],
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
                this.setState({
                    Username: res.data.Username,
                    Password: res.data.Password,
                    Email: res.data.Email,
                    Birthday: res.data.Birthday,
                    FavoriteMovies: res.data.FavoriteMovies,
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        const { movies } = this.props;
        const favoriteMovieList = users.filter((FavoriteMovie) =>
            this.state.favoriteMovies.includes(movie._id)
        );
        return (
            <div>
                <Container>
                    <h1>My Profile</h1>
                    <br />
                    <Card>
                        <Card.Body>
                            <Card.Text>Username: {this.state.Username}</Card.Text>
                            <Card.Text>Password: xxxxxx</Card.Text>
                            <Card.Text>Email: {this.state.Email}</Card.Text>
                            <Card.Text>Birthday {this.state.Birthday}</Card.Text>
              Favorite Movies:
              {favoriteMovieList.map((FavoriteMovie) => (
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
                            <Button onClick={deleteUser}>Delete User</Button>
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
