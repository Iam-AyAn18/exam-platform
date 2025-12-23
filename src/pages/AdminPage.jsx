import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import TestPaperForm from '../components/Admin/TestPaperForm';
import QuestionEditor from '../components/Admin/QuestionEditor';
import './AdminPage.css';

const AdminPage = () => {
  const { currentUser, logoutUser } = useAuth();
  const { testPapers, deleteTestPaper, updateTestPaper, examResults } = useExam();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogout = () => {
    logoutUser();
  };

  const handleDeletePaper = (id, paperName) => {
    if (window.confirm(`Are you sure you want to delete "${paperName}"?`)) {
      deleteTestPaper(id);
      showSuccess('Test paper deleted successfully!');
    }
  };

  const handleTogglePublish = (paper) => {
    updateTestPaper(paper.id, { published: !paper.published });
    showSuccess(`Test paper ${!paper.published ? 'published' : 'unpublished'} successfully!`);
  };

  const handleEditPaper = (paper) => {
    setSelectedPaper(paper);
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const totalQuestions = testPapers.reduce((sum, paper) => sum + (paper.questions?.length || 0), 0);
  const totalExamsTaken = examResults.length;

  if (selectedPaper) {
    return (
      <QuestionEditor 
        paper={selectedPaper} 
        onClose={() => setSelectedPaper(null)}
        onSuccess={showSuccess}
      />
    );
  }

  return (
    <div className="admin-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-logo">ExamHub</h1>
          <div className="navbar-right">
            <span className="navbar-user">Admin: {currentUser.name}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="admin-content">
        {/* Success Message */}
        {successMessage && (
          <div className="success-alert">
            {successMessage}
          </div>
        )}

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-number">{testPapers.length}</div>
            <div className="stat-label">Test Papers Created</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalQuestions}</div>
            <div className="stat-label">Total Questions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{totalExamsTaken}</div>
            <div className="stat-label">Exams Taken</div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="actions-section">
          <button 
            className="create-button"
            onClick={() => setShowCreateModal(true)}
          >
            + Create New Test Paper
          </button>
          <button className="analytics-button">
            View Analytics
          </button>
        </div>

        {/* Test Papers List */}
        <div className="papers-section">
          <h2 className="section-title">Test Papers List</h2>
          
          {testPapers.length === 0 ? (
            <div className="empty-state">
              <p>No test papers created yet. Click "Create New Test Paper" to get started!</p>
            </div>
          ) : (
            <div className="papers-grid">
              {testPapers.map(paper => (
                <div key={paper.id} className="paper-card">
                  <div className="paper-header">
                    <h3 className="paper-name">{paper.name}</h3>
                    <span className={`difficulty-badge ${paper.difficulty.toLowerCase()}`}>
                      {paper.difficulty}
                    </span>
                  </div>
                  
                  <div className="paper-details">
                    <div className="detail-item">
                      <span className="detail-label">Subject:</span>
                      <span className="detail-value">{paper.subject}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Questions:</span>
                      <span className="detail-value">{paper.questions?.length || 0}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Time Limit:</span>
                      <span className="detail-value">{paper.timeLimit} minutes</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Published:</span>
                      <span className={`status-badge ${paper.published ? 'published' : 'draft'}`}>
                        {paper.published ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  <div className="paper-actions">
                    <button 
                      className="edit-button"
                      onClick={() => handleEditPaper(paper)}
                    >
                      Edit Questions
                    </button>
                    <button 
                      className={`publish-button ${paper.published ? 'unpublish' : ''}`}
                      onClick={() => handleTogglePublish(paper)}
                    >
                      {paper.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeletePaper(paper.id, paper.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <TestPaperForm 
          onClose={() => setShowCreateModal(false)}
          onSuccess={showSuccess}
        />
      )}
    </div>
  );
};

export default AdminPage;
