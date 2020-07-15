import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';

import "./profile-view.scss";

export function ProfileView(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthDate] = useState("");

    const updateUserInfo = (e) => {
        e.preventDefault();
        const { user, token } = props;
        const userURL = "https://cors-anywhere.herokuapp.com/https://cors-anywhere.herokuapp.com/users/" + user;

        axios.put(userURL, {

            Username: username,
            Password: password,
            Email: email,
            BirthDate: birthdate

        }, {
            headers: { Authorization: `Bearer ${token}` }

        })
            .then(response => {
                const data = response.data;
                console.log(data) // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch((e) => {
                console.log("error registering the user");
            });
    }

    const { user, token } = props;
    return (
        <Container className="registrationForm">
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={user.Username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={user.Password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={user.Email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBasicDob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" value={user.BirthDate} onChange={e => setBirthDate(e.target.value)} />
                </Form.Group>
                <Button onClick={updateUserInfo}>Update Info</Button>
            </Form>
        </Container>
    );
}
