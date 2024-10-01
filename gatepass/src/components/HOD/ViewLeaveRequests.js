import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/ViewLeaveRequests.css'; // Import the CSS file for styling

const ViewLeaveRequests = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const hodDepartment = localStorage.getItem('department'); // Retrieve HOD's department from localStorage

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await axios.get('http://localhost:3000/hod/viewLeaveRequests', {
                    params: { department: hodDepartment } // Pass HOD's department as query parameter
                });
                // Only display leave requests with status "Forward"
                const filteredRequests = response.data.filter(request => request.status === 'forward');
                setLeaveRequests(filteredRequests);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching leave requests:', error);
                setError('Error fetching leave requests. Please try again later.');
                setLoading(false);
            }
        };

        fetchLeaveRequests();
    }, [hodDepartment]);

    const handleUpdateRequest = async (requestId, action) => {
        try {
            await axios.post('http://localhost:3000/hod/updateLeaveRequest', {
                requestId,
                action: action === 'accept' ? 'acceptedbyhod' : 'rejectedbyhod'
            });
            setLeaveRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== requestId)
            );
        } catch (error) {
            console.error('Error updating leave request:', error);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="leave-requests-container">
            <h1>Leave Requests for {hodDepartment} Department</h1>
            <ul className="leave-requests-list">
                {leaveRequests.map((request) => (
                    <li key={request._id} className="leave-request-item">
                        <p><strong>Name:</strong> {request.name}</p>
                        <p><strong>Roll Number:</strong> {request.rollNumber}</p>
                        <p><strong>Leave Description:</strong> {request.leaveDescription}</p>
                        <p><strong>Leave Days:</strong> {request.leaveDays}</p>
                        <p><strong>Status:</strong> {request.status}</p>
                        <div className="button-group">
                            <button onClick={() => handleUpdateRequest(request._id, 'accept')} className="action-button accept-button">Accept</button>
                            <button onClick={() => handleUpdateRequest(request._id, 'reject')} className="action-button reject-button">Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewLeaveRequests;
