'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function ApiTesterTool() {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [activeTab, setActiveTab] = useState<'Params' | 'Headers' | 'Body' | 'Auth'>('Params');
  const [response, setResponse] = useState<string | null>(`{
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
  "userId": 1
}`);
  const [statusCode, setStatusCode] = useState<number | null>(200);
  const [latency, setLatency] = useState<number | null>(320);
  const [loading, setLoading] = useState(false);

  const handleSendRequest = async () => {
    if (!url) return;
    setLoading(true);
    const startTime = performance.now();

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
      });
      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTime);
      setLatency(elapsed);
      setStatusCode(res.status);

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(JSON.stringify(data, null, 2));
      } else {
        const text = await res.text();
        setResponse(text.slice(0, 1000));
      }
    } catch (err: unknown) {
      const elapsed = Math.round(performance.now() - startTime);
      setLatency(elapsed);
      setStatusCode(500);
      setResponse(`Error: ${err instanceof Error ? err.message : 'Request failed'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-dock-card" id="tool-api-tester">
      <div className="tool-dock-header">
        <div className="tool-dock-title-group">
          <div className="tool-dock-icon">
            <Send size={16} />
          </div>
          <div>
            <div className="tool-dock-title">API Tester</div>
            <div className="tool-dock-subtitle">Test your APIs, view response time, headers, and more.</div>
          </div>
        </div>
      </div>

      {/* Methods */}
      <div className="method-pills">
        {(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const).map((m) => (
          <button
            key={m}
            type="button"
            className={`method-btn ${method === m ? 'active' : ''}`}
            onClick={() => setMethod(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {/* URL Input Bar */}
      <div className="url-input-bar">
        <input
          type="text"
          className="url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/v1/resource"
        />
        <button
          type="button"
          className="btn-send"
          onClick={handleSendRequest}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      {/* Sub Tabs */}
      <div style={{ display: 'flex', gap: '12px', fontSize: '0.76rem', color: 'var(--text-dim)', borderBottom: '1px solid var(--border-glass)', paddingBottom: '6px' }}>
        {(['Params', 'Headers', 'Body', 'Auth'] as const).map((tab) => (
          <span
            key={tab}
            style={{
              cursor: 'pointer',
              color: activeTab === tab ? '#34d399' : 'inherit',
              fontWeight: activeTab === tab ? 700 : 500,
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Response Box */}
      <div>
        <div className="response-status-bar">
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Response Payload</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {statusCode && (
              <span className="status-badge-ok" style={{ background: statusCode >= 400 ? 'rgba(244,63,94,0.2)' : undefined, color: statusCode >= 400 ? '#fb7185' : undefined }}>
                {statusCode >= 400 ? <AlertCircle size={10} style={{ display: 'inline', marginRight: 4 }} /> : <CheckCircle2 size={10} style={{ display: 'inline', marginRight: 4 }} />}
                {statusCode} {statusCode === 200 ? 'OK' : ''}
              </span>
            )}
            {latency !== null && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-dim)' }}>
                <Clock size={10} /> {latency} ms
              </span>
            )}
          </div>
        </div>

        <div className="response-pane" style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-glass)' }}>
          <pre style={{ margin: 0, fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{response || '// No response yet. Click Send Request.'}</pre>
        </div>
      </div>
    </div>
  );
}
