import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './STYLES/StudentDashboard.css';

const StudentDashboard = () => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
            if (!email) {
                setError('No email found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/studentData', {
                    params: { email }
                });
                setStudent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setError('Error fetching student data. Please try again later.');
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const handleApplyLeave = () => {
        navigate('/student/applyleave');
    };

    const handleCheckLeaveStatus = () => {
        navigate('/student/leavestatus');
    };

    const handleViewLeaveHistory = () => {
        navigate('/student/leavehistory');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!student) {
        return <div>No student data found.</div>;
    }

    return (
        <div className="dashboard-container">
            <h1>Student Dashboard</h1>
            <div className="student-info">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll Number:</strong> {student.rollno}</p>
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
