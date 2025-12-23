import React from 'react';
import { useExam } from '../../context/ExamContext';
import './ExamResults.css';

const ExamResults = ({ result, onBack, onRetake }) => {
  const { getExamById } = useExam();
  const paper = getExamById(result.paperId);

  const isPassed = result.percentage >= 40;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="exam-results">
      {/* Header */}
      <div className="results-header">
        <h1 className="results-title">Exam Results</h1>
        <div className="results-meta">
          <span>{result.paperName}</span>
          <span>•</span>
          <span>{new Date(result.submittedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>Time: {formatTime(result.timeSpent)}</span>
        </div>
      </div>

      {/* Score Card */}
      <div className="score-card">
        <div className={`score-status ${isPassed ? 'pass' : 'fail'}`}>
          {isPassed ? '✓ PASSED' : '✗ FAILED'}
        </div>
        
        <div className="score-main">
          <div className="score-number">
            {result.score} / {result.totalMarks}
          </div>
          <div className="score-label">Marks Obtained</div>
        </div>

        <div className="score-percentage">
          <div className="percentage-circle">
            <span className="percentage-number">{result.percentage.toFixed(1)}%</span>
          </div>
        </div>

        <div className="score-details">
          <div className="score-detail-item">
            <span className="detail-label">Correct Answers:</span>
            <span className="detail-value correct">
              {Object.keys(result.answers).filter(qId => {
                const question = paper.questions.find(q => q.id === parseInt(qId));
                return question && result.answers[qId] === question.correctAnswer;
              }).length}
            </span>
          </div>
          <div className="score-detail-item">
            <span className="detail-label">Wrong Answers:</span>
            <span className="detail-value wrong">
              {Object.keys(result.answers).filter(qId => {
                const question = paper.questions.find(q => q.id === parseInt(qId));
                return question && result.answers[qId] !== question.correctAnswer;
              }).length}
            </span>
          </div>
          <div className="score-detail-item">
            <span className="detail-label">Unanswered:</span>
            <span className="detail-value unanswered">
              {paper.questions.length - Object.keys(result.answers).length}
            </span>
          </div>
        </div>
      </div>

      {/* Question-wise Breakdown */}
      <div className="breakdown-section">
        <h2 className="breakdown-title">Question-wise Breakdown</h2>
        
        <div className="questions-breakdown">
          {paper.questions.map((question, index) => {
            const userAnswer = result.answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const isAnswered = userAnswer !== undefined;

            return (
              <div key={question.id} className={`breakdown-item ${isCorrect ? 'correct' : isAnswered ? 'wrong' : 'unanswered'}`}>
                <div className="breakdown-header">
                  <span className="breakdown-number">Question {index + 1}</span>
                  <div className="breakdown-status">
                    {isCorrect && <span className="status-icon correct">✓</span>}
                    {!isCorrect && isAnswered && <span className="status-icon wrong">✗</span>}
                    {!isAnswered && <span className="status-icon unanswered">—</span>}
                    <span className="marks-earned">
                      {isCorrect ? question.marks : 0} / {question.marks} marks
                    </span>
                  </div>
                </div>

                <p className="breakdown-question">{question.text}</p>

                <div className="breakdown-answers">
                  <div className="answer-row">
                    <span className="answer-label">Your Answer:</span>
                    <span className={`answer-value ${isCorrect ? 'correct' : isAnswered ? 'wrong' : 'unanswered'}`}>
                      {isAnswered ? question.options[userAnswer] : 'Not answered'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="answer-row">
                      <span className="answer-label">Correct Answer:</span>
                      <span className="answer-value correct">
                        {question.options[question.correctAnswer]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button onClick={onBack} className="back-button">
          Back to Dashboard
        </button>
        <button onClick={onRetake} className="retake-button">
          Retake Exam
        </button>
      </div>
    </div>
  );
};

export default ExamResults;
