import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Link } from 'react-router-dom';

const Login = ({setUserName}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
            setUserName(result.data.name);
            navigate('/home');
        }
      })
      .catch((err) => console.log(err));
  };

  

  return (
    <div className="login-container">
      <h1>Monopoly Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Username or Email</label>
        <input
          type="text"
          id="email"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Pass GO!</button>

        <div className="social-login">
          <button type="button" className="social-btn" onClick={() => {}}>
            Sign in with Gmail
          </button>
          <button type="button" className="social-btn" onClick={() => {}}>
            Sign in with Apple
          </button>
        </div>
        </form>

        <div className="links">
        <h5>Dont have an account?
          <Link to='/register'> Signup</Link></h5>
        </div>
      
    </div>
  );
};

export default Login;
