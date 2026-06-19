import { useState } from 'react';
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

  const handleLoginSuccess = (newToken, newRole) => {
    setToken(newToken);
    setRole(newRole || localStorage.getItem('role') || 'STUDENT');
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
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
            <DashboardPage setCurrentPage={setCurrentPage} />
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
            />
          )
        )}
        {currentPage === 'results' && (
          <ResultsPage 
            setCurrentPage={setCurrentPage} 
            lastResult={lastResult} 
          />
        )}
        {currentPage === 'view-result' && (
          <ViewResultPage 
            setCurrentPage={setCurrentPage} 
            lastResult={lastResult} 
          />
        )}
        {currentPage === 'profile' && (
          <ProfilePage />
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
