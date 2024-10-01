import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewLeaveRequests.css';

const ViewLeaveRequests = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const teacherClass = localStorage.getItem('teacherClass') || ''; // Retrieve from local storage

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            if (teacherClass) {
                console.log('Fetching leave requests for class:', teacherClass);
                try {
                    const response = await axios.get('http://localhost:3000/viewLeaveRequests', {
                        params: { class: teacherClass }
                    });

                    console.log('Leave requests response:', response.data);
                    const pendingRequests = response.data.filter(request => request.status === 'Pending');
                    setLeaveRequests(pendingRequests);
                } catch (error) {
                    console.error('Error fetching leave requests:', error);
                    setError('Error fetching leave requests. Please try again later.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false); // Stop loading if there's no class
            }
        };

        fetchLeaveRequests();
    }, [teacherClass]);
    
    const handleUpdateRequest = async (requestId, action) => {
        try {
            await axios.post('http://localhost:3000/updateLeaveRequest', {
                requestId,
                action // can be "accept", "reject", or "forward"
            });

            // Update the local state to remove the request
            setLeaveRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== requestId) // Remove the updated request
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
            <h1 className="title">Leave Requests for {teacherClass}</h1>
            {leaveRequests.length === 0 ? (
                <p className="no-requests">No pending leave requests.</p>
            ) : (
                <ul className="leave-requests-list">
                    {leaveRequests.map((request) => (
                        <li key={request._id} className="request-card">
                            <p><strong>Name:</strong> {request.name}</p>
                            <p><strong>Roll Number:</strong> {request.rollNumber}</p>
                            <p><strong>Leave Description:</strong> {request.leaveDescription}</p>
                            <p><strong>Leave Days:</strong> {request.leaveDays}</p>
                            <p><strong>Status:</strong> {request.status}</p>
                            <div className="button-group">
                                <button className="action-button accept" onClick={() => handleUpdateRequest(request._id, 'accept')}>Accept</button>
                                <button className="action-button reject" onClick={() => handleUpdateRequest(request._id, 'reject')}>Reject</button>
                                <button className="action-button forward" onClick={() => handleUpdateRequest(request._id, 'forward')}>Forward to HOD</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewLeaveRequests;
