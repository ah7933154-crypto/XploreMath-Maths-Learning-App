
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, Info, Bot } from 'lucide-react';
import './Questions.css';
import { useNavigate } from 'react-router-dom';
import { questions } from './questionsData.js';

const QUESTIONS_PER_PAGE = 20;

const Questions = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Configure MathJax before loading
    window.MathJax = {
      tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
      },
      startup: {
        ready: () => {
          MathJax.startup.defaultReady();
        }
      }
    };

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.MathJax.typesetPromise && window.MathJax.typesetPromise();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [selectedTopic, currentPage]);

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setCurrentPage(1);
  };

  const handleBackToSelect = () => {
    navigate('/select');
  };


  if (selectedTopic) {
    const questionsForTopic = questions && questions[selectedTopic] ? questions[selectedTopic] : [];
    const totalPages = Math.ceil(questionsForTopic.length / QUESTIONS_PER_PAGE);
    const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
    const paginatedQuestions = questionsForTopic.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

    return (
      <div className="questions-page">
        <header className="page-header">
          <button className="back-link" onClick={() => setSelectedTopic(null)}>
            <ChevronLeft size={18} />
            Back to Topics
          </button>
          <div className="header-actions">
            <div className="topic-indicator">
              <span className="dot"></span>
              Study Session: <strong>{selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)}</strong>
            </div>
          </div>
        </header>

        <div className="questions-container">
          <div className="questions-header">
            <h1>Practice Problems</h1>
            <p>Master {selectedTopic} through active problem solving.</p>
          </div>

          <div className="questions-grid">
            {paginatedQuestions.map((q, index) => (
              <div key={startIndex + index} className="question-card">
                <div className="card-q-header">
                  <span className="q-number">Problem #{startIndex + index + 1}</span>
                  <div className="difficulty-tag">Standard</div>
                </div>
                
                <div className="q-body">
                  <div className="q-text">
                    <span className="label">Question</span>
                    <p className="math">{q.question}</p>
                  </div>
                  
                  <div className="q-divider"></div>
                  
                  <div className="q-answer">
                    <span className="label">Solution</span>
                    <div className="answer-box">
                      <p className="math">{q.answer}</p>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer">
                   <div className="status"><CheckCircle size={14} /> Ready to Review</div>
                   <button className="btn-notes" onClick={() => {}}>Review Notes</button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-v2">
              <button
                className="pag-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={20} />
              </button>
              <div className="pag-info">Page <span>{currentPage}</span> of {totalPages}</div>
              <button
                className="pag-btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="questions-page">
      <header className="page-header">
          <button className="back-link" onClick={handleBackToSelect}>
            <ChevronLeft size={18} />
            Back to Select
          </button>
      </header>

      <div className="hub-container">
        <div className="hub-header">
          <span className="hub-badge">Topic Hub</span>
          <h1>Choose your <span className="highlight">Challenge</span></h1>
          <p>Pick a domain to start your practice session.</p>
        </div>

        <div className="topic-cards-grid">
          {questions && Object.keys(questions).map((topic) => (
            <div key={topic} className="topic-card-v2" onClick={() => handleTopicClick(topic)}>
              <div className="topic-icon-ring"><BookOpen size={24} /></div>
              <div className="topic-info">
                <h3>{topic.charAt(0).toUpperCase() + topic.slice(1)}</h3>
                <p>{questions[topic].length} Problems Available</p>
              </div>
              <div className="topic-arrow"><ChevronRight size={18} /></div>
            </div>
          ))}
        </div>

        <div className="hub-footer">
          <div className="hint">
            <Info size={16} />
            <p>Practice makes perfect. Complete all modules for a mastery badge!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;