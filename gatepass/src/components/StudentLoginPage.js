import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin() {
    axios.post('http://localhost:3000/login', { email, password, type: 2 })
      .then(response => {
        console.log(response.data);
        // Store user data in local storage (or a more secure method)
        localStorage.setItem('userEmail', email);
        navigate('/student/studentdashboard'); // Redirect to dashboard upon successful login
      })
      .catch(error => {
        console.error('Login error:', error.response.data);
        alert('Invalid credentials');
      });
  }

  return (
    <div className="login-card">
      <h1>Student Login</h1>
      <input
        type="email"
        placeholder="User ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default StudentLoginPage;
