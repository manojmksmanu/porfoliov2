'use client';

import React, { useState } from 'react';
import { Copy, Check, Hash, FileText, ArrowRightLeft, Sparkles } from 'lucide-react';

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('Hello Manoj Kumar! Software Developer at Insanger.');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compute live conversion
  React.useEffect(() => {
    setError(null);
    if (!input) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(input.trim())));
        setOutput(decoded);
      }
    } catch {
      setError(mode === 'decode' ? 'Invalid Base64 string for decoding.' : 'Encoding error.');
      setOutput('');
    }
  }, [input, mode]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-glass-bright)',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      boxShadow: 'var(--shadow-card)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Hash size={20} style={{ color: 'var(--accent-emerald)' }} />
            <span>Base64 Encoder &amp; Decoder</span>
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Instant client-side encoding and decoding with UTF-8 support.
          </p>
        </div>

        {/* Mode Switcher */}
        <div style={{ display: 'flex', background: 'var(--bg-input)', padding: '4px', borderRadius: '8px', gap: 4 }}>
          <button
            type="button"
            onClick={() => setMode('encode')}
            style={{
              background: mode === 'encode' ? 'var(--text-primary)' : 'transparent',
              color: mode === 'encode' ? 'var(--bg-main)' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            Encode
          </button>
          <button
            type="button"
            onClick={() => setMode('decode')}
            style={{
              background: mode === 'decode' ? 'var(--text-primary)' : 'transparent',
              color: mode === 'decode' ? 'var(--bg-main)' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            Decode
          </button>
        </div>
      </div>

      {/* Grid Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Input ({mode === 'encode' ? 'Plain Text' : 'Base64'})</span>
            <span style={{ fontFamily: 'JetBrains Mono', color: 'var(--text-dim)' }}>{input.length} chars</span>
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste base64 string to decode...'}
            style={{
              width: '100%',
              height: '140px',
              padding: '12px',
              borderRadius: '8px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.82rem',
              resize: 'vertical',
              outline: 'none',
            }}
          />
        </div>

        {/* Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Output ({mode === 'encode' ? 'Base64 Result' : 'Decoded Text'})
            </label>
            {output && (
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  background: 'var(--bg-card-hover)',
                  border: '1px solid var(--border-glass)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  color: copied ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={error ? error : output}
            placeholder="Result will appear here..."
            style={{
              width: '100%',
              height: '140px',
              padding: '12px',
              borderRadius: '8px',
              background: 'var(--bg-input)',
              border: error ? '1px solid #ef4444' : '1px solid var(--border-glass)',
              color: error ? '#ef4444' : 'var(--text-primary)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.82rem',
              resize: 'vertical',
              outline: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
