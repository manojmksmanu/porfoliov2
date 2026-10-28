import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '5rem',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          marginBottom: '16px',
        }}
      >
        404
      </div>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
        Page Not Found
      </h1>

      <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: '24px', fontSize: '0.95rem' }}>
        The page you are looking for might have been moved, renamed, or does not exist.
      </p>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link href="/" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          <Home size={15} /> Return Home
        </Link>
        <Link href="/tools" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
          Explore Tools
        </Link>
      </div>
    </div>
  );
}
