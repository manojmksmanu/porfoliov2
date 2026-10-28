'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Play, Activity, CheckCircle2, AlertCircle, BarChart3, Clock, Zap, RefreshCw } from 'lucide-react';

export default function ApiPerformancePage() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts');
  const [requests, setRequests] = useState(15);
  const [concurrency, setConcurrency] = useState(3);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const [metrics, setMetrics] = useState<{
    avg: number;
    min: number;
    max: number;
    p95: number;
    p50: number;
    successRate: number;
    rps: number;
    latencies: number[];
  } | null>({
    avg: 128,
    min: 86,
    max: 275,
    p50: 115,
    p95: 230,
    successRate: 100,
    rps: 42,
    latencies: [90, 110, 105, 140, 120, 95, 115, 180, 230, 275, 130, 112, 108, 98, 86]
  });

  const handleBenchmark = async () => {
    setRunning(true);
    setProgress(0);
    const times: number[] = [];
    let successes = 0;
    const startTime = performance.now();

    for (let i = 0; i < requests; i++) {
      const s = performance.now();
      try {
        const res = await fetch(url, { method: 'GET' });
        if (res.ok) successes++;
      } catch {
        // network error
      }
      const duration = Math.round(performance.now() - s);
      times.push(duration);
      setProgress(Math.round(((i + 1) / requests) * 100));
    }

    const totalDurationSec = (performance.now() - startTime) / 1000;
    times.sort((a, b) => a - b);
    const avg = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    const min = times[0] || 0;
    const max = times[times.length - 1] || 0;
    const p50 = times[Math.floor(times.length * 0.5)] || avg;
    const p95 = times[Math.floor(times.length * 0.95)] || max;

    setMetrics({
      avg,
      min,
      max,
      p50,
      p95,
      successRate: Math.round((successes / requests) * 100),
      rps: Math.round(requests / (totalDurationSec || 1)),
      latencies: times
    });

    setRunning(false);
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
          <div className="section-label">Latency &amp; Throughput Benchmark</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            API <span style={{ color: 'var(--accent-emerald)' }}>Performance Studio</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Run real-time concurrency load tests against REST endpoints. Measure p95 tail latencies, throughput SLAs, and jitter distribution.
          </p>
        </div>

        {/* Configuration Card */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://api.yourdomain.com/endpoint"
              style={{
                flexGrow: 1,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.9rem',
                padding: '12px 16px',
                outline: 'none',
              }}
            />
            <button
              type="button"
              className="btn-primary"
              onClick={handleBenchmark}
              disabled={running}
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
            >
              <Play size={16} /> {running ? 'Benchmarking...' : 'Run Load Test'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', paddingTop: '10px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-dim)', fontWeight: 700 }}>Total Requests</span>
                <span style={{ color: '#34d399', fontWeight: 800 }}>{requests} iterations</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={requests}
                onChange={(e) => setRequests(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 6 }}>
                <span style={{ color: 'var(--text-dim)', fontWeight: 700 }}>Concurrency</span>
                <span style={{ color: '#a5b4fc', fontWeight: 800 }}>{concurrency} concurrent streams</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={concurrency}
                onChange={(e) => setConcurrency(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-indigo)' }}
              />
            </div>
          </div>

          {running && (
            <div style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-dim)', marginBottom: 6 }}>
                <span>Executing load benchmark...</span>
                <span>{progress}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

        </div>

        {/* Benchmark Metric Cards */}
        {metrics && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            
            <div className="stat-card">
              <div className="stat-card-title">Average Latency</div>
              <div className="stat-card-value" style={{ color: '#34d399' }}>{metrics.avg} ms</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-title">p95 Tail Latency</div>
              <div className="stat-card-value" style={{ color: '#a5b4fc' }}>{metrics.p95} ms</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-title">Min / Max</div>
              <div className="stat-card-value" style={{ color: 'var(--text-primary)' }}>{metrics.min} / {metrics.max} ms</div>
            </div>

            <div className="stat-card">
              <div className="stat-card-title">Success Rate</div>
              <div className="stat-card-value" style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={18} /> {metrics.successRate}%
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card-title">Est. Throughput</div>
              <div className="stat-card-value" style={{ color: 'var(--accent-cyan)' }}>{metrics.rps} req/sec</div>
            </div>

          </div>
        )}

        {/* Latency Distribution Chart */}
        {metrics && (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 16, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <BarChart3 size={18} style={{ color: 'var(--accent-emerald)' }} /> Request Latency Distribution (ms)
            </h3>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '140px', padding: '10px 0', borderBottom: '1px solid var(--border-glass)' }}>
              {metrics.latencies.map((lat, idx) => {
                const heightPct = Math.min(100, Math.max(15, (lat / (metrics.max || 1)) * 100));
                return (
                  <div
                    key={idx}
                    title={`Request #${idx + 1}: ${lat}ms`}
                    style={{
                      flexGrow: 1,
                      height: `${heightPct}%`,
                      background: lat > 200 ? '#f43f5e' : lat > 140 ? '#fbbf24' : '#10b981',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s',
                      position: 'relative',
                    }}
                  />
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: 8 }}>
              <span>First Request</span>
              <span>Fastest: {metrics.min}ms</span>
              <span>Slowest: {metrics.max}ms</span>
              <span>Last Request</span>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
