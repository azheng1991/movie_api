import React, { useState } from 'react';
//Routing
import axios from 'axios';
// import { Link } from 'react-router-dom';
//Styling
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView(props) {
    const [username, createUsername] = useState('');
    const [password, createPassword] = useState('');
    const [email, createEmail] = useState('');
    const [birthday, createDob] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('https://desolate-forest-59381.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday,
            })
            .then((response) => {
                const data = response.data;
                alert('Your account has been created! Please login');
                console.log(data);
                window.open('/client', '_self');
            })
            .catch((e) => {
                console.log('error registering the user');
            });
    };

    return (
        <Container style={{ width: '42rem' }}>
            <Form>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => createUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => createPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => createEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We will never share your information with anyone
          </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicDob">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="12/31/1999"
                        value={birthday}
                        onChange={(e) => createDob(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        label="Confirm you really want to register for myFlix"
                    />
                </Form.Group>
                <Button type="submit" onClick={handleSubmit}>
                    Register
        </Button>{' '}
                {/* <Link to={'/login'}>
          <Button>Go to Login</Button>
        </Link> */}
            </Form>
        </Container>
    );
}
