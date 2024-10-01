import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeacherData = async () => {
            const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
            if (!email) {
                setError('No email found.');
                setLoading(false);
                return;
            }

            try {
                await axios.get('http://localhost:3000/teacherData', {
                    params: { email }
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
                setError('Error fetching teacher data. Please try again later.');
                setLoading(false);
            }
        };

        fetchTeacherData();
    }, []);

    const handleViewLeaveRequests = () => {
        navigate('/teacher/viewleaverequests');
    };

    const handleSearchStudent = () => {
        navigate('/teacher/searchstudent');
    };

    const handleLogout = () => {
        localStorage.removeItem('userEmail'); // Clear email from local storage
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h1>Teacher Dashboard</h1>
            <div className="actions">
                <button className="dashboard-button" onClick={handleViewLeaveRequests}>View Leave Requests</button>
                <button className="dashboard-button" onClick={handleSearchStudent}>Search Student</button>
                <button className="dashboard-button logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default TeacherDashboard;
