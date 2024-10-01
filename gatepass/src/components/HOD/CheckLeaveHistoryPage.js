import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/CheckLeaveHistoryPage.css'; // Importing the CSS file

const CheckLeaveHistoryPage = () => {
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaveHistory = async () => {
            try {
                const response = await axios.get('http://localhost:3000/hod/leaveHistory');
                setLeaveHistory(response.data);
            } catch (error) {
                console.error('Error fetching leave history:', error);
                setError('Error fetching leave history. Please try again later.');
            } finally {
                setLoading(false); // Ensure loading is false in both success and error cases
            }
        };

        fetchLeaveHistory();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="leave-history-container">
            <h1>Leave History</h1>
            <ul className="leave-history-list">
                {leaveHistory.length === 0 ? (
                    <li className="no-leave-request">No leave requests found.</li>
                ) : (
                    leaveHistory.map((request) => (
                        <li key={request._id} className="leave-request-item">
                            <p><strong>Name:</strong> {request.name}</p>
                            <p><strong>Roll Number:</strong> {request.rollNumber}</p>
                            <p><strong>Class:</strong> {request.class}</p>
                            <p><strong>Leave Description:</strong> {request.leaveDescription}</p>
                            <p><strong>Leave Days:</strong> {request.leaveDays}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            <p><strong>Applied Date:</strong> {new Date(request.appliedDate).toLocaleDateString()}</p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default CheckLeaveHistoryPage;
