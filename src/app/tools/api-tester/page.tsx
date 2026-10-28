'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Send, Clock, CheckCircle2, AlertCircle, Copy, Download, History, Sparkles, Plus, Trash2 } from 'lucide-react';

export default function ApiTesterPage() {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body' | 'auth'>('params');
  
  // Params
  const [queryParams, setQueryParams] = useState<Array<{ key: string; value: string }>>([
    { key: '_limit', value: '5' }
  ]);

  // Headers
  const [headers, setHeaders] = useState<Array<{ key: string; value: string }>>([
    { key: 'Accept', value: 'application/json' }
  ]);

  // Body
  const [bodyText, setBodyText] = useState(`{\n  "title": "foo",\n  "body": "bar",\n  "userId": 1\n}`);

  // Response state
  const [response, setResponse] = useState<string>(`{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
}`);
  const [status, setStatus] = useState<number | null>(200);
  const [latency, setLatency] = useState<number | null>(184);
  const [responseSize, setResponseSize] = useState<string>('292 B');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sample Presets
  const presets = [
    { name: 'JSONPlaceholder (Post #1)', method: 'GET', url: 'https://jsonplaceholder.typicode.com/posts/1' },
    { name: 'PokeAPI (Pikachu)', method: 'GET', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
    { name: 'Rick & Morty (Characters)', method: 'GET', url: 'https://rickandmortyapi.com/api/character/1' },
    { name: 'Create Post (POST Demo)', method: 'POST', url: 'https://jsonplaceholder.typicode.com/posts' },
  ];

  const handleSend = async () => {
    setLoading(true);
    const start = performance.now();

    try {
      // Build URL with query params
      const u = new URL(url);
      queryParams.forEach((p) => {
        if (p.key) u.searchParams.set(p.key, p.value);
      });

      const headerObj: Record<string, string> = {};
      headers.forEach((h) => {
        if (h.key) headerObj[h.key] = h.value;
      });

      const options: RequestInit = {
        method,
        headers: headerObj
      };

      if (method !== 'GET') {
        options.body = bodyText;
      }

      const res = await fetch(u.toString(), options);
      const elapsed = Math.round(performance.now() - start);
      setLatency(elapsed);
      setStatus(res.status);

      const text = await res.text();
      setResponseSize(`${new Blob([text]).size} B`);

      try {
        const json = JSON.parse(text);
        setResponse(JSON.stringify(json, null, 2));
      } catch {
        setResponse(text);
      }
    } catch (err: unknown) {
      setLatency(Math.round(performance.now() - start));
      setStatus(500);
      setResponse(`Error executing request: ${err instanceof Error ? err.message : 'Network error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="section-label">Networking &amp; API Workspace</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            REST &amp; GraphQL <span style={{ color: 'var(--accent-emerald)' }}>API Studio</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
            High-performance browser client to dispatch HTTP requests, configure query params, inspect latency, and analyze responses.
          </p>
        </div>

        {/* Presets Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 700 }}>Quick Sample APIs:</span>
          {presets.map((p) => (
            <button
              key={p.name}
              type="button"
              className="preset-btn"
              onClick={() => {
                setMethod(p.method as typeof method);
                setUrl(p.url);
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Main Request Builder & Response Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
          
          {/* Left Column: Request Builder */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Top Method & URL Input Bar */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as typeof method)}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-accent)',
                  color: 'var(--accent-emerald-light)',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>

              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/v1"
                style={{
                  flexGrow: 1,
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.88rem',
                  padding: '10px 16px',
                  outline: 'none',
                }}
              />

              <button
                type="button"
                className="btn-primary"
                onClick={handleSend}
                disabled={loading}
                style={{ padding: '10px 22px', fontSize: '0.9rem' }}
              >
                <Send size={15} /> {loading ? 'Sending...' : 'Send'}
              </button>
            </div>

            {/* Request Tabs */}
            <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
              {(['params', 'headers', 'body', 'auth'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`method-btn ${activeTab === t ? 'active' : ''}`}
                  onClick={() => setActiveTab(t)}
                  style={{ textTransform: 'capitalize', fontSize: '0.82rem', padding: '6px 14px' }}
                >
                  {t === 'params' ? 'Query Params' : t}
                </button>
              ))}
            </div>

            {/* Tab 1: Params */}
            {activeTab === 'params' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Key-Value Parameters</span>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: '#34d399', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', fontWeight: 700 }}
                    onClick={() => setQueryParams([...queryParams, { key: '', value: '' }])}
                  >
                    <Plus size={12} /> Add Param
                  </button>
                </div>
                {queryParams.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Key"
                      value={p.key}
                      onChange={(e) => {
                        const copy = [...queryParams];
                        copy[idx].key = e.target.value;
                        setQueryParams(copy);
                      }}
                      className="url-input"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={p.value}
                      onChange={(e) => {
                        const copy = [...queryParams];
                        copy[idx].value = e.target.value;
                        setQueryParams(copy);
                      }}
                      className="url-input"
                    />
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer', padding: '4px' }}
                      onClick={() => setQueryParams(queryParams.filter((_, i) => i !== idx))}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Headers */}
            {activeTab === 'headers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Custom HTTP Headers</span>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', color: '#34d399', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', fontWeight: 700 }}
                    onClick={() => setHeaders([...headers, { key: '', value: '' }])}
                  >
                    <Plus size={12} /> Add Header
                  </button>
                </div>
                {headers.map((h, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Header Name (e.g. Authorization)"
                      value={h.key}
                      onChange={(e) => {
                        const copy = [...headers];
                        copy[idx].key = e.target.value;
                        setHeaders(copy);
                      }}
                      className="url-input"
                    />
                    <input
                      type="text"
                      placeholder="Header Value"
                      value={h.value}
                      onChange={(e) => {
                        const copy = [...headers];
                        copy[idx].value = e.target.value;
                        setHeaders(copy);
                      }}
                      className="url-input"
                    />
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer', padding: '4px' }}
                      onClick={() => setHeaders(headers.filter((_, i) => i !== idx))}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Body */}
            {activeTab === 'body' && (
              <div>
                <label style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'block', marginBottom: 6 }}>
                  JSON Payload (for POST / PUT)
                </label>
                <textarea
                  rows={8}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '0.84rem',
                    padding: '12px',
                    outline: 'none',
                  }}
                />
              </div>
            )}

            {/* Tab 4: Auth */}
            {activeTab === 'auth' && (
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                <div style={{ marginBottom: 12 }}>Bearer Token / API Key</div>
                <input
                  type="password"
                  placeholder="Bearer token_eyJhbGciOi..."
                  className="url-input"
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    const filtered = headers.filter((h) => h.key !== 'Authorization');
                    if (e.target.value) {
                      setHeaders([...filtered, { key: 'Authorization', value: `Bearer ${e.target.value}` }]);
                    } else {
                      setHeaders(filtered);
                    }
                  }}
                />
              </div>
            )}

          </div>

          {/* Right Column: Response Inspector */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>Response Output</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {status && (
                  <span className="status-badge-ok" style={{ background: status >= 400 ? 'rgba(244,63,94,0.2)' : undefined, color: status >= 400 ? '#fb7185' : undefined }}>
                    {status} {status === 200 ? 'OK' : ''}
                  </span>
                )}
                {latency !== null && (
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} /> {latency}ms
                  </span>
                )}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{responseSize}</span>
              </div>
            </div>

            <div style={{ flexGrow: 1, minHeight: '340px', background: '#060913', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '16px', overflowY: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: 'JetBrains Mono', fontSize: '0.82rem', color: '#a5b4fc', lineHeight: 1.5 }}>
                {response}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCopy}
                style={{ padding: '8px 16px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Copy size={13} /> {copied ? 'Copied!' : 'Copy Response'}
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  const blob = new Blob([response], { type: 'application/json' });
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(blob);
                  a.download = 'api_response.json';
                  a.click();
                }}
                style={{ padding: '8px 16px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6 }}
              >
                <Download size={13} /> Download JSON
              </button>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
