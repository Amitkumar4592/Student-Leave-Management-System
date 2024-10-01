import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './STYLES/LeaveStatusPage.css';

const LeaveStatusPage = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const email = localStorage.getItem('userEmail');

                if (!email) {
                    setError('No email found. Please log in again.');
                    setLoading(false);
                    return;
                }

                const studentResponse = await axios.get('http://localhost:3000/studentData', {
                    params: { email }
                });

                setStudent(studentResponse.data);

                const leaveResponse = await axios.get('http://localhost:3000/studentLeaveRequests', {
                    params: { email }
                });

                if (Array.isArray(leaveResponse.data)) {
                    setLeaveRequests(leaveResponse.data);
                } else {
                    setError('Unexpected data format from server.');
                }
                setLoading(false);
            } catch (error) {
                setError('Error fetching leave requests. Please try again later.');
                setLoading(false);
            }
        };

        fetchLeaveRequests();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="leave-status-container">
            <h1>Leave Status for {student?.name}</h1>
            {leaveRequests.length === 0 ? (
                <p className="no-requests">No leave requests found.</p>
            ) : (
                <ul className="leave-request-list">
                    {leaveRequests.map((request, index) => (
                        <li key={index} className={`leave-request ${request.status.toLowerCase()}`}>
                            <div className="request-date">
                                {new Date(request.appliedDate).toLocaleDateString()}
                            </div>
                            <div className="request-description">
                                {request.leaveDescription}
                            </div>
                            <div className="request-status">
                                Status: <span>{request.status}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LeaveStatusPage;
