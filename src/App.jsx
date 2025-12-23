import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExamProvider } from './context/ExamContext';
import LoginPage from './components/Auth/LoginPage';
import AdminPage from './pages/AdminPage';
import StudentPage from './pages/StudentPage';
import './styles/App.css';

const AppContent = () => {
  const { currentUser, isAuthenticated } = useAuth();

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // If authenticated as admin, show admin page
  if (currentUser.role === 'admin') {
    return <AdminPage />;
  }

  // If authenticated as student, show student page
  if (currentUser.role === 'student') {
    return <StudentPage />;
  }

  return null;
};

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <ExamProvider>
          <AppContent />
        </ExamProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
