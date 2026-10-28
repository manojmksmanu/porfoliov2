'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Sparkles, Radio, Cpu, ArrowRight } from 'lucide-react';

export default function CreativeIntro() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const bootLogs = [
    { text: 'SYS_BOOT: Initializing Manoj Kumar Developer Studio...', color: 'var(--accent-cyan)' },
    { text: 'RTC_ENGINE: Linking ZEGOCLOUD & Agora RTC 48kHz audio mesh...', color: 'var(--accent-emerald)' },
    { text: 'DIST_QUEUES: BullMQ & Redis worker clusters synchronized...', color: 'var(--accent-purple)' },
    { text: 'METRICS: Verified 70,000+ downloads production platform...', color: '#fbbf24' },
    { text: 'INTERFACE: Rendering Cyber-Matrix obsidian workspace...', color: '#ffffff' },
    { text: 'STATUS: All systems operational. Launching studio...', color: 'var(--accent-emerald-light)' },
  ];

  const handleComplete = () => {
    setFading(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('mk_intro_shown', 'true');
    }, 500);
  };

  useEffect(() => {
    // Check if intro has already been shown in this session
    const hasShown = sessionStorage.getItem('mk_intro_shown');
    if (!hasShown) {
      setVisible(true);
    }

    // Allow manual replay via custom event
    const handleReplay = () => {
      setProgress(0);
      setCurrentLogIndex(0);
      setFading(false);
      setVisible(true);
    };

    window.addEventListener('replay-intro', handleReplay);
    return () => window.removeEventListener('replay-intro', handleReplay);
  }, []);

  // Animate progress and terminal logs
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(handleComplete, 350);
          return 100;
        }
        // Smooth non-linear progress
        const step = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + step, 100);

        // Update log index based on progress
        const logIdx = Math.min(
          Math.floor((next / 100) * bootLogs.length),
          bootLogs.length - 1
        );
        setCurrentLogIndex(logIdx);

        return next;
      });
    }, 45);

    // Escape key skips intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#06080e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Background Cyber Grid & Radiant Ambient Aura */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(0, 242, 254, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 242, 254, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
          filter: 'blur(70px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Skip Intro Button */}
      <button
        type="button"
        onClick={handleComplete}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: 'var(--text-secondary)',
          borderRadius: '999px',
          padding: '6px 14px',
          fontSize: '0.76rem',
          fontFamily: 'JetBrains Mono, monospace',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 10,
          transition: 'all 0.2s ease',
        }}
      >
        <span>Skip [Esc]</span>
        <ArrowRight size={12} />
      </button>

      {/* Central Holographic Emblem */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          maxWidth: '560px',
          width: '100%',
          zIndex: 2,
        }}
      >
        {/* Glowing Monogram Ring */}
        <div style={{ position: 'relative', width: '90px', height: '90px' }}>
          <div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              border: '2px dashed rgba(0, 242, 254, 0.4)',
              animation: 'spin 12s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: '-16px',
              borderRadius: '50%',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              animation: 'spinReverse 18s linear infinite',
            }}
          />

          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.25), rgba(16, 185, 129, 0.25))',
              border: '2px solid var(--accent-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 35px rgba(0, 242, 254, 0.45)',
            }}
          >
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '1.8rem',
                fontWeight: 900,
                letterSpacing: '-0.05em',
                color: '#fff',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
              }}
            >
              MK
            </span>
          </div>
        </div>

        {/* Title & Identity */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: '1.6rem',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              marginBottom: '4px',
            }}
          >
            Manoj Kumar
          </h1>
          <div
            style={{
              fontSize: '0.84rem',
              color: 'var(--accent-emerald)',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
            }}
          >
            Real-Time Systems &amp; Software Developer Studio
          </div>
        </div>

        {/* Progress Bar & Telemetry Percentage */}
        <div style={{ width: '100%', marginTop: '8px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
            }}
          >
            <span style={{ color: 'var(--text-dim)' }}>INITIALIZING RUNTIME</span>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>{progress}%</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald))',
                borderRadius: '999px',
                boxShadow: '0 0 15px rgba(0, 242, 254, 0.8)',
                transition: 'width 0.08s ease',
              }}
            />
          </div>
        </div>

        {/* High-Tech Terminal Boot Console Logs */}
        <div
          style={{
            width: '100%',
            background: 'rgba(11, 16, 28, 0.75)',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            borderRadius: '12px',
            padding: '14px 18px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            lineHeight: 1.6,
            minHeight: '74px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-dim)', marginBottom: '4px' }}>
            <span className="pulse-dot" style={{ width: 6, height: 6 }} />
            <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>BOOT CONSOLE STREAM</span>
          </div>

          <div style={{ color: bootLogs[currentLogIndex]?.color || '#fff' }}>
            &gt; {bootLogs[currentLogIndex]?.text}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
