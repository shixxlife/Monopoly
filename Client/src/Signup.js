import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => {
        console.log(result);
        navigate('/login');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-container">
      <h1>Monopoly Sign Up</h1>
      
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Create Account
        </button>

        <div className="social-login">
          <button type="button" className="social-btn">
            Sign up with Gmail
          </button>
          <button type="button" className="social-btn">
            Sign up with Google Play
          </button>
          <button type="button" className="social-btn">
            Sign up with Apple
          </button>
        </div>
      </form>

      <div className="links">
        <h4>Already have an account?
          <Link to='/login'> Login</Link>
        </h4>
      </div>
    </div>
  );
};

export default SignUp;
