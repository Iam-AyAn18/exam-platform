import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import ExamTaker from '../components/Student/ExamTaker';
import ExamResults from '../components/Student/ExamResults';
import './StudentPage.css';

const StudentPage = () => {
  const { currentUser, logoutUser } = useAuth();
  const { getPublishedPapers, currentExam, getExamResults } = useExam();
  const [selectedExam, setSelectedExam] = useState(null);
  const [viewingResult, setViewingResult] = useState(null);
  
  const publishedPapers = getPublishedPapers();
  const studentResults = getExamResults(currentUser.id);

  const handleLogout = () => {
    logoutUser();
  };

  const handleStartExam = (paper) => {
    setSelectedExam(paper);
  };

  const handleExamComplete = (result) => {
    setSelectedExam(null);
    setViewingResult(result);
  };

  const handleViewResult = (result) => {
    setViewingResult(result);
  };

  const handleBackToDashboard = () => {
    setSelectedExam(null);
    setViewingResult(null);
  };

  // Show exam taker if exam is in progress
  if (selectedExam || currentExam) {
    return (
      <ExamTaker 
        paper={selectedExam}
        onComplete={handleExamComplete}
        onCancel={handleBackToDashboard}
      />
    );
  }

  // Show exam results if viewing a result
  if (viewingResult) {
    return (
      <ExamResults 
        result={viewingResult}
        onBack={handleBackToDashboard}
        onRetake={() => {
          const paper = publishedPapers.find(p => p.id === viewingResult.paperId);
          if (paper) {
            setViewingResult(null);
            handleStartExam(paper);
          }
        }}
      />
    );
  }

  return (
    <div className="student-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <h1 className="navbar-logo">ExamHub</h1>
          <div className="navbar-right">
            <span className="navbar-user">Student: {currentUser.name}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="student-content">
        {/* Greeting */}
        <div className="greeting-section">
          <h2 className="greeting">Welcome, {currentUser.name}!</h2>
          <p className="greeting-subtitle">Select an exam to get started</p>
        </div>

        {/* Available Exams Section */}
        <section className="exams-section">
          <h2 className="section-title">Available Exams</h2>
          
          {publishedPapers.length === 0 ? (
            <div className="empty-state">
              <p>No exams available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="exams-grid">
              {publishedPapers.map(paper => (
                <div key={paper.id} className="exam-card">
                  <div className="exam-header">
                    <h3 className="exam-name">{paper.name}</h3>
                    <span className={`difficulty-badge ${paper.difficulty.toLowerCase()}`}>
                      {paper.difficulty}
                    </span>
                  </div>
                  
                  <div className="exam-details">
                    <div className="detail-row">
                      <span className="detail-icon">📚</span>
                      <span>{paper.subject}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-icon">❓</span>
                      <span>{paper.questions?.length || 0} Questions</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-icon">⏱️</span>
                      <span>{paper.timeLimit} Minutes</span>
                    </div>
                  </div>

                  <button 
                    className="start-exam-button"
                    onClick={() => handleStartExam(paper)}
                  >
                    Start Exam
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* My Results Section */}
        {studentResults.length > 0 && (
          <section className="results-section">
            <h2 className="section-title">My Results</h2>
            
            <div className="results-table">
              <div className="table-header">
                <div className="th">Test Name</div>
                <div className="th">Score</div>
                <div className="th">Percentage</div>
                <div className="th">Date</div>
                <div className="th">Time Spent</div>
                <div className="th">Actions</div>
              </div>
              
              {studentResults.map(result => (
                <div key={result.id} className="table-row">
                  <div className="td">{result.paperName}</div>
                  <div className="td">{result.score} / {result.totalMarks}</div>
                  <div className="td">
                    <span className={`percentage-badge ${result.percentage >= 40 ? 'pass' : 'fail'}`}>
                      {result.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="td">
                    {new Date(result.submittedAt).toLocaleDateString()}
                  </div>
                  <div className="td">
                    {Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s
                  </div>
                  <div className="td">
                    <button 
                      className="view-details-button"
                      onClick={() => handleViewResult(result)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default StudentPage;
