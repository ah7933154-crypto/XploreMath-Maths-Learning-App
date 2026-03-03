import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, TrendingUp, ChevronRight, Bot } from 'lucide-react';
import './Home.css';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/select');
  };

  const viewCurriculum = () => {
    navigate('/curriculum');
  };

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-elements">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="math-element element-1">∫</div>
          <div className="math-element element-2">π</div>
          <div className="math-element element-3">√</div>
          <div className="math-element element-4">Σ</div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <span className="badge">Welcome to XploreMath</span>
            <h1 className="hero-title">
              Master Math Through <span className="highlight">Discovery</span>
            </h1>
            <p className="hero-subtitle">
              Join thousands of students and educators on a personalized journey through the world of mathematics. Interactive, intuitive, and designed for mastery.
            </p>
            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={handleExploreClick}
                aria-label="Start Learning"
              >
                Begin Learning Now
                <ChevronRight size={20} />
              </button>
              <button className="btn-secondary" onClick={viewCurriculum}>View Curriculum</button>
            </div>
          </div>
          
          <div className="hero-visual">
             <div className="floating-card-container">
                <div className="floating-card card-1">
                  <div className="icon-box"><BookOpen color="#2dd528" /></div>
                  <div>
                    <h4>Interactive</h4>
                    <p>Learn by doing</p>
                  </div>
                </div>
                <div className="floating-card card-2">
                  <div className="icon-box"><TrendingUp color="#2dd528" /></div>
                  <div>
                    <h4>Progress</h4>
                    <p>Track your growth</p>
                  </div>
                </div>
                <div className="hero-main-image">
                  <div className="geometric-grid"></div>
                  <div className="main-circle">
                    <span className="formula">e = mc²</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Everything you need to excel</h2>
          <p>Tools designed to turn complex equations into simple solutions.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <BookOpen size={32} />
            </div>
            <h3>Interactive Lessons</h3>
            <p>Engage with dynamic tutorials that make complex math concepts simple, visual, and fun.</p>
            <div className="feature-hover-line"></div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <Trophy size={32} />
            </div>
            <h3>Practice Challenges</h3>
            <p>Test your skills with problems tailored to your unique learning level and speed.</p>
            <div className="feature-hover-line"></div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <TrendingUp size={32} />
            </div>
            <h3>Progress Tracking</h3>
            <p>Monitor your growth with intuitive dashboards, analytics, and instant feedback.</p>
            <div className="feature-hover-line"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-number">50k+</span>
            <span className="stat-label">Active Learners</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">200+</span>
            <span className="stat-label">Modules</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">98%</span>
            <span className="stat-label">Success Rate</span>
          </div>
        </div>
      </section>

      <footer className="footer-v2">
        <div className="footer-content">
          <div className="footer-logo">XploreMath</div>
          <p>&copy; 2026 XploreMath. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;