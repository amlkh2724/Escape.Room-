import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import './Login.css'
import { LoggedUserContext } from '../../components/context/context';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerMode, setRegisterMode] = useState(false);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const { loggedUser, setLoggedUser, SetOnline } = LoggedUserContext()
  const [timeElapsed, setTimeElapsed] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

  };
  useEffect(() => {
    SetOnline(false)
  }, []);
  const handleSubmit = async (event) => {
    SetOnline(true)
    event.preventDefault();
    if (registerMode) {

      setTimeElapsed(null);
    } else {
      const response = await api.get('/escape');
      if (response.data.length > 0) {
        const user = response.data.find((u) => u.username === username && u.password === password);
        if (user) {
          console.log("userinformation", user);
          setLoggedIn(true);
          setLoggedUser(user)
          localStorage.setItem('loggedUser', user.username);
          localStorage.setItem('userID', user.id)
          localStorage.setItem('user', JSON.stringify(user));

          console.log(loggedUser);
        } else {
          setRegisterMode(false);
          console.log('Invalid username or password');
          setError('Invalid username or password');
        }
      } else {
        setRegisterMode(false);
        console.log('Invalid username or password');
        setError('Invalid username or password');
      }
    }
  };

  return (
    <div className='container'>
      <div className="thall">
        <h1 className='underLineStyle'>Escape Room Game</h1>
        <h4>{error}</h4>
        <form>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter your username" />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
          <br />
          <button className='fixButtonStyle' onClick={handleSubmit}>Login</button>
          {!loggedIn && registerMode ? (
            <p>
              { }
            </p>
          ) : (
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          )}
          {loggedIn && (
            <p>
              You are now logged in! <Link to="/home">Go to home page</Link>
            </p>
          )}
        </form>
      </div>




    </div>
  );
}

export default Login;

