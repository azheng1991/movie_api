import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./login-view.scss";

export function LoginView(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let loginUrl = "https://desolate-forest-59381.herokuapp.com/login";

        axios.post(loginUrl, null, {
            params: {
                Username: username,
                Password: password
            }
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                alert('no such user')
            })

    };

    return (
        <Container className="login-form">
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
        </Button>
                <Form.Text className="text-muted">
                    New user? Sign up for an account <Link to={"/register"}>HERE</Link>
                </Form.Text>
            </Form>
        </Container>
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}
