import React, { useState } from 'react';
import LoginPage from './LoginPage';
import Sidebar from './components/Sidebar';
import DashboardPage from './components/DashboardPage';
import MyQuizzesPage from './components/MyQuizzesPage';
import ResultsPage from './components/ResultsPage';
import ViewResultPage from './components/ViewResultPage';
import ProfilePage from './components/ProfilePage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [lastResult, setLastResult] = useState(null);

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
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
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {currentPage === 'dashboard' && (
          <DashboardPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === 'quizzes' && (
          <MyQuizzesPage 
            setCurrentPage={setCurrentPage} 
            setLastResult={setLastResult} 
          />
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
      </main>
    </div>
  );
}

export default App;
