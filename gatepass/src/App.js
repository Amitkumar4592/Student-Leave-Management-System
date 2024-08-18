import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HODLoginPage from './components/HODLoginPage';
import StudentLoginPage from './components/StudentLoginPage';
import TeacherLoginPage from './components/TeacherLoginPage';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import HODDashboard from './components/HOD/HODDashboard';
import StudentDashboard from './components/student/Studentdashboard';
import ApplyLeavePage from './components/student/ApplyLeavePage';
import OfflineMessage from './components/OfflineMessage';

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
          <Route path="/" element={<LoginPage />} />
          <Route path="/hod" element={<HODLoginPage />} />
          <Route path="/hod/dashboard" element={<HODDashboard />} />
          <Route path="/student" element={<StudentLoginPage />} />
          <Route path="/student/studentdashboard" element={<StudentDashboard />} />
          <Route path="/student/applyleave" element={<ApplyLeavePage />} />
          <Route path="/teacher" element={<TeacherLoginPage />} />
          <Route path="/teacher/teacherdashboard" element={<TeacherDashboard />} />
          {/* Add additional routes for leave status and leave history here */}
        </Routes>
      </Router>
      {isOnline ? null : <OfflineMessage isOnline={isOnline} />}
    </div>
  );
};

export default App;
