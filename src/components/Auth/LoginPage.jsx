import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    loginUser(name.trim(), selectedRole);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setName('');
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">ExamHub</h1>
        
        {!selectedRole ? (
          <div className="role-selection">
            <p className="subtitle">Select your role to continue</p>
            <button 
              className="role-button admin-button"
              onClick={() => handleRoleSelection('admin')}
            >
              Login as Admin
            </button>
            <button 
              className="role-button student-button"
              onClick={() => handleRoleSelection('student')}
            >
              Login as Student
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <p className="form-subtitle">
              Login as {selectedRole === 'admin' ? 'Admin' : 'Student'}
            </p>
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="form-input"
                autoFocus
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-group">
              <button type="button" onClick={handleBack} className="back-button">
                Back
              </button>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
