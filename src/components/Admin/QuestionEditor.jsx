import React, { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import './QuestionEditor.css';

const QuestionEditor = ({ paper, onClose, onSuccess }) => {
  const { updateTestPaper } = useExam();
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questions, setQuestions] = useState(paper.questions || []);

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowQuestionForm(true);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const updatedQuestions = questions.filter(q => q.id !== questionId);
      setQuestions(updatedQuestions);
      updateTestPaper(paper.id, { questions: updatedQuestions });
      onSuccess('Question deleted successfully!');
    }
  };

  const handleSaveQuestion = (question) => {
    let updatedQuestions;
    if (editingQuestion) {
      updatedQuestions = questions.map(q => q.id === question.id ? question : q);
    } else {
      updatedQuestions = [...questions, { ...question, id: Date.now() }];
    }
    setQuestions(updatedQuestions);
    updateTestPaper(paper.id, { questions: updatedQuestions });
    setShowQuestionForm(false);
    onSuccess(editingQuestion ? 'Question updated successfully!' : 'Question added successfully!');
  };

  const handleBack = () => {
    onClose();
  };

  return (
    <div className="question-editor">
      {/* Header */}
      <div className="editor-header">
        <button onClick={handleBack} className="back-button">
          ← Back to Dashboard
        </button>
        <div className="paper-info">
          <h2 className="paper-title">{paper.name}</h2>
          <div className="paper-meta">
            <span>Subject: {paper.subject}</span>
            <span>Time: {paper.timeLimit} min</span>
            <span>Difficulty: {paper.difficulty}</span>
            <span>Questions: {questions.length}</span>
          </div>
        </div>
      </div>

      {/* Add Question Button */}
      <div className="editor-actions">
        <button onClick={handleAddQuestion} className="add-question-button">
          + Add New Question
        </button>
      </div>

      {/* Questions List */}
      <div className="questions-container">
        {questions.length === 0 ? (
          <div className="empty-questions">
            <p>No questions added yet. Click "Add New Question" to create one!</p>
          </div>
        ) : (
          <div className="questions-list">
            {questions.map((question, index) => (
              <div key={question.id} className="question-item">
                <div className="question-header">
                  <span className="question-number">Question {index + 1}</span>
                  <div className="question-actions">
                    <button 
                      onClick={() => handleEditQuestion(question)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <p className="question-text">{question.text}</p>
                
                <div className="question-meta">
                  <span className="question-type">{question.type}</span>
                  <span className="question-marks">{question.marks} marks</span>
                </div>

                <div className="options-list">
                  {question.options.map((option, idx) => (
                    <div 
                      key={idx} 
                      className={`option-item ${idx === question.correctAnswer ? 'correct' : ''}`}
                    >
                      <span className="option-label">{String.fromCharCode(65 + idx)}.</span>
                      <span className="option-text">{option}</span>
                      {idx === question.correctAnswer && (
                        <span className="correct-badge">✓ Correct</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Question Form Modal */}
      {showQuestionForm && (
        <QuestionForm
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => setShowQuestionForm(false)}
        />
      )}
    </div>
  );
};

const QuestionForm = ({ question, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    text: question?.text || '',
    type: question?.type || 'MCQ',
    options: question?.options || ['', '', '', ''],
    correctAnswer: question?.correctAnswer ?? 0,
    marks: question?.marks || 1
  });
  const [errors, setErrors] = useState({});

  const handleTypeChange = (type) => {
    if (type === 'TrueFalse') {
      setFormData(prev => ({
        ...prev,
        type,
        options: ['True', 'False'],
        correctAnswer: 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        type,
        options: ['', '', '', '']
      }));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.text.trim()) {
      newErrors.text = 'Question text is required';
    }
    
    if (formData.type === 'MCQ') {
      const emptyOptions = formData.options.filter(opt => !opt.trim());
      if (emptyOptions.length > 0) {
        newErrors.options = 'All options must be filled';
      }
    }
    
    if (formData.marks < 1 || formData.marks > 10) {
      newErrors.marks = 'Marks must be between 1 and 10';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const questionData = {
      ...formData,
      id: question?.id,
      text: formData.text.trim(),
      options: formData.options.map(opt => opt.trim())
    };

    onSave(questionData);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {question ? 'Edit Question' : 'Add New Question'}
        </h2>
        
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label>Question Text *</label>
            <textarea
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Enter your question here..."
              rows="3"
              className={errors.text ? 'error' : ''}
            />
            {errors.text && <span className="error-text">{errors.text}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Question Type *</label>
              <select
                value={formData.type}
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <option value="MCQ">Multiple Choice (MCQ)</option>
                <option value="TrueFalse">True/False</option>
              </select>
            </div>

            <div className="form-group">
              <label>Marks *</label>
              <input
                type="number"
                value={formData.marks}
                onChange={(e) => setFormData(prev => ({ ...prev, marks: parseInt(e.target.value) }))}
                min="1"
                max="10"
                className={errors.marks ? 'error' : ''}
              />
              {errors.marks && <span className="error-text">{errors.marks}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Options *</label>
            {formData.type === 'MCQ' ? (
              <div className="options-form">
                {formData.options.map((option, index) => (
                  <div key={index} className="option-input-group">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={formData.correctAnswer === index}
                      onChange={() => setFormData(prev => ({ ...prev, correctAnswer: index }))}
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      className={errors.options ? 'error' : ''}
                    />
                  </div>
                ))}
                {errors.options && <span className="error-text">{errors.options}</span>}
                <p className="help-text">Select the radio button for the correct answer</p>
              </div>
            ) : (
              <div className="truefalse-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === 0}
                    onChange={() => setFormData(prev => ({ ...prev, correctAnswer: 0 }))}
                  />
                  <span>True</span>
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === 1}
                    onChange={() => setFormData(prev => ({ ...prev, correctAnswer: 1 }))}
                  />
                  <span>False</span>
                </label>
              </div>
            )}
          </div>

          <div className="button-group">
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {question ? 'Update Question' : 'Add Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionEditor;
