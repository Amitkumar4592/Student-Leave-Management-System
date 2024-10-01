import React, { useState } from 'react';
import axios from 'axios';
import './SearchStudentPage.css'; 

const SearchStudentPage = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:3000/searchStudent', {
                params: { rollNumber } // Sending the roll number as a parameter
            });
            setStudentData(response.data); // Assuming the response data contains student details
            setError(null); // Clear previous errors
        } catch (err) {
            setStudentData(null); // Clear previous data
            setError(err.response ? err.response.data.message : 'An error occurred');
        }
    };

    return (
        <div className="search-student-container">
            <h1>Search Student</h1>
            <input
                type="text"
                placeholder="Enter Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <div className="error">{error}</div>}
            {studentData && (
                <div className="student-info">
                    <p><strong>Name:</strong> {studentData.name}</p>
                    <p><strong>Roll Number:</strong> {studentData.rollno}</p>
                    <p><strong>Class:</strong> {studentData.class}</p>
                    <p><strong>Email:</strong> {studentData.email}</p>
                </div>
            )}
        </div>
    );
};

export default SearchStudentPage;
