'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Download, Github, Linkedin, Mail, Phone, Play, 
  Layers, Sparkles, Terminal, Activity, FileCode, Search, Radio, Check, 
  Cpu, FileJson, Wrench, ChevronRight, Folder, FolderOpen
} from 'lucide-react';
import DevTerminal from './DevTerminal';
import SystemArchitecture from './SystemArchitecture';
import DevTabs from './DevTabs';

export default function Hero() {
  const [activeVsTab, setActiveVsTab] = useState<'overview' | 'engine' | 'experience' | 'terminal'>('overview');

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <section className="editorial-hero-section" id="about">
      {/* Editorial Headline & Introduction matching user reference design */}
      <div className="editorial-hero-intro">
        {/* Status Chip */}
        <div className="editorial-status-pill">
          <span className="pulse-dot"></span>
          <span>Available for Software Engineering Roles &bull; Noida, India (UTC+5:30)</span>
        </div>

        {/* Big Bold Headline inspired by reference design */}
        <h1 className="editorial-hero-title">
          Manoj Kumar builds <span className="highlight-tag">real-time</span>, high-concurrency systems.
        </h1>

        {/* Subtitle description */}
        <p className="editorial-hero-desc">
          Software Developer specialized in <strong>backend services, WebSockets, live audio/video streaming architectures</strong> (ZEGOCLOUD / Agora), and distributed Redis / BullMQ worker queues.
          Contributed to 4+ live-streaming &amp; entertainment apps, including a flagship production platform with <span className="stat-highlight">70,000+ Google Play downloads</span>.
        </p>

        {/* CTA Actions */}
        <div className="editorial-btn-row">
          <Link href="/projects" className="btn-editorial-primary">
            Explore Work (70K+ App) <ArrowRight size={16} />
          </Link>
          <Link href="/tools" className="btn-editorial-secondary">
            <Wrench size={16} style={{ color: 'var(--accent-emerald)' }} /> Launch Dev Tools
          </Link>
          <a
            href="mailto:manoj2022019@gmail.com?subject=Job%20Inquiry%20for%20Manoj%20Kumar"
            className="btn-editorial-secondary"
          >
            <Mail size={16} /> Hire Manoj
          </a>
          <a
            href="tel:+919667328778"
            className="btn-editorial-secondary font-mono"
          >
            <Phone size={15} style={{ color: 'var(--accent-emerald)' }} /> +91 9667328778
          </a>
        </div>

        {/* Key Metrics Strip */}
        <div className="hero-metrics-strip">
          <div className="metric-chip">
            <span className="metric-num">70K+</span>
            <span className="metric-label">App Downloads</span>
          </div>
          <div className="metric-chip">
            <span className="metric-num">4+</span>
            <span className="metric-label">Live Streaming Apps</span>
          </div>
          <div className="metric-chip">
            <span className="metric-num">&lt;40ms</span>
            <span className="metric-label">WebSocket Latency</span>
          </div>
          <div className="metric-chip">
            <span className="metric-num">3+ Yrs</span>
            <span className="metric-label">Production Code</span>
          </div>
        </div>
      </div>

      {/* Developer Profile & Architecture Preview Card */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-glass-bright)',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: 'var(--shadow-card)',
        marginTop: '12px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(220px, 1fr)', gap: '28px', alignItems: 'center' }}>
          {/* Left Info Pane */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-glass)',
              borderRadius: '10px',
              padding: '16px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.82rem',
              lineHeight: 1.65,
              color: 'var(--text-primary)',
            }}>
              <span style={{ color: 'var(--text-dim)' }}>// Production Software Engineer Config</span>
              <br />
              <span style={{ color: 'var(--accent-cyan)' }}>export const</span>{' '}
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>manojKumar</span> = &#123;
              <br />
              &nbsp;&nbsp;role: <span style={{ color: 'var(--accent-emerald-light)' }}>&quot;Software Developer&quot;</span>,
              <br />
              &nbsp;&nbsp;company: <span style={{ color: 'var(--accent-emerald-light)' }}>&quot;Insanger Private Limited&quot;</span>,
              <br />
              &nbsp;&nbsp;location: <span style={{ color: 'var(--text-secondary)' }}>&quot;Noida, India (UTC+5:30)&quot;</span>,
              <br />
              &nbsp;&nbsp;flagshipApp: <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>&quot;70,000+ Downloads (Google Play)&quot;</span>,
              <br />
              &nbsp;&nbsp;rtcEngines: [<span style={{ color: 'var(--accent-cyan)' }}>&quot;ZEGOCLOUD&quot;</span>, <span style={{ color: 'var(--accent-cyan)' }}>&quot;Agora&quot;</span>],
              <br />
              &nbsp;&nbsp;queues: [<span style={{ color: 'var(--accent-purple)' }}>&quot;BullMQ&quot;</span>, <span style={{ color: 'var(--accent-purple)' }}>&quot;Redis Cluster&quot;</span>]
              <br />
              &#125;;
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Node.js', 'Socket.IO', 'ZEGOCLOUD', 'Agora RTC', 'Redis Pub/Sub', 'BullMQ', 'React Native', 'Next.js 15'].map((t) => (
                <span key={t} className="tag-chip" style={{ fontSize: '0.74rem', padding: '4px 10px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', fontWeight: 600 }}>{t}</span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px' }}>
              <Link href="/projects" style={{ color: 'var(--accent-emerald)', fontSize: '0.86rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                View 70K+ Streaming App Architecture ➔
              </Link>
            </div>
          </div>

          {/* Right Avatar Deck */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
            <div className="vscode-avatar-frame" style={{ width: '130px', height: '130px', borderRadius: '50%', border: '3px solid var(--accent-emerald)', overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/developer_avatar.jpg"
                alt="Manoj Kumar - Software Developer"
                className="vscode-avatar-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>Manoj Kumar</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono', fontWeight: 700, marginTop: 2 }}>
                Software Developer @ Insanger
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: 4 }}>
                BCA Degree &bull; Glocal University (2021 – 2024)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
