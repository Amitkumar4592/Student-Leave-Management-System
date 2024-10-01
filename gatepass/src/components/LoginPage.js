import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css'; // Make sure to import the CSS file

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    navigate(`/${selectedRole.toLowerCase()}`); 
  };

  const handleRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600); // Remove ripple after animation
  };

  return (
    <div className="login-card">
      <h1>Select Your Role</h1>
      <button className="role-button" onClick={(e) => { handleRipple(e); handleRoleSelect('HOD'); }}>HOD</button>
      <button className="role-button" onClick={(e) => { handleRipple(e); handleRoleSelect('student'); }}>STUDENT</button>
      <button className="role-button" onClick={(e) => { handleRipple(e); handleRoleSelect('teacher'); }}>TEACHER</button>
    </div>
  );
};

export default LoginPage;
