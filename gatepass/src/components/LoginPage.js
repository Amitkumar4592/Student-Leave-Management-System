import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    navigate(`/${selectedRole.toLowerCase()}`);  // Make sure this line uses backticks
  };

  return (
    <div className="login-card">
      <h1>Select Your Role</h1>
      <button className="role-button" onClick={() => handleRoleSelect('HOD')}>HOD</button>
      <button className="role-button" onClick={() => handleRoleSelect('student')}>STUDENT</button>
      <button className="role-button" onClick={() => handleRoleSelect('teacher')}>TEACHER</button>
    </div>
  );
};

export default LoginPage; 