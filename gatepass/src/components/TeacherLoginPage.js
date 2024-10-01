import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/TeacherLoginPage.css'; 

const TeacherLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin() {
    axios.post('http://localhost:3000/login', { email, password, type: 3 })
      .then(async response => {
        console.log(response.data);
        localStorage.setItem('teacherClass', response.data.class); // Store teacher's class in local storage
        navigate('/teacher/teacherdashboard'); // Redirect to dashboard upon successful login
      })
      .catch(error => {
        console.error('Login error:', error.response.data);
        alert('Invalid credentials');
      });
  }

  return (
    <div className="login-card">
      <h1>Teacher Login</h1>
      <input
        type="email"
        placeholder="Teacher ID"
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

export default TeacherLoginPage;
