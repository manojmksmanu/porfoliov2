'use client';

import React, { useState, useEffect } from 'react';
import { GitBranch, AlertCircle, CheckCircle2, Zap, Terminal, Search, Radio, Cpu } from 'lucide-react';

export default function VsCodeStatusBar() {
  const [ping, setPing] = useState(14);

  // Subtle real-time ping simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(11 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <footer 
      className="vscode-status-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '28px',
        background: '#070c17',
        borderTop: '1px solid rgba(16, 185, 129, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        fontSize: '0.73rem',
        fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--text-secondary)',
        zIndex: 9999,
        userSelect: 'none',
      }}
    >
      {/* Left side: Git branch, errors, project info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          type="button"
          onClick={openPalette}
          style={{
            background: 'none',
            border: 'none',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '4px',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 700,
          }}
          title="Git Branch: main (Click to open command palette)"
        >
          <GitBranch size={13} />
          <span>main*</span>
        </button>

        <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981' }}>
            <CheckCircle2 size={12} /> 0 errors
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
            <AlertCircle size={12} /> 0 warnings
          </span>
        </div>

        <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>

        <span style={{ color: 'var(--text-dim)', display: 'none' }} className="status-hide-mobile">
          Insanger &bull; Real-Time Streaming Specialist
        </span>
      </div>

      {/* Middle: Command Palette hint */}
      <button
        type="button"
        onClick={openPalette}
        style={{
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '4px',
          padding: '2px 10px',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          fontSize: '0.7rem',
          fontFamily: 'inherit',
          transition: 'all 0.15s ease',
        }}
        className="status-cmd-btn"
      >
        <Search size={11} style={{ color: 'var(--accent-emerald)' }} />
        <span>Quick Command Palette</span>
        <kbd style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1px 4px', borderRadius: '3px', fontSize: '0.65rem' }}>
          ⌘K
        </kbd>
      </button>

      {/* Right side: Telemetry stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#38bdf8' }}>
          <Radio size={12} className="pulse-dot" />
          <span>{ping}ms</span>
        </span>

        <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>

        <span style={{ color: 'var(--text-dim)' }} className="status-hide-mobile">
          Node v20.18 &bull; Next.js 15
        </span>

        <span style={{ color: 'rgba(255, 255, 255, 0.15)' }}>|</span>

        <span style={{ color: '#34d399', fontWeight: 700 }}>
          UTF-8
        </span>
      </div>
    </footer>
  );
}
