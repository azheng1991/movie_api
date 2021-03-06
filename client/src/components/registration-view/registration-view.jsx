import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import { Link } from "react-router-dom";

import "./registration-view.scss";

export const RegistrationView = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [favoritemovies, setFavoriteMovies] = useState("");

  /**
   * Register a new user
   * @function handleSubmit
   * @axios
   * @param {string} username
   * @param {string} password
   * @param {string} email
   * @param {date} dob
   */
    const handleSubmit = (e) => {
        e.preventDefault();

        const registerUrl = "https://desolate-forest-59381.herokuapp.com/users";
        axios.post(registerUrl, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthdate,
        })
            .then(response => {
                const data = response.data;
                window.open("/client", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch((e) => {
                console.log("error registering the user");
            })
    };

    return (



        <Container className="registrationForm">
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="emailShare">
                        We"ll never share your email with anyone else.
          </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicDob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" value={birthdate} onChange={e => setBirthDate(e.target.value)} />
                </Form.Group>


                <Form.Group controlId="formBasicChecbox">
                    <Form.Check type="checkbox" label="Check to make sure you're not a robot" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Register
        </Button>
                <Form.Text className="text-bold">
                    Already have an account? Log in <Link to={"/"}>HERE</Link>
                </Form.Text>
            </Form>
        </Container>


    )
}
