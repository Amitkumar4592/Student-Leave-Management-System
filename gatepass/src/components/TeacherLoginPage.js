import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   if (email === 'asha' && password === '123') {
  //     navigate('/security/dashboard'); // Redirect to SecurityDashboard after successful login
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // };
  function handleLogin() {
    axios.post('http://localhost:3000/login', { email, password , type : 3 })
        .then(response => {
            console.log(response.data);
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

export default TeacherLoginPage;