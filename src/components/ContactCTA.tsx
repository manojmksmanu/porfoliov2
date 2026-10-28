'use client';

import React, { useState } from 'react';
import { ArrowRight, Mail, Send, Check } from 'lucide-react';

export default function ContactCTA() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <section id="contact" style={{ marginTop: '10px' }}>
      <div className="cta-banner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span className="pulse-dot" style={{ width: 6, height: 6 }}></span>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-emerald)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Let&apos;s Work Together
            </span>
          </div>
          <h2 className="cta-title">Have a project in mind?</h2>
          <p className="cta-desc">
            I&apos;m open to full-time opportunities, freelance projects and interesting collaborations. Let&apos;s build something great together.
          </p>
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-glass-bright)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              padding: '10px 16px',
              fontSize: '0.88rem',
              outline: 'none',
              minWidth: '220px',
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            {sent ? (
              <>
                <Check size={14} /> Message Sent!
              </>
            ) : (
              <>
                Contact Me <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
