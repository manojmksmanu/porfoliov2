'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench, Mail, Phone, Download, Radio, ShieldCheck, Cpu, Activity, ExternalLink, Github, Linkedin, Sparkles } from 'lucide-react';
import LiveStreamSimulator from './LiveStreamSimulator';

export default function CyberHero() {
  return (
    <section id="hero" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Top Banner: Status + Intro + Metrics */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Availability Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '999px',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: 'var(--accent-emerald-light)',
          width: 'fit-content',
        }}>
          <span className="pulse-dot" />
          <span>Available for High-Impact Software Engineering Roles &bull; Noida, India (UTC+5:30)</span>
        </div>

        {/* Big Bold Headline with Gradient Accents */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.04em',
          color: 'var(--text-primary)',
          maxWidth: '1050px',
        }}>
          Engineering{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}>
            ultra-low latency
          </span>{' '}
          real-time live streaming &amp; high-concurrency systems.
        </h1>

        {/* Detailed Professional Summary */}
        <p style={{
          fontSize: '1.12rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '840px',
        }}>
          I&apos;m <strong style={{ color: 'var(--text-primary)' }}>Manoj Kumar</strong>, a Software Developer in Noida specializing in{' '}
          <strong style={{ color: 'var(--accent-emerald-light)' }}>ZEGOCLOUD &amp; Agora RTC</strong> audio/video pipelines, Socket.IO multi-room presence clusters, and distributed BullMQ/Redis worker queues. Key contributor to platforms with{' '}
          <span style={{
            color: 'var(--accent-cyan)',
            fontWeight: 800,
            background: 'rgba(0, 242, 254, 0.1)',
            padding: '2px 8px',
            borderRadius: '6px',
            border: '1px solid rgba(0, 242, 254, 0.25)',
          }}>
            70,000+ Google Play Downloads
          </span>.
        </p>

        {/* Action Buttons Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginTop: '6px',
        }}>
          <a
            href="#projects"
            style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)',
              color: '#04111d',
              border: 'none',
              padding: '13px 26px',
              borderRadius: '999px',
              fontSize: '0.94rem',
              fontWeight: 800,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(0, 242, 254, 0.35)',
              transition: 'var(--transition)',
            }}
          >
            Explore 70K+ App Work <ArrowRight size={16} />
          </a>

          <a
            href="#tools"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass-bright)',
              color: 'var(--text-primary)',
              padding: '13px 22px',
              borderRadius: '999px',
              fontSize: '0.92rem',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition)',
            }}
          >
            <Wrench size={16} style={{ color: 'var(--accent-emerald)' }} /> Launch Dev Tools Studio
          </a>

          <a
            href="mailto:manoj2022019@gmail.com?subject=Job%20Inquiry%20for%20Manoj%20Kumar"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)',
              padding: '13px 20px',
              borderRadius: '999px',
              fontSize: '0.92rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition)',
            }}
          >
            <Mail size={16} /> Hire Manoj
          </a>

          <a
            href="tel:+919667328778"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass)',
              color: 'var(--text-secondary)',
              padding: '13px 18px',
              borderRadius: '999px',
              fontSize: '0.88rem',
              fontFamily: 'JetBrains Mono',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'var(--transition)',
            }}
          >
            <Phone size={14} style={{ color: 'var(--accent-emerald)' }} /> +91 9667328778
          </a>
        </div>

        {/* Real Metrics Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginTop: '10px',
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', letterSpacing: '-0.03em' }}>
              70,000+
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '2px' }}>
              Google Play Downloads (Live App)
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono', letterSpacing: '-0.03em' }}>
              &lt; 40 ms
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '2px' }}>
              Socket.IO Cluster Latency
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-purple)', fontFamily: 'JetBrains Mono', letterSpacing: '-0.03em' }}>
              4+ Apps
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '2px' }}>
              Live Streaming &amp; Production Services
            </div>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'JetBrains Mono', letterSpacing: '-0.03em' }}>
              99.9%
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '2px' }}>
              Payroll &amp; Microservices SLA
            </div>
          </div>
        </div>
      </div>

      {/* Centerpiece: Split Live Simulator + Developer Profile Hub */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.45fr) minmax(300px, 1fr)',
        gap: '24px',
        alignItems: 'stretch',
      }}>
        {/* Left: The Showstopper Interactive Live Streaming & Spectrum Engine */}
        <div>
          <LiveStreamSimulator />
        </div>

        {/* Right: Developer Identity & Production Stack Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glass-bright)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px',
        }}>
          {/* Header Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '50%',
              border: '2px solid var(--accent-cyan)',
              overflow: 'hidden',
              boxShadow: '0 0 20px rgba(0, 242, 254, 0.3)',
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/developer_avatar.jpg"
                alt="Manoj Kumar - Software Developer"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Manoj Kumar
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono', fontWeight: 700, marginTop: '2px' }}>
                Software Developer @ Insanger
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                BCA Degree &bull; Glocal University (2021 &ndash; 2024)
              </div>
            </div>
          </div>

          {/* Code Spec Box */}
          <div style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-glass)',
            borderRadius: '12px',
            padding: '14px 16px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.78rem',
            lineHeight: 1.7,
            color: 'var(--text-primary)',
          }}>
            <div style={{ color: 'var(--text-dim)' }}>// Production Engineer Specs</div>
            <div>
              <span style={{ color: 'var(--accent-cyan)' }}>const</span>{' '}
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>manoj</span> = &#123;
            </div>
            <div style={{ paddingLeft: '14px' }}>
              role: <span style={{ color: '#fbbf24' }}>&quot;Software Developer&quot;</span>,
            </div>
            <div style={{ paddingLeft: '14px' }}>
              currentApp: <span style={{ color: 'var(--accent-cyan)' }}>&quot;70K+ Google Play App&quot;</span>,
            </div>
            <div style={{ paddingLeft: '14px' }}>
              rtcMedia: [<span style={{ color: 'var(--accent-emerald)' }}>&quot;ZEGOCLOUD&quot;</span>, <span style={{ color: 'var(--accent-emerald)' }}>&quot;Agora RTC&quot;</span>],
            </div>
            <div style={{ paddingLeft: '14px' }}>
              distributedQueues: [<span style={{ color: 'var(--accent-purple)' }}>&quot;BullMQ&quot;</span>, <span style={{ color: 'var(--accent-purple)' }}>&quot;Redis Pub/Sub&quot;</span>],
            </div>
            <div style={{ paddingLeft: '14px' }}>
              backendTech: [<span style={{ color: '#38bdf8' }}>&quot;Node.js&quot;</span>, <span style={{ color: '#38bdf8' }}>&quot;Socket.IO&quot;</span>, <span style={{ color: '#38bdf8' }}>&quot;Postgres&quot;</span>]
            </div>
            <div>&#125;;</div>
          </div>

          {/* Quick Skill Tags */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['ZEGOCLOUD', 'Agora RTC', 'Socket.IO', 'BullMQ', 'Redis', 'Node.js', 'React Native', 'Next.js 15', 'PostgreSQL'].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  fontFamily: 'JetBrains Mono',
                  padding: '4px 8px',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '6px',
                  color: 'var(--text-secondary)',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Resume & Social Links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-glass)',
          }}>
            <a
              href="mailto:manoj2022019@gmail.com?subject=Resume%20Request%20for%20Manoj%20Kumar"
              style={{
                fontSize: '0.82rem',
                color: 'var(--accent-emerald)',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Download size={14} /> Request Full PDF Resume
            </a>

            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href="https://github.com/manojmksmanu"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
                title="GitHub Profile"
              >
                <Github size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                }}
                title="LinkedIn Profile"
              >
                <Linkedin size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
