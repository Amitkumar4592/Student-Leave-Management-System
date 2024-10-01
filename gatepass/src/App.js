import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HODLoginPage from './components/HODLoginPage';
import StudentLoginPage from './components/StudentLoginPage';
import TeacherLoginPage from './components/TeacherLoginPage';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import HODDashboard from './components/HOD/HODDashboard';
import Studentdashboard from './components/student/Studentdashboard';
import ApplyLeavePage from './components/student/ApplyLeavePage';
import LeaveStatusPage from './components/student/LeaveStatusPage'; 
import ViewLeaveHistoryPage from './components/student/ViewLeaveHistoryPage';
import ViewLeaveRequests from './components/teacher/ViewLeaveRequests';
import SearchStudent from './components/teacher/SearchStudent';
import CheckLeaveHistoryPage from './components/HOD/CheckLeaveHistoryPage';
import ViewHODLeaveRequests from './components/HOD/ViewLeaveRequests'; // Import the HOD's View Leave Requests component
import OfflineMessage from './components/OfflineMessage'; // Handle offline status

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  return (
    <div> 
      <Router>
        <Routes>
          {/* Common Login Pages */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/hod" element={<HODLoginPage />} />
          <Route path="/student" element={<StudentLoginPage />} />
          <Route path="/teacher" element={<TeacherLoginPage />} />

          {/* Student Routes */}
          <Route path="/student/studentdashboard" element={<Studentdashboard />} />
          <Route path="/student/applyleave" element={<ApplyLeavePage />} />
          <Route path="/student/leavestatus" element={<LeaveStatusPage />} />
          <Route path="/student/leavehistory" element={<ViewLeaveHistoryPage />} />

          {/* Teacher Routes */}
          <Route path="/teacher/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/viewleaverequests" element={<ViewLeaveRequests />} />
          <Route path="/teacher/searchstudent" element={<SearchStudent />} />

          {/* HOD Routes */}
          <Route path="/hod/dashboard" element={<HODDashboard />} />
          <Route path="/hod/viewleaverequests" element={<ViewHODLeaveRequests />} />
          <Route path="/hod/history" element={<CheckLeaveHistoryPage />} />
          <Route path="/hod/searchstudent" element={<SearchStudent />} />
        </Routes>
      </Router>
      {!isOnline && <OfflineMessage />} {/* Show the offline message if not online */}
    </div>
  );
};

export default App;
