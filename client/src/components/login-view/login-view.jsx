import React, { useState } from 'react';
import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://desolate-forest-59381.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(username, password);
    //     // Send a request to the server for authentication then call props.onLoggedIn(username)
    //     props.onLoggedIn(username);
    // };

    return (
        <form>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <button type="button" onClick={handleSubmit}>
                Login
            </button>
            <button type="button" onClick={props.onClick}>
                Register
            </button>
        </form>
    );
}
