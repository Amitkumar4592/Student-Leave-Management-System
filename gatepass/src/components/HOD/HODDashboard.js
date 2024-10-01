import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HODDashboard.css'; // Ensure you have a CSS file for styling

const HODDashboard = () => {
    const navigate = useNavigate();

    const handleViewLeaveRequests = () => {
        navigate('/hod/viewleaverequests');
    };

    const handleCheckHistory = () => {
        navigate('/hod/history');
    };

    const handleSearchStudent = () => {
        navigate('/hod/searchstudent');
    };

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data from local storage
        navigate('/'); // Redirect to login page
    };

    return (
        <div className="hod-dashboard-container">
            <h1>HOD Dashboard</h1>
            <div className="actions">
                <button className="dashboard-button" onClick={handleViewLeaveRequests}>
                    View Leave Requests
                </button>
                <button className="dashboard-button" onClick={handleCheckHistory}>
                    Check Leave History
                </button>
                <button className="dashboard-button" onClick={handleSearchStudent}>
                    Search Student
                </button>
                <button className="dashboard-button logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default HODDashboard;
