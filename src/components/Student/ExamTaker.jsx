import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';
import TimerComponent from './TimerComponent';
import SubmitConfirmation from './SubmitConfirmation';
import './ExamTaker.css';

const ExamTaker = ({ paper, onComplete, onCancel }) => {
  const { currentUser } = useAuth();
  const { startExam, submitExam } = useExam();
  
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime] = useState(Date.now());
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  useEffect(() => {
    startExam(paper.id);
  }, [paper.id, startExam]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < paper.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setShowSubmitConfirm(true);
  };

  const confirmSubmit = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const result = submitExam(answers, timeSpent, currentUser.id);
    onComplete(result);
  };

  const handleTimeEnd = () => {
    alert('Time is up! Your exam will be submitted automatically.');
    const timeSpent = paper.timeLimit * 60;
    const result = submitExam(answers, timeSpent, currentUser.id);
    onComplete(result);
  };

  const currentQuestion = paper.questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const totalSeconds = paper.timeLimit * 60;

  return (
    <div className="exam-taker">
      {/* Header */}
      <div className="exam-header">
        <div className="exam-info">
          <h1 className="exam-title">{paper.name}</h1>
          <p className="exam-meta">
            Question {currentQuestionIndex + 1} of {paper.questions.length}
          </p>
        </div>
        <TimerComponent totalSeconds={totalSeconds} onTimeEnd={handleTimeEnd} />
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div 
          className="progress-bar"
          style={{ width: `${((currentQuestionIndex + 1) / paper.questions.length) * 100}%` }}
        />
      </div>

      {/* Question Display */}
      <div className="question-container">
        <div className="question-header">
          <h2 className="question-number">Question {currentQuestionIndex + 1}</h2>
          <span className="question-marks">{currentQuestion.marks} mark(s)</span>
        </div>

        <p className="question-text">{currentQuestion.text}</p>

        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${answers[currentQuestion.id] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(currentQuestion.id, index)}
            >
              <span className="option-label">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="exam-navigation">
        <div className="nav-left">
          <button 
            onClick={onCancel}
            className="cancel-exam-button"
          >
            Cancel Exam
          </button>
        </div>

        <div className="nav-center">
          <span className="answered-count">
            {answeredCount} / {paper.questions.length} answered
          </span>
        </div>

        <div className="nav-right">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="nav-button"
          >
            Previous
          </button>
          {currentQuestionIndex === paper.questions.length - 1 ? (
            <button 
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit Exam
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="nav-button primary"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <SubmitConfirmation
          answeredCount={answeredCount}
          totalQuestions={paper.questions.length}
          timeRemaining={totalSeconds - Math.floor((Date.now() - startTime) / 1000)}
          onConfirm={confirmSubmit}
          onCancel={() => setShowSubmitConfirm(false)}
        />
      )}
    </div>
  );
};

export default ExamTaker;
