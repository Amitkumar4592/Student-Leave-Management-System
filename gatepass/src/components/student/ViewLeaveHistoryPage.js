import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './STYLES/ViewLeaveHistoryPage.css'; 

const ViewLeaveHistoryPage = () => {
    const [leaveHistory, setLeaveHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaveHistory = async () => {
            const email = localStorage.getItem('userEmail');
            if (!email) {
                setError('No email found.');
                setLoading(false);
                return;
            }
        
            try {
                const response = await axios.get('http://localhost:3000/leaveHistory', {
                    params: { email }
                });
                setLeaveHistory(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching leave history. Please try again later.');
                setLoading(false);
            }
        };
        
        fetchLeaveHistory();
    }, []);

    const handleLogout = () => {
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!leaveHistory.length) {
        return <div>No leave history found.</div>;
    }

    return (
        <div className="view-leave-history-container">
            <h1>Leave History</h1>
            <div className="leave-history-table-container">
                <table className="leave-history-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Leave Days</th>
                            <th>Status</th>
                            <th>Applied Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveHistory.map((request, index) => (
                            <tr key={index}>
                                <td>{request.leaveDescription}</td>
                                <td>{request.leaveDays}</td>
                                <td>{request.status}</td>
                                <td>{new Date(request.appliedDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ViewLeaveHistoryPage;
