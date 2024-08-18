import React from 'react';
import { useNavigate } from 'react-router-dom';
import './STYLES/StudentDashboard.css'; // Import the CSS file

const StudentDashboard = () => {
    const navigate = useNavigate();

    const student = {
        name: 'John Doe',
        rollNumber: '12345',
        class: '10th Grade'
    };

    const handleApplyLeave = () => {
        navigate('/student/applyleave');
    };

    const handleCheckLeaveStatus = () => {
        navigate('/student/leavestatus');
    };

    const handleViewLeaveHistory = () => {
        navigate('/student/leavehistory');
    };

    return (
        <div className="dashboard-container">
            <h1>Student Dashboard</h1>
            <div className="student-info">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                <p><strong>Class:</strong> {student.class}</p>
            </div>
            <div className="actions">
                <button className="dashboard-button" onClick={handleApplyLeave}>Apply for Leave</button>
                <button className="dashboard-button" onClick={handleCheckLeaveStatus}>Check Leave Status</button>
                <button className="dashboard-button" onClick={handleViewLeaveHistory}>View Leave History</button>
            </div>
        </div>
    );
};

export default StudentDashboard;
