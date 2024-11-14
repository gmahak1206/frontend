import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/auth/signup', { username, password, email })
      .then(response => {
        alert('User registered successfully');
        axios.post('http://localhost:5000/api/auth/login', { username, password })
          .then(loginResponse => {
            onRegister(loginResponse.data.token); // Pass the JWT token back to App
          });
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Registration failed');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
