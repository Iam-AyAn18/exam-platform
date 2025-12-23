import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';
import './TestPaperForm.css';

const TestPaperForm = ({ onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const { addTestPaper } = useExam();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subject: 'Math',
    timeLimit: 60,
    difficulty: 'Easy'
  });
  
  const [errors, setErrors] = useState({});

  const subjects = ['Math', 'Science', 'English', 'History', 'Geography', 'General Knowledge'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Test paper name is required';
    }
    
    if (formData.timeLimit < 5 || formData.timeLimit > 180) {
      newErrors.timeLimit = 'Time limit must be between 5 and 180 minutes';
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

    const newTestPaper = {
      id: Date.now(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      subject: formData.subject,
      timeLimit: parseInt(formData.timeLimit),
      difficulty: formData.difficulty,
      published: false,
      questions: [],
      createdBy: currentUser.name,
      createdAt: new Date().toISOString().split('T')[0]
    };

    addTestPaper(newTestPaper);
    
    if (onSuccess) {
      onSuccess('Test paper created successfully!');
    }
    
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Create New Test Paper</h2>
        
        <form onSubmit={handleSubmit} className="test-paper-form">
          <div className="form-group">
            <label htmlFor="name">Test Paper Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter test paper name"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a brief description (optional)"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timeLimit">Time Limit (minutes) *</label>
              <input
                type="number"
                id="timeLimit"
                name="timeLimit"
                value={formData.timeLimit}
                onChange={handleChange}
                min="5"
                max="180"
                className={errors.timeLimit ? 'error' : ''}
              />
              {errors.timeLimit && <span className="error-text">{errors.timeLimit}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Difficulty Level *</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              {difficulties.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Create Test Paper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestPaperForm;
