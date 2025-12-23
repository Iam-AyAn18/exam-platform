import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockTestPapers } from '../data/mockData';

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [testPapers, setTestPapers] = useState([]);
  const [examResults, setExamResults] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);

  // Initialize testPapers with mockData on load
  useEffect(() => {
    setTestPapers(mockTestPapers);
  }, []);

  const addTestPaper = useCallback((testPaper) => {
    setTestPapers(prev => [...prev, testPaper]);
  }, []);

  const updateTestPaper = useCallback((id, updatedData) => {
    setTestPapers(prev => 
      prev.map(paper => 
        paper.id === id ? { ...paper, ...updatedData } : paper
      )
    );
  }, []);

  const deleteTestPaper = useCallback((id) => {
    setTestPapers(prev => prev.filter(paper => paper.id !== id));
  }, []);

  const getTestPapers = useCallback(() => {
    return testPapers;
  }, [testPapers]);

  const getPublishedPapers = useCallback(() => {
    return testPapers.filter(paper => paper.published === true);
  }, [testPapers]);

  const getExamById = useCallback((id) => {
    return testPapers.find(paper => paper.id === id);
  }, [testPapers]);

  const startExam = useCallback((paperId) => {
    const paper = testPapers.find(p => p.id === paperId);
    if (paper) {
      setCurrentExam({
        paperId: paper.id,
        paperName: paper.name,
        questions: paper.questions,
        answers: {},
        startTime: Date.now(),
        timeLimit: paper.timeLimit
      });
    }
  }, [testPapers]);

  const submitExam = useCallback((answers, timeSpent, studentId) => {
    if (!currentExam) return null;

    const paper = testPapers.find(p => p.id === currentExam.paperId);
    if (!paper) return null;
    
    let score = 0;
    let totalMarks = 0;

    // Calculate score
    paper.questions.forEach(question => {
      totalMarks += question.marks;
      if (answers[question.id] === question.correctAnswer) {
        score += question.marks;
      }
    });

    const result = {
      id: Date.now(),
      studentId: studentId,
      paperId: currentExam.paperId,
      paperName: currentExam.paperName,
      score: score,
      totalMarks: totalMarks,
      percentage: (score / totalMarks) * 100,
      answers: answers,
      timeSpent: timeSpent,
      submittedAt: new Date().toISOString()
    };

    setExamResults(prev => [...prev, result]);
    setCurrentExam(null);
    
    return result;
  }, [currentExam, testPapers]);

  const getExamResults = useCallback((studentId) => {
    return examResults.filter(result => result.studentId === studentId);
  }, [examResults]);

  return (
    <ExamContext.Provider 
      value={{ 
        testPapers,
        examResults,
        currentExam,
        addTestPaper,
        updateTestPaper,
        deleteTestPaper,
        getTestPapers,
        getPublishedPapers,
        startExam,
        submitExam,
        getExamResults,
        getExamById
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
