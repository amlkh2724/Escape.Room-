import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import './Register.css';

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
                timerElapsed:null
            });
            setIsRegistered(true);
        } catch (error) {
            console.error(error);
        }
    };

    if (isRegistered) {
        return (
            <div className="container">
                <h1 className="title">Registration Successful!</h1>
                <p className="message">You can now <Link to="/" className="link">login</Link> with your new account.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="fixAll2">
            <h1 className="underLineStyle2">Register</h1>
            {error && <p className="error">{error}</p>}
            <label className="label">Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" />
            <br />
            <label className="label">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
            <br />
            <button onClick={handleRegister} className="fixButtonStyle">Register</button>
        </div>
        </div>
    );
}

export default Register;
