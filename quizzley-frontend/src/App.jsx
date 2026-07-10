import { useState, useEffect } from 'react';
import LoginPage from './LoginPage';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import MyQuizzesPage from './components/MyQuizzesPage';
import ResultsPage from './components/ResultsPage';
import ViewResultPage from './components/ViewResultPage';
import ProfilePage from './components/ProfilePage';
import AdminDashboardPage from './components/AdminDashboardPage';
import AdminAnalyticsPage from './components/AdminAnalyticsPage';
import AdminQuizzesPage from './components/AdminQuizzesPage';
import AdminUsersPage from './components/AdminUsersPage';
import AdminQuizManagersPage from './components/AdminQuizManagersPage';
import AdminNotificationsPage from './components/AdminNotificationsPage';
import AdminSettingsPage from './components/AdminSettingsPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role') || 'STUDENT');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [lastResult, setLastResult] = useState(null);

  const isAdmin = role === 'ADMIN';
  const [profile, setProfile] = useState({
    name: isAdmin ? 'System Admin' : 'Eleanor Vance',
    studentId: isAdmin ? 'ADMIN-0001' : 'QZ-2024-8931',
    department: isAdmin ? 'Administration' : 'Computer Science & Engineering',
    major: isAdmin ? 'System Manager' : 'Software Engineering, B.S.',
    email: isAdmin ? 'admin@quizzley.com' : 'e.vance@student.quizzley.edu',
    avatar: ''
  });

  useEffect(() => {
    const isCurrentAdmin = role === 'ADMIN';
    setProfile({
      name: isCurrentAdmin ? 'System Admin' : 'Eleanor Vance',
      studentId: isCurrentAdmin ? 'ADMIN-0001' : 'QZ-2024-8931',
      department: isCurrentAdmin ? 'Administration' : 'Computer Science & Engineering',
      major: isCurrentAdmin ? 'System Manager' : 'Software Engineering, B.S.',
      email: isCurrentAdmin ? 'admin@quizzley.com' : 'e.vance@student.quizzley.edu',
      avatar: ''
    });
  }, [role]);

  useEffect(() => {
    if (!token || role !== 'STUDENT') return;
    const fetchActualProfile = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/student/dashboard/summary', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          if (data.profile) {
            setProfile(prev => ({
              ...prev,
              name: data.profile.fullName || prev.name,
              studentId: data.profile.studentId || prev.studentId,
              department: data.profile.specialization || prev.department,
              major: data.profile.specialization || prev.major,
              email: data.profile.email || prev.email
            }));
          }
        }
      } catch (err) {
        console.error("Failed to load actual student profile:", err);
      }
    };
    fetchActualProfile();
  }, [token, role]);

  const handleLoginSuccess = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole || localStorage.getItem('role') || 'STUDENT');
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole('STUDENT');
    setCurrentPage('dashboard');
  };

  if (!token) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onLogout={handleLogout} 
        role={role}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {currentPage === 'dashboard' && (
          (role === 'ADMIN' || role === 'QUIZ_MANAGER') ? (
            <AdminDashboardPage setCurrentPage={setCurrentPage} role={role} />
          ) : (
            <DashboardPage 
              setCurrentPage={setCurrentPage} 
              profile={profile}
            />
          )
        )}
        {currentPage === 'quizzes' && (
          role === 'QUIZ_MANAGER' ? (
            <AdminQuizzesPage setCurrentPage={setCurrentPage} />
          ) : role === 'ADMIN' ? (
            <div className="p-8 text-slate-500 font-semibold text-sm">Quizzes are managed in the Quiz Manager portal.</div>
          ) : (
            <MyQuizzesPage 
              setCurrentPage={setCurrentPage} 
              setLastResult={setLastResult} 
              profile={profile}
            />
          )
        )}
        {currentPage === 'results' && (
          <ResultsPage 
            setCurrentPage={setCurrentPage} 
            lastResult={lastResult} 
            profile={profile}
          />
        )}
        {currentPage === 'view-result' && (
          <ViewResultPage 
            setCurrentPage={setCurrentPage} 
            lastResult={lastResult} 
            profile={profile}
          />
        )}
        {currentPage === 'profile' && (
          <ProfilePage 
            profile={profile}
            setProfile={setProfile}
          />
        )}
        {currentPage === 'users' && (role === 'ADMIN' || role === 'QUIZ_MANAGER') && (
          <AdminUsersPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'quiz-managers' && role === 'ADMIN' && (
          <AdminQuizManagersPage />
        )}
        {currentPage === 'analytics' && (role === 'ADMIN' || role === 'QUIZ_MANAGER') && (
          <AdminAnalyticsPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'notifications' && (role === 'ADMIN' || role === 'QUIZ_MANAGER') && (
          <AdminNotificationsPage />
        )}
        {currentPage === 'settings' && (role === 'ADMIN' || role === 'QUIZ_MANAGER') && (
          <AdminSettingsPage />
        )}
      </main>
    </div>
  );
}

export default App;
