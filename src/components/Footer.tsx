'use client';

import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '24px 0',
      borderTop: '1px solid var(--border-glass)',
      color: 'var(--text-dim)',
      fontSize: '0.84rem',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="brand-badge" style={{ width: 28, height: 28, fontSize: '0.8rem' }}>MK</div>
        <div>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Manoj Kumar</span>
          <span style={{ marginLeft: 8, fontSize: '0.78rem', color: 'var(--text-dim)' }}>Software Developer &bull; Noida, India</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <a href="https://github.com/manojmksmanu" target="_blank" rel="noreferrer" className="social-link" style={{ color: 'var(--text-secondary)' }}><Github size={16} /></a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link" style={{ color: 'var(--text-secondary)' }}><Linkedin size={16} /></a>
        <a href="mailto:manoj2022019@gmail.com" className="social-link" style={{ color: 'var(--text-secondary)' }}><Mail size={16} /></a>
        <a href="tel:+919667328778" className="social-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>+91 9667328778</a>
      </div>

      <div>
        &copy; {new Date().getFullYear()} Manoj Kumar. Real-Time Systems &amp; Software Developer Studio.
      </div>
    </footer>
  );
}
