import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './STYLES/ApplyLeavePage.css';

const ApplyLeavePage = () => {
    const [student, setStudent] = useState({});
    const [leaveDescription, setLeaveDescription] = useState('');
    const [leaveDays, setLeaveDays] = useState('');

    useEffect(() => {
        // Fetch student data from the backend
        axios.get('http://localhost:3000/studentData', { params: { email: 'student@example.com' } })
            .then(response => {
                setStudent(response.data);
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    }, []);

    const handleApplyLeave = () => {
        axios.post('http://localhost:3000/applyLeave', {
            name: student.name,
            rollNumber: student.rollNumber,
            class: student.class,
            leaveDescription,
            leaveDays
        })
            .then(response => {
                alert('Leave applied successfully!');
                setLeaveDescription('');
                setLeaveDays('');
            })
            .catch(error => {
                console.error('Error applying leave:', error);
                alert('Failed to apply leave.');
            });
    };

    return (
        <div className="apply-leave-container">
            <h1>Apply for Leave</h1>
            <div className="student-info">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                <p><strong>Class:</strong> {student.class}</p>
            </div>
            <div className="form-group">
                <label>Leave Description:</label>
                <textarea
                    value={leaveDescription}
                    onChange={(e) => setLeaveDescription(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Number of Leave Days:</label>
                <input
                    type="number"
                    value={leaveDays}
                    onChange={(e) => setLeaveDays(e.target.value)}
                />
            </div>
            <button className="apply-button" onClick={handleApplyLeave}>Apply Leave</button>
        </div>
    );
};

export default ApplyLeavePage;
