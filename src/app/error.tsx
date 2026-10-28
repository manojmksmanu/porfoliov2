'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics or error tracking service if needed
    console.error('App Router Caught Error:', error);
  }, [error]);

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
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(244, 63, 94, 0.15)',
          color: '#fb7185',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <AlertTriangle size={32} />
      </div>

      <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
        Something went wrong!
      </h2>

      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', marginBottom: '24px', fontSize: '0.95rem' }}>
        {error?.message || 'An unexpected error occurred while rendering this component.'}
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary"
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
        >
          <RotateCcw size={15} /> Try Again
        </button>

        <Link
          href="/"
          className="btn-secondary"
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
        >
          <Home size={15} /> Go to Homepage
        </Link>
      </div>
    </div>
  );
}
