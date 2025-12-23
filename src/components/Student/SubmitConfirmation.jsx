import React from 'react';
import './SubmitConfirmation.css';

const SubmitConfirmation = ({ answeredCount, totalQuestions, timeRemaining, onConfirm, onCancel }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content submit-confirm" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Submit Exam?</h2>
        
        <p className="confirm-message">
          Are you sure you want to submit your exam? This action cannot be undone.
        </p>

        <div className="submit-stats">
          <div className="stat-item">
            <span className="stat-label">Questions Answered:</span>
            <span className="stat-value">{answeredCount} / {totalQuestions}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Time Remaining:</span>
            <span className="stat-value">{formatTime(timeRemaining)}</span>
          </div>
        </div>

        {answeredCount < totalQuestions && (
          <div className="warning-message">
            ⚠️ You have {totalQuestions - answeredCount} unanswered question(s)
          </div>
        )}

        <div className="button-group">
          <button onClick={onCancel} className="cancel-button">
            Go Back
          </button>
          <button onClick={onConfirm} className="confirm-button">
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmation;
