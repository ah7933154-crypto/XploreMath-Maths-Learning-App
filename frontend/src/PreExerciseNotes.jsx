import React, { useState } from 'react'
import { questions } from './questionsData.js'
import './PreExerciseNotes.css'
import { BookOpen, ChevronRight, ChevronLeft, FileText, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AlgebraPDF from './assets/algebra.pdf'
import AreaAndPerimeterPDF from './assets/areaandperimeter.pdf'
import BinomialTheoremPDF from './assets/bionomial theorem.pdf'
import ComplexNumbersPDF from './assets/ComplexNumbersBook.pdf'
import ConicEPDF from './assets/conic_e.pdf'
import DifferentiationPDF from './assets/Differenciation.pdf'
import DifferentiationPracticePDF from './assets/differentiation_practice_i.pdf'
import IntegrationPDF from './assets/IntegrationBook.pdf'
import LimitsPDF from './assets/limits.pdf'
import MultiIntegrationPDF from './assets/MultiIntegration.pdf'
import ProbabilityPDF from './assets/Probability.pdf'
import SequencesAndSeriesPDF from './assets/sequenceandseries.pdf'
import VectorsPDF from './assets/Vectors Book.pdf'

const PreExerciseNotes = () => {
  const chapters = Object.keys(questions);
  const navigate = useNavigate();
  const [selectedChapter, setSelectedChapter] = useState(null);

  // Map chapter names to their PDF imports
  const chapterPdfs = {
    'Integration': [
      { name: 'Integration Book', url: IntegrationPDF },
    ],
    'Multiple Integration': [
        { name: 'Multi Integration', url: MultiIntegrationPDF }
    ],
    'Differentiation': [
      { name: 'Differentiation Basics', url: DifferentiationPDF },
      { name: 'Differentiation Practice', url: DifferentiationPracticePDF }
    ],
    'Algebra': [
      { name: 'Algebra Notes', url: AlgebraPDF }
    ],
    'Limits': [
      { name: 'Limits Notes', url: LimitsPDF }
    ],
    'Probability': [
      { name: 'Probability Notes', url: ProbabilityPDF }
    ],
    'Sequence and Series': [
      { name: 'Sequences and Series', url: SequencesAndSeriesPDF }
    ],
    'Vectors': [
      { name: 'Vectors Book', url: VectorsPDF }
    ],
    'Complex Numbers': [
      { name: 'Complex Numbers Book', url: ComplexNumbersPDF }
    ],
    'Conics': [
      { name: 'Conic Sections', url: ConicEPDF }
    ],
    'Binomial Theorem': [
      { name: 'Binomial Theorem', url: BinomialTheoremPDF }
    ],
    'Area Perimeter': [
      { name: 'Area and Perimeter', url: AreaAndPerimeterPDF }
    ]
    // Add more as needed
  };

  const handleBackToSelect = () => {
    navigate('/select');
  };

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
  };


  if (selectedChapter) {
    const pdfs = chapterPdfs[selectedChapter] || [];
    return (
      <div className="pre-exercise-page">
        <header className="page-header">
          <button className="back-link" onClick={handleBackToChapters}>
            <ChevronLeft size={18} />
            Back to Chapters
          </button>
          <div className="header-actions">
            <div className="topic-indicator">
              <span className="dot"></span>
              Chapter: <strong>{selectedChapter}</strong>
            </div>
          </div>
        </header>

        <div className="chapter-view">
          <div className="pdf-sidebar">
            <h2>Pre-Exercise Notes</h2>
            <div className="pdf-list">
              {pdfs.map((pdf, index) => (
                <a key={index} href={pdf.url} target="_blank" rel="noopener noreferrer" className="pdf-link">
                  <FileText size={20} />
                  <span>{pdf.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="content-area">
            <h1>{selectedChapter} Notes</h1>
            <p>Select a PDF from the sidebar to view the notes.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pre-exercise-page">
      <header className="page-header">
        <button className="back-link" onClick={handleBackToSelect}>
          <ChevronLeft size={18} />
          Back to Select
        </button>
      </header>

      <div className="hub-container">
        <div className="hub-header">
          <span className="hub-badge">Pre-Exercise Notes</span>
          <h1>Choose your <span className="highlight">Chapter</span></h1>
          <p>Select a chapter to view pre-exercise notes and prepare for practice.</p>
        </div>

        <div className="topic-cards-grid">
          {chapters.map((chapter, index) => (
            <div key={index} className="topic-card-v2" onClick={() => handleChapterClick(chapter)}>
              <div className="topic-icon-ring"><BookOpen size={24} /></div>
              <div className="topic-info">
                <h3>{chapter.charAt(0).toUpperCase() + chapter.slice(1)}</h3>
              </div>
              <div className="topic-arrow"><ChevronRight size={18} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreExerciseNotes
