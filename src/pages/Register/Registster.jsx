import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            const response = await api.get('/escape');
            const foundUser = response.data.find(
                (checkLogin) => checkLogin.username === username
            );

            if (foundUser) {
                setError('Username or password is already taken. Please choose a different one.');
                return;
            }

            const foundPassword = response.data.find(
                (checkLogin) => checkLogin.password === password
            );

            if (foundPassword) {
                setError('Username or password is already taken. Please choose a different one.');
                return;
            }

            await api.post('/escape', {
                username: username,
                password: password,
            });
            setIsRegistered(true);
        } catch (error) {
            console.error(error);
        }
    };

    if (isRegistered) {
        return (
            <div>
                <h1>Registration Successful!</h1>
                <p>You can now <Link to="/">login</Link> with your new account.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Register</h1>
            {error && <p>{error}</p>}
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
