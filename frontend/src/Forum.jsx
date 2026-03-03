import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { ChevronLeft, Send, MessageCircle, Mail, Info, CheckCircle2 } from 'lucide-react';
import './Forum.css';

const Forum = () => {
  const [query, setQuery] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [submittedQueries, setSubmittedQueries] = useState([]);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

    const handleQuerySubmit = (e) => {
  e.preventDefault();

  if (!userEmail.trim()) {
    setError('Email cannot be empty');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
    setError('Please enter a valid email address');
    return;
  }

  if (!query.trim()) {
    setError('Query cannot be empty');
    return;
  }

  setIsSending(true); 

  const templateParams = {
    from_email: userEmail,
    query: query,
    to_email: 'xplore.math.8@gmail.com',
    reply_to: userEmail
  };

  emailjs.send('service_7nyrxhn', 'template_g7ymf98', templateParams, 'EBrMQR2CAzYp0QR4V')
    .then(
      () => {
        setSubmittedQueries([
          ...submittedQueries,
          { id: Date.now(), text: query, email: userEmail }
        ]);
        setQuery('');
        setUserEmail('');
        setError('');
        setIsSending(false);  
        alert('Query submitted and email sent successfully!');
      },
      (err) => {
        setError('Error sending email: ' + err.text);
        setIsSending(false);
      }
    );
};



  return (
    <div className="forum-wrapper">
      <div className="forum-bg-blobs">
        <div className="forum-blob blob-1"></div>
        <div className="forum-blob blob-2"></div>
      </div>

      <div className="forum-container">
        <header className="forum-header">
          <button className="back-link" onClick={() => navigate('/select')}>
            <ChevronLeft size={18} /> Back to Select
          </button>
          <div className="forum-intro">
            <span className="forum-badge">Community Forum</span>
            <h1>Have a <span className="highlight">Question?</span></h1>
            <p>Our community of students and educators is here to help you bridge the gap between confusion and mastery.</p>
          </div>
        </header>

        <div className="forum-grid">
          <aside className="forum-form-pane">
            <div className="form-card">
              <div className="form-header">
                <MessageCircle size={24} className="icon-green" />
                <h3>New Discussion</h3>
              </div>
              <form onSubmit={handleQuerySubmit}>
                <div className="input-group">
                  <Mail size={18} />
                  <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Your email" />
                </div>
                <div className="input-group align-start">
                  <Info size={18} style={{ marginTop: '12px' }} />
                  <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Query..." rows={6}></textarea>
                </div>
                {error && <p className="error-hint">{error}</p>}
                <button type="submit" className={`btn-submit ${isSending ? 'sending' : ''}`}>
                  {isSending ? 'Sending...' : 'Submit Query'} <Send size={18} />
                </button>
              </form>
            </div>
          </aside>

          <main className="forum-feed-pane">
            <div className="feed-header">
              <h3>Recent Activity</h3>
              <span className="query-count">{submittedQueries.length} Total Queries</span>
            </div>
            {/* Query Cards Mapping */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Forum;