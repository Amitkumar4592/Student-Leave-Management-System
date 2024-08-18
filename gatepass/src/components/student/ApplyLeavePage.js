import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './STYLES/ApplyLeavePage.css';

const ApplyLeavePage = () => {
    const [leaveDescription, setLeaveDescription] = useState('');
    const [leaveDays, setLeaveDays] = useState('');
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const email = localStorage.getItem('userEmail'); // Retrieve email from local storage
                if (!email) {
                    setError('No email found.');
                    setLoading(false);
                    return;
                }

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

    const handleApplyLeave = async () => {
        if (!leaveDescription || !leaveDays) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/applyLeave', {
                name: student.name,
                rollNumber: student.rollno,
                class: student.class,
                leaveDescription,
                leaveDays
            });
            alert('Leave applied successfully!');
            navigate('/student/studentdashboard');
        } catch (error) {
            console.error('Error applying leave:', error);
            alert('Error applying leave. Please try again.');
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
            <form>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={leaveDescription}
                        onChange={(e) => setLeaveDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Number of Days:</label>
                    <input
                        type="number"
                        value={leaveDays}
                        onChange={(e) => setLeaveDays(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleApplyLeave}>Submit Leave Request</button>
            </form>
        </div>
    );
};

export default ApplyLeavePage;
