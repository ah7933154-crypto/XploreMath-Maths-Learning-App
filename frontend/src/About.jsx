import React from 'react';
import { Target, Users, Zap, BookOpen } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-bg-elements">
        <div className="about-blob blob-1"></div>
        <div className="about-blob blob-2"></div>
      </div>

      <div className="about-hero">
        <div className="about-hero-container">
          <div className="about-hero-image">
            <div className="image-frame">
              <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800" alt="Math" />
              <div className="floating-badge"><Zap size={20} /><span>Impact Driven</span></div>
            </div>
          </div>

          <div className="about-hero-content">
            <span className="about-badge">Our Story</span>
            <h1 className="about-title">Turning Numbers Into <span className="highlight">Confidence</span></h1>
            <p className="about-lead">Welcome to XploreMath — a specialized hub where complex equations meet creative clarity. We're bridge-builders between confusion and mastery.</p>
            <div className="about-stats-mini">
              <div className="mini-stat"><strong>10k+</strong><span>Problems Solved</span></div>
              <div className="mini-stat"><strong>200+</strong><span>Study Modules</span></div>
            </div>
          </div>
        </div>
      </div>

      <section className="about-mission">
        <div className="mission-grid">
          <div className="mission-card"><Target size={24} /><h3>Clarity First</h3><p>We strip away jargon to deliver explanations that stick.</p></div>
          <div className="mission-card"><Users size={24} /><h3>For Everyone</h3><p>Designed for every student at every level.</p></div>
          <div className="mission-card"><BookOpen size={24} /><h3>Deep Mastery</h3><p>Ensure you understand the "why" behind every "how".</p></div>
        </div>
      </section>
    </div>
  );
};

export default About;