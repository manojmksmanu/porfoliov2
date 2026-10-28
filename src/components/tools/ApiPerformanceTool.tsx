'use client';

import React, { useState } from 'react';
import { Activity, Play, CheckCircle2 } from 'lucide-react';

export default function ApiPerformanceTool() {
  const [targetUrl, setTargetUrl] = useState('https://jsonplaceholder.typicode.com/posts');
  const [requestsCount, setRequestsCount] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<{
    avgLatency: number;
    minLatency: number;
    maxLatency: number;
    p95: number;
    successRate: number;
  } | null>({
    avgLatency: 145,
    minLatency: 92,
    maxLatency: 280,
    p95: 240,
    successRate: 100
  });

  const runBenchmark = async () => {
    setIsRunning(true);
    const latencies: number[] = [];
    let success = 0;

    for (let i = 0; i < requestsCount; i++) {
      const start = performance.now();
      try {
        const res = await fetch(targetUrl, { method: 'GET' });
        if (res.ok) success++;
      } catch {
        // catch error
      }
      const duration = Math.round(performance.now() - start);
      latencies.push(duration);
    }

    latencies.sort((a, b) => a - b);
    const avg = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
    const min = latencies[0] || 0;
    const max = latencies[latencies.length - 1] || 0;
    const p95 = latencies[Math.floor(latencies.length * 0.95)] || max;

    setResults({
      avgLatency: avg,
      minLatency: min,
      maxLatency: max,
      p95,
      successRate: Math.round((success / requestsCount) * 100)
    });
    setIsRunning(false);
  };

  return (
    <div className="tool-dock-card" id="tool-api-performance">
      <div className="tool-dock-header">
        <div className="tool-dock-title-group">
          <div className="tool-dock-icon">
            <Activity size={16} />
          </div>
          <div>
            <div className="tool-dock-title">API Performance</div>
            <div className="tool-dock-subtitle">Load test your APIs and check latency benchmarks.</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          className="url-input"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          placeholder="https://api.endpoint.com"
        />
        <button
          type="button"
          className="btn-send"
          onClick={runBenchmark}
          disabled={isRunning}
        >
          <Play size={12} /> {isRunning ? 'Testing...' : 'Benchmark'}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
        <span style={{ color: 'var(--text-dim)' }}>Sample Iterations:</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[5, 10, 20].map((n) => (
            <button
              key={n}
              type="button"
              className={`method-btn ${requestsCount === n ? 'active' : ''}`}
              onClick={() => setRequestsCount(n)}
            >
              {n} requests
            </button>
          ))}
        </div>
      </div>

      {results && (
        <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-sm)', padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Avg Latency</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono' }}>{results.avgLatency}ms</div>
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>p95 Latency</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>{results.p95}ms</div>
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Min / Max</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>{results.minLatency} / {results.maxLatency}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Success</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <CheckCircle2 size={12} /> {results.successRate}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
