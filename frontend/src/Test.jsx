import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Trophy, Settings } from 'lucide-react';
import questions from './TestQuestions';
import { useNavigate } from 'react-router-dom';
import './Test.css';

const Test = () => {
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [numQuestions, setNumQuestions] = useState(5);
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testQuestions, setTestQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // -------- Helpers --------
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
  const uniqueChapters = [...new Set(questions.map(q => q.chapter))];

  const handleChapter = (ch) => {
    setChapters(prev =>
      prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
    );
  };

  // -------- Start Test --------
  const startTest = () => {
    // Validation for question count
    if (numQuestions < 5 || numQuestions > 100) {
      alert('Please choose between 5 and 100 questions.');
      return;
    }

    if (chapters.length === 0) {
      alert('Please select at least one chapter.');
      return;
    }

    const filtered = questions.filter(q => chapters.includes(q.chapter));
    
    // Ensure we don't try to pick more questions than exist in the selected chapters
    const count = Math.min(numQuestions, filtered.length);
    const picked = shuffle(filtered).slice(0, count);
    
    setTestQuestions(picked);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setTestStarted(true);
    setTestSubmitted(false);
    setTimeLeft(picked.length * 60);
    localStorage.setItem('testInProgress', 'true'); 
  };

  // -------- Select Option --------
  const selectOption = (qid, opt) => {
    setSelectedAnswers(prev => ({ ...prev, [qid]: opt }));
  };

  // -------- Submit Test --------
  const submitTest = () => {
    let s = 0;
    testQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct_answer) s++;
    });
    setScore(s);
    setTestSubmitted(true);
    localStorage.removeItem('testInProgress');
  };

  // -------- Timer --------
  useEffect(() => {
    if (!testStarted || testSubmitted) return;
    if (timeLeft === 0) {
      submitTest();
      return;
    }
    const t = setInterval(() => setTimeLeft(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [testStarted, testSubmitted, timeLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentQ = testQuestions[currentQuestionIndex];

  // -------- MathJax Rendering --------
  useEffect(() => {
    const scriptExists = !!document.querySelector('script[src*="mathjax"]');
    if (!scriptExists) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        window.MathJax && window.MathJax.typesetPromise && window.MathJax.typesetPromise();
      };
      return () => document.head.removeChild(script);
    } else {
      window.MathJax && window.MathJax.typesetPromise && window.MathJax.typesetPromise();
    }
  }, []);

  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [testStarted, testQuestions, currentQuestionIndex]);

  const handleBackToSelect = () => {
    navigate('/select');
  }

  return (
    <>
     <button className="back-link"  style={{marginLeft: '200px', marginTop: '100px'}} onClick={handleBackToSelect}>Back To Select</button>
      <div className="test-wrapper">
        {!testStarted && (
          <div className="test-container">
            <div className="setup-pane">
              <div className="setup-header">
                <Settings size={24} />
                <h1>Test Configuration</h1>
                <p>Select chapters and question count (5-100).</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Number of Questions (5-100):
                </label>
                <input 
                  type="number" 
                  value={numQuestions} 
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc', 
                    width: '80px',
                    fontSize: '16px' 
                  }}
                />
              </div>

              <div className="chapter-pills-grid">
                {uniqueChapters.map(ch => (
                  <button
                    key={ch}
                    className={`chapter-pill ${chapters.includes(ch) ? 'selected' : ''}`}
                    onClick={() => handleChapter(ch)}
                  >
                    {ch}
                  </button>
                ))}
              </div>

              <button className="btn-start" onClick={startTest}>
                Start Test
              </button>
            </div>
          </div>
        )}

        {testSubmitted && (
          <div className="test-container centered">
            <Trophy size={60} color="#2dd528" />
            <h1>Test Complete</h1>
            <h2>Score: {score} / {testQuestions.length}</h2>
            <button className="btn-start" onClick={() => {
              setTestStarted(false);
              localStorage.removeItem('testInProgress');
            }}>
              Back
            </button>
          </div>
        )}

        {testStarted && !testSubmitted && currentQ && (
          <div className="exam-container">
            <aside className="exam-sidebar">
              <div className="exam-timer">
                <Clock size={20} /> {formatTime(timeLeft)}
              </div>
              <div>
                Question {currentQuestionIndex + 1} / {testQuestions.length}
              </div>
            </aside>

            <main className="exam-main">
              <div className="question-pane">
                <p className="q-content">{currentQ.question}</p>

                <div className="options-grid">
                  {currentQ.options.map((opt, i) => (
                    <button
                      key={i}
                      className={`option-btn ${selectedAnswers[currentQ.id] === opt ? 'selected' : ''}`}
                      onClick={() => selectOption(currentQ.id, opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: 30, display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => setCurrentQuestionIndex(i => i - 1)}
                    disabled={currentQuestionIndex === 0}
                    className='btn-prev'
                  >
                    <ChevronLeft /> Prev
                  </button>

                  {currentQuestionIndex === testQuestions.length - 1 ? (
                    <button onClick={submitTest} className='btn-submit'>Submit</button>
                  ) : (
                    <button onClick={() => setCurrentQuestionIndex(i => i + 1)} className='btn-next'>
                      Next <ChevronRight />
                    </button>
                  )}
                </div>
              </div>
            </main>
          </div>
        )}
      </div>
    </>
  );
};

export default Test;