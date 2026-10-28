'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Minimize2, CheckCircle2, Copy, Download, Braces, RefreshCw, Layers } from 'lucide-react';

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState(`{
  "user": {
    "id": 1042,
    "name": "Ankit Kumar",
    "email": "ankit@cloudscale.dev",
    "roles": ["admin", "developer"],
    "metrics": {
      "projectsCompleted": 24,
      "uptimeSLA": 99.98,
      "rating": 5.0
    }
  },
  "timestamp": "2026-10-24T22:30:00Z",
  "active": true
}`);
  const [outputJson, setOutputJson] = useState('');
  const [indent, setIndent] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ keys: 7, size: '286 B' });

  React.useEffect(() => {
    formatJson(inputJson, indent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indent]);

  const formatJson = (val: string, spaces: number) => {
    try {
      const parsed = JSON.parse(val);
      const formatted = JSON.stringify(parsed, null, spaces);
      setOutputJson(formatted);
      setError(null);

      // count keys
      const keyCount = (val.match(/"[^"]+":/g) || []).length;
      setStats({
        keys: keyCount,
        size: `${new Blob([formatted]).size} B`,
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputJson || inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputJson || inputJson], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'formatted_data.json';
    a.click();
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 80px' }}>
      <Navbar />

      <main style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Header */}
        <div>
          <Link href="/tools" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to Tools Hub
          </Link>
          <div className="section-label">Data &amp; Serialization Studio</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            JSON <span style={{ color: 'var(--accent-emerald)' }}>Formatter &amp; Validator</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Format raw JSON strings into pristine human-readable trees, minify payloads for production, and detect syntax errors with line-accurate precision.
          </p>
        </div>

        {/* Toolbar & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '14px 20px' }}>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button type="button" className="btn-primary" onClick={() => formatJson(inputJson, indent)} style={{ padding: '8px 18px', fontSize: '0.84rem' }}>
              <Sparkles size={14} /> Format JSON
            </button>
            <button type="button" className="btn-secondary" onClick={handleMinify} style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
              <Minimize2 size={14} /> Minify / One-Line
            </button>
            <button type="button" className="btn-secondary" onClick={() => alert(error ? `Syntax Error: ${error}` : 'JSON is 100% valid!')} style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
              <CheckCircle2 size={14} /> Validate
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>Indent:</span>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="select-custom"
              style={{ padding: '4px 8px', fontSize: '0.82rem' }}
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
            </select>

            <button type="button" className="btn-secondary" onClick={handleCopy} style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
              <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
            </button>
            <button type="button" className="btn-secondary" onClick={handleDownload} style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
              <Download size={13} /> Export .json
            </button>
          </div>

        </div>

        {/* Dual Editor Split Pane */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Left: Input Pane */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Input Raw JSON</span>
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: 'var(--accent-emerald)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                onClick={() => setInputJson(`{\n  "status": "success",\n  "code": 200,\n  "data": [\n    {"id": 1, "name": "Alpha"},\n    {"id": 2, "name": "Beta"}\n  ]\n}`)}
              >
                Load Sample Payload
              </button>
            </div>

            <textarea
              value={inputJson}
              onChange={(e) => {
                setInputJson(e.target.value);
                formatJson(e.target.value, indent);
              }}
              placeholder="Paste or write JSON here..."
              style={{
                width: '100%',
                height: '420px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.84rem',
                padding: '14px',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>

          {/* Right: Output / Visualizer Pane */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Formatted Output</span>
              <div style={{ display: 'flex', gap: 12, fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                <span>Keys: <strong style={{ color: 'var(--text-primary)' }}>{stats.keys}</strong></span>
                <span>Size: <strong style={{ color: 'var(--accent-emerald)' }}>{stats.size}</strong></span>
              </div>
            </div>

            <div
              style={{
                width: '100%',
                height: '420px',
                background: '#060913',
                border: `1px solid ${error ? 'rgba(244,63,94,0.4)' : 'var(--border-glass)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                overflowY: 'auto',
              }}
            >
              {error ? (
                <div style={{ color: '#fb7185', fontFamily: 'JetBrains Mono', fontSize: '0.84rem' }}>
                  ❌ Syntax Error: {error}
                </div>
              ) : (
                <pre style={{ margin: 0, fontFamily: 'JetBrains Mono', fontSize: '0.84rem', color: '#34d399', lineHeight: 1.5 }}>
                  {outputJson || '// Formatted output will appear here'}
                </pre>
              )}
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
