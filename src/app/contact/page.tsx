'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'fullstack',
    budget: '$3k - $5k',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 24px 80px' }}>
      <Navbar />

      <main style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
        
        {/* Header */}
        <div>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="section-label">Start a Conversation</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Let&apos;s Build <span style={{ color: 'var(--accent-emerald)' }}>Something Incredible</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Have a project in mind, want to hire a full-stack engineer, or just want to chat about distributed architecture and dev tools? Reach out below!
          </p>
        </div>

        {/* Dual Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '32px' }}>
          
          {/* Left Column: Direct Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span className="pulse-dot"></span>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
                  Current Availability
                </span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: 6 }}>Open for Opportunities</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Available for full-time senior engineering roles, contract architectural consulting, and technical advisory.
              </p>
            </div>

            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Direct Email</div>
                  <a href="mailto:manoj2022019@gmail.com" style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none' }}>
                    manoj2022019@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Location</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.92rem' }}>Noida, NCR, India &bull; Remote Worldwide</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Response Time</div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.92rem' }}>Within 24 Hours guaranteed</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '32px' }}>
            
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8 }}>Message Sent Successfully!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '400px', margin: '0 auto 20px' }}>
                  Thank you for reaching out, {formData.name}. I will review your message and reply back to <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6 }}>Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Manoj Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        padding: '10px 14px',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6 }}>Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        padding: '10px 14px',
                        fontSize: '0.88rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6 }}>Project Category</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        padding: '10px 14px',
                        fontSize: '0.88rem',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="fullstack">Full-Stack Application</option>
                      <option value="backend">Backend &amp; API Architecture</option>
                      <option value="devtools">Developer Tooling / SaaS</option>
                      <option value="consulting">Architecture Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6 }}>Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      style={{
                        width: '100%',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '8px',
                        color: 'var(--text-primary)',
                        padding: '10px 14px',
                        fontSize: '0.88rem',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="$1k - $3k">$1,000 — $3,000</option>
                      <option value="$3k - $5k">$3,000 — $5,000</option>
                      <option value="$5k - $10k">$5,000 — $10,000+</option>
                      <option value="hourly">Full-Time / Monthly Retainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: 700, marginBottom: 6 }}>Project Details / Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about what you're building, key requirements, and your desired timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      padding: '12px 14px',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.95rem', justifyContent: 'center' }}
                >
                  <Send size={16} /> Send Inquiry
                </button>
              </form>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
