import React, { useState, useEffect } from 'react';
import { ChevronLeft, BookOpen, Upload, FileText, Trash2, Info, FileCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import './Notes.css';

// Chapter data with specific mathematics topics
const chapters = [
  { id: 1, title: '1: Integration', notes: 'Learn how to find areas under curves and solve problems using definite and indefinite integrals.' },
  { id: 2, title: '2: Multiple Integration', notes: 'Explore double and triple integrals for calculating volumes and solving advanced problems in multivariable calculus.' },
  { id: 3, title: '3: Differentiation', notes: 'Understand the rules of differentiation and apply derivatives to find slopes, rates of change, and optimization solutions.' },
  { id: 4, title: '4: Partial Differentiation', notes: 'Study how to differentiate functions of several variables and apply it to real-world applications in physics and engineering.' },
  { id: 5, title: '5: Conics', notes: 'Analyze the properties and equations of circles, ellipses, parabolas, and hyperbolas.' },
  { id: 6, title: '6: Algebra', notes: 'Master algebraic operations, solving equations, and manipulating expressions for complex problem-solving.' },
  { id: 7, title: '7: Area & Perimeter', notes: 'Calculate the area and perimeter of various geometric shapes with practical examples.' },
  { id: 8, title: '8: Equation of Lines', notes: 'Learn how to derive and interpret different forms of linear equations and their graphs.' },
  { id: 9, title: '9: Probability', notes: 'Understand the fundamentals of probability, including events, outcomes, and simple probability laws.' },
  { id: 10, title: '10: Binomial Theorem', notes: 'Explore how to expand expressions using the Binomial Theorem and solve related problems.' },
  { id: 11, title: '11: Limits', notes: 'Grasp the concept of limits to understand the behavior of functions near specific points.' },
  { id: 12, title: '12: Vectors', notes: 'Work with vectors in two and three dimensions, including addition, scalar multiplication, and dot products.' },
  { id: 13, title: '13: Inequalities', notes: 'Solve and graph linear and quadratic inequalities and apply them in problem-solving contexts.' },
  { id: 14, title: '14: Graphs', notes: 'Interpret and draw graphs of functions, analyzing key features such as intercepts, asymptotes, and turning points.' },
  { id: 15, title: '15: Angles', notes: 'Study different types of angles, their properties, and applications in geometric proofs.' },
  { id: 16, title: '16: Probability (Advanced)', notes: 'Dive deeper into probability theory, including conditional probability and independent events.' },
  { id: 17, title: '17: Trigonometry', notes: 'Master trigonometric ratios, identities, and equations for solving real-world and theoretical problems.' },
  { id: 18, title: '18: Sequences and Series', notes: 'Learn how to analyze and sum arithmetic and geometric sequences and series.' },
  { id: 19, title: '19: Complex Numbers', notes: 'Explore operations on complex numbers, their polar form, and applications in solving equations.' },
  { id: 20, title: '20: Logarithm and Exponents', notes: 'Understand exponential and logarithmic functions and their use in growth and decay problems.' }
];
/*import React, { useState, useEffect } from 'react';
import { ChevronLeft, BookOpen, Upload, FileText, Trash2, Info, FileCheck } from 'lucide-react';
import './Notes.css';

// Using your math chapter data
const chapters = [
  { id: 1, title: 'Integration', notes: 'Learn how to find areas under curves and solve problems using definite and indefinite integrals.' },
  { id: 2, title: 'Multiple Integration', notes: 'Explore double and triple integrals for calculating volumes and solving advanced problems in multivariable calculus.' },
  { id: 3, title: 'Differentiation', notes: 'Understand the rules of differentiation and apply derivatives to find slopes, rates of change, and optimization solutions.' },
  { id: 4, title: 'Partial Differentiation', notes: 'Study how to differentiate functions of several variables and apply it to real-world applications.' },
  // ... other chapters
];*/

const Notes = () => {
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);
  const [userFiles, setUserFiles] = useState(() => {
    try {
      const storedFiles = localStorage.getItem('userFiles');
      return storedFiles ? JSON.parse(storedFiles) : {};
    } catch { return {}; }
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userFiles', JSON.stringify(userFiles));
  }, [userFiles]);

  const handleFileUpload = (event, chapterId) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
      }));
      setUserFiles(prev => ({ ...prev, [chapterId]: [...(prev[chapterId] || []), ...newFiles] }));
    }
  };

  const handleFileDelete = (chapterId, fileIndex) => {
    setUserFiles(prev => {
      const updated = [...(prev[chapterId] || [])];
      URL.revokeObjectURL(updated[fileIndex].url);
      updated.splice(fileIndex, 1);
      return { ...prev, [chapterId]: updated };
    });
  };

  return (
    <div className="notes-wrapper">
      <div className="notes-bg-decor">
        <div className="notes-blob blob-1"></div>
        <div className="notes-blob blob-2"></div>
      </div>
      <button className="back-link" onClick={() => navigate('/select')} style={{ marginTop: '80px' }}>
            <ChevronLeft size={18} />
            Back to Select
          </button>
      <div className="notes-container">
        <header className="notes-header">
          <div className="notes-title-section">
            <span className="notes-badge">Study Materials</span>
            <h1 className="notes-main-title">Mathematics <span className="highlight">Notes</span></h1>
          </div>
        </header>

        <div className="notes-layout">
          <aside className="notes-sidebar">
            <div className="sidebar-header">
              <h3>Chapters</h3>
              <span className="chapter-count">{chapters.length} Modules</span>
            </div>
            <div className="chapter-scroll">
              {chapters.map((chapter) => (
                <button
                  key={chapter.id}
                  className={`chapter-nav-item ${selectedChapter?.id === chapter.id ? 'active' : ''}`}
                  onClick={() => setSelectedChapter(chapter)}
                >
                  <div className="nav-icon"><BookOpen size={16} /></div>
                  <span className="nav-text">{chapter.title}</span>
                </button>
              ))}
            </div>
          </aside>

          <main className="notes-content">
            {selectedChapter ? (
              <div className="study-pane animate-fadeIn">
                <div className="pane-header">
                   <h2>{selectedChapter.title}</h2>
                   <p>Comprehensive module overview and personal notes</p>
                </div>

                <div className="pane-section">
                  <div className="section-title"><Info size={18} /><h3>Curriculum Overview</h3></div>
                  <div className="default-notes-box"><p>{selectedChapter.notes}</p></div>
                </div>

                <div className="pane-section">
                  <div className="section-title"><FileText size={18} /><h3>Personal Resources</h3></div>
                  <div className="upload-zone">
                    <label className="upload-btn">
                      <input type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e, selectedChapter.id)} />
                      <Upload size={18} /> Upload Notes
                    </label>
                  </div>

                  <div className="files-list">
                    {userFiles[selectedChapter.id]?.map((file, idx) => (
                      <div key={idx} className="file-item-card">
                        <div className="file-info">
                          <div className="file-type-icon"><FileCheck size={20} /></div>
                          <a href={file.url} target="_blank" rel="noreferrer" className="file-name">{file.name}</a>
                        </div>
                        <button className="delete-file" onClick={() => handleFileDelete(selectedChapter.id, idx)}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-pane"><p>Select a chapter to begin studying.</p></div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Notes;