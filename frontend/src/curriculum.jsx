import React from 'react'
import { questions } from './questionsData.js'
import { useNavigate } from 'react-router-dom'
const Curriculum = () => {
  const chapters = Object.keys(questions)
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1) // Go back to previous page
  }

  return (
    <>
      <style>
        {`
          :root {
            --primary: #2dd528;
            --primary-dark: #15de29;
            --text-main: #2D3436;
            --text-secondary: #636e72;
            --background-light: #f8f9fa;
            --card-background: #ffffff;
            --border-color: #e9ecef;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
            --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.15);
            --transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .curriculum-container {
            padding: 60px 20px;
            max-width: 1400px;
            margin: 0 auto;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, var(--background-light) 0%, #ffffff 100%);
            min-height: 100vh;
            position: relative;
          }

          .curriculum-title {
            text-align: center;
            margin-bottom: 50px;
            font-size: 3rem;
            font-weight: 700;
            color: var(--text-main);
            letter-spacing: -1px;
            position: relative;
          }

          .curriculum-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, var(--primary), var(--primary-dark));
            border-radius: 2px;
          }

          .chapters-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 30px;
            margin-top: 40px;
          }

          .chapter-card {
            background: var(--card-background);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 32px 24px;
            text-align: center;
            transition: var(--transition);
            box-shadow: var(--shadow);
            position: relative;
            overflow: hidden;
          }

          .chapter-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary), var(--primary-dark));
            transform: scaleX(0);
            transition: var(--transition);
          }

          .chapter-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-hover);
            border-color: var(--primary);
          }

          .chapter-card:hover::before {
            transform: scaleX(1);
          }

          .chapter-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--text-main);
            line-height: 1.3;
          }

          .chapter-count {
            font-size: 0.95rem;
            color: var(--text-secondary);
            font-weight: 500;
            margin: 0;
          }

          .chapter-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto 16px;
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.5rem;
            font-weight: bold;
          }

          .back-button {
            position: absolute;
            background: var(--card-background);
            border: 2px solid var(--border-color);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: var(--shadow);
            z-index: 10;
          }

          .back-button:hover {
            background: var(--primary);
            border-color: var(--primary);
            transform: scale(1.05);
            box-shadow: var(--shadow-hover);
          }

          .back-button svg {
            width: 20px;
            height: 20px;
            color: var(--text-main);
            transition: var(--transition);
          }

          .back-button:hover svg {
            color: white;
          }
        `}
      </style>
      <div className="curriculum-container">
        <button className="back-button" onClick={handleBack} aria-label="Go back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" className="back-button-icon"/>
          </svg>
        </button>
        <h1 className="curriculum-title">Mathematics Curriculum</h1>
        <div className="chapters-grid">
          {chapters.map((chapter, index) => (
            <div key={index} className="chapter-card">
              <div className="chapter-icon">
                {chapter.charAt(0)}
              </div>
              <h2 className="chapter-title">{chapter}</h2>
              <p className="chapter-count">{questions[chapter].length} questions</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Curriculum
