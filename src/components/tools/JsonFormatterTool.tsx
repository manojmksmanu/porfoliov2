'use client';

import React, { useState } from 'react';
import { Braces, Copy, Check, Minimize2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function JsonFormatterTool() {
  const [inputJson, setInputJson] = useState(`{"name":"John","age":25,"skills":["Node.js","React"]}`);
  const [outputJson, setOutputJson] = useState(`{
  "name": "John",
  "age": 25,
  "skills": [
    "Node.js",
    "React"
  ]
}`);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setOutputJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setOutputJson(JSON.stringify(parsed));
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(inputJson);
      setError(null);
      alert('Valid JSON syntax! ✅');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tool-dock-card" id="tool-json-formatter">
      <div className="tool-dock-header">
        <div className="tool-dock-title-group">
          <div className="tool-dock-icon">
            <Braces size={16} />
          </div>
          <div>
            <div className="tool-dock-title">JSON Formatter</div>
            <div className="tool-dock-subtitle">Format, validate, minify and convert JSON.</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginBottom: 4, fontWeight: 700 }}>Input JSON</div>
          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            style={{
              width: '100%',
              height: '110px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              padding: '8px',
              outline: 'none',
              resize: 'none',
            }}
          />
        </div>

        <div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginBottom: 4, fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
            <span>Formatted JSON</span>
            {error && <span style={{ color: '#fb7185' }}>Invalid syntax</span>}
          </div>
          <div
            style={{
              width: '100%',
              height: '110px',
              background: 'var(--bg-input)',
              border: `1px solid ${error ? 'rgba(244,63,94,0.4)' : 'var(--border-glass)'}`,
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              padding: '8px',
              overflowY: 'auto',
            }}
          >
            <pre style={{ margin: 0 }}>{error ? `// Error: ${error}` : outputJson}</pre>
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={handleFormat}
          style={{
            background: 'var(--accent-emerald)',
            color: '#070a12',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Sparkles size={12} /> Format
        </button>

        <button
          type="button"
          onClick={handleMinify}
          style={{
            background: 'var(--bg-card-hover)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-glass)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Minimize2 size={12} /> Minify
        </button>

        <button
          type="button"
          onClick={handleValidate}
          style={{
            background: 'var(--bg-card-hover)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-glass)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <CheckCircle2 size={12} /> Validate
        </button>

        <button
          type="button"
          onClick={handleCopy}
          style={{
            background: copied ? 'rgba(16,185,129,0.2)' : 'var(--bg-card-hover)',
            color: copied ? 'var(--accent-emerald)' : 'var(--text-primary)',
            border: '1px solid var(--border-glass)',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            marginLeft: 'auto',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
