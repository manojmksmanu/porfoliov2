'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CyberHero from './CyberHero';
import SystemArchitecture from './SystemArchitecture';
import ProjectsSection from './ProjectsSection';
import InteractiveDevWorkbench from './InteractiveDevWorkbench';
import ExperienceSection from './ExperienceSection';
import DevTerminal from './DevTerminal';
import ContactCTA from './ContactCTA';
import Footer from './Footer';
import { Radio, Layers, Wrench, Briefcase, Terminal, Mail, Sparkles, Activity, ShieldCheck, ChevronUp } from 'lucide-react';

export default function CreativePortfolio() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <div className="creative-portfolio-wrapper" style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Dynamic Ambient Background Orbs */}
      <div style={{
        position: 'fixed',
        top: '-150px',
        left: '-150px',
        width: '550px',
        height: '550px',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'fixed',
        top: '20%',
        right: '-180px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(90px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'fixed',
        bottom: '10%',
        left: '20%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Main Content Container */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 24px 120px',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '64px',
      }}>
        {/* Floating Glass Navigation */}
        <Navbar />

        {/* 1. Cyber Hero with Live Audio Spectrum & Stream Simulator */}
        <CyberHero />

        {/* 2. Interactive Live System Architecture Topology */}
        <section id="architecture">
          <div style={{ marginBottom: '24px' }}>
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Radio size={13} />
              <span>Real-Time Streaming Infrastructure</span>
            </div>
            <h2 className="section-title">
              Distributed <span style={{ color: 'var(--accent-cyan)' }}>System Architecture</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '720px', marginTop: 6, lineHeight: 1.5 }}>
              Production topology engineered for 9-seat audio mixing, sub-40ms WebSocket synchronization, and background BullMQ coin transactions.
            </p>
          </div>

          <SystemArchitecture />
        </section>

        {/* 3. Featured Production Projects (70K+ App Work) */}
        <ProjectsSection />

        {/* 4. Live Developer Tools Studio Workbench */}
        <InteractiveDevWorkbench />

        {/* 5. Career Milestones & Experience Timeline */}
        <ExperienceSection />

        {/* 6. Interactive Developer Console Terminal */}
        <section id="terminal">
          <div style={{ marginBottom: '20px' }}>
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Terminal size={13} />
              <span>Interactive Command Shell</span>
            </div>
            <h2 className="section-title">
              Developer <span style={{ color: 'var(--accent-emerald)' }}>Console Station</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: 4 }}>
              Inspect live systems, query tech stacks, and run commands in real time.
            </p>
          </div>

          <DevTerminal />
        </section>

        {/* 7. Contact CTA & Availability */}
        <ContactCTA />

        {/* 8. Footer */}
        <Footer />
      </div>

      {/* Floating Modern Interactive HUD Dock */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90,
        background: 'rgba(11, 16, 28, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        border: '1px solid var(--border-glass-bright)',
        borderRadius: '999px',
        padding: '6px 14px',
        boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        maxWidth: '92vw',
        overflowX: 'auto',
      }}>
        {/* Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          background: 'rgba(16, 185, 129, 0.12)',
          borderRadius: '999px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          fontSize: '0.74rem',
          fontFamily: 'JetBrains Mono',
          color: 'var(--accent-emerald-light)',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          <span className="pulse-dot" style={{ width: 6, height: 6 }} />
          <span>70K+ APP ACTIVE</span>
        </div>

        {/* Quick Nav Anchors */}
        <a
          href="#hero"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            fontWeight: 600,
            textDecoration: 'none',
            padding: '6px 10px',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            transition: 'var(--transition)',
          }}
        >
          Overview
        </a>

        <a
          href="#architecture"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            fontWeight: 600,
            textDecoration: 'none',
            padding: '6px 10px',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            transition: 'var(--transition)',
          }}
        >
          Architecture
        </a>

        <a
          href="#projects"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            fontWeight: 600,
            textDecoration: 'none',
            padding: '6px 10px',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            transition: 'var(--transition)',
          }}
        >
          Work (70K+)
        </a>

        <a
          href="#tools"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            fontWeight: 600,
            textDecoration: 'none',
            padding: '6px 10px',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            transition: 'var(--transition)',
          }}
        >
          Dev Tools
        </a>

        <a
          href="#experience"
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.78rem',
            fontWeight: 600,
            textDecoration: 'none',
            padding: '6px 10px',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
            transition: 'var(--transition)',
          }}
        >
          Experience
        </a>

        {/* Replay Intro Action */}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('replay-intro'))}
          style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-glass)',
            color: 'var(--accent-emerald)',
            borderRadius: '999px',
            padding: '5px 10px',
            fontSize: '0.74rem',
            fontFamily: 'JetBrains Mono',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          title="Replay Cinematic Intro Splash"
        >
          <Radio size={12} />
          <span>Intro</span>
        </button>

        {/* Quick Command Palette Button */}
        <button
          type="button"
          onClick={openPalette}
          style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-primary)',
            borderRadius: '999px',
            padding: '5px 10px',
            fontSize: '0.74rem',
            fontFamily: 'JetBrains Mono',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          title="Open Command Center (⌘K)"
        >
          <Sparkles size={12} style={{ color: 'var(--accent-cyan)' }} />
          <span>⌘K</span>
        </button>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            type="button"
            onClick={scrollToTop}
            style={{
              background: 'var(--accent-cyan)',
              color: '#04111d',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            title="Scroll to top"
          >
            <ChevronUp size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
