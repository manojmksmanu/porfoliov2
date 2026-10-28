'use client';

import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: '#070a12',
          color: '#f8fafc',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ textAlign: 'center', padding: '24px', maxWidth: '500px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(244, 63, 94, 0.15)',
              color: '#fb7185',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <AlertTriangle size={32} />
          </div>

          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
            Application Error
          </h2>

          <p style={{ color: '#94a3b8', marginBottom: '24px', lineHeight: 1.5 }}>
            {error?.message || 'A critical error occurred. Please refresh or try again.'}
          </p>

          <button
            type="button"
            onClick={() => reset()}
            style={{
              background: '#10b981',
              color: '#070a12',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <RotateCcw size={16} /> Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
