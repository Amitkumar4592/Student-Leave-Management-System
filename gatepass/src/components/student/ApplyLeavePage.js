import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './STYLES/ApplyLeavePage.css';

const ApplyLeavePage = () => {
    const [leaveDescription, setLeaveDescription] = useState('');
    const [leaveDays, setLeaveDays] = useState('');
    const [department, setDepartment] = useState('');
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [applyError, setApplyError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                const response = await axios.get('http://localhost:3000/studentData', {
                    params: { email }
                });
                setStudent({ ...response.data, email });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setError('Error fetching student data. Please try again later.');
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const handleApplyLeave = async () => {
        if (!leaveDescription || !leaveDays || leaveDays <= 0 || !department) {
            setApplyError('Please fill in all fields and ensure leave days is a positive number.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/applyLeave', {
                name: student.name,
                rollNumber: student.rollno,
                studentClass: student.class,
                department,
                email: student.email,
                leaveDescription,
                leaveDays
            });
            setSuccessMessage('Leave applied successfully!');
            setLeaveDescription('');
            setLeaveDays('');
            setDepartment('');
            setApplyError(null);
            navigate('/student/studentdashboard');
        } catch (error) {
            console.error('Error applying leave:', error);
            setApplyError('Error applying leave. Please try again later.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="apply-leave-container">
            <h1>Apply for Leave</h1>
            <form className="leave-form">
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={leaveDescription}
                        onChange={(e) => setLeaveDescription(e.target.value)}
                        className="form-textarea"
                        placeholder="Enter leave description..."
                    />
                </div>
                <div className="form-group">
                    <label>Number of Days:</label>
                    <input
                        type="number"
                        value={leaveDays}
                        onChange={(e) => setLeaveDays(e.target.value)}
                        className="form-input"
                        placeholder="Enter number of days..."
                    />
                </div>
                <div className="form-group">
                    <label>Department:</label>
                    <input
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="form-input"
                        placeholder="Enter your department..."
                    />
                </div>
                {applyError && <p className="error-message">{applyError}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <button type="button" onClick={handleApplyLeave} className="submit-button">Submit Leave Request</button>
            </form>
        </div>
    );
};

export default ApplyLeavePage;
