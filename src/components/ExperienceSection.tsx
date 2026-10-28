'use client';

import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2, ChevronRight, Download, Sparkles, Building2, GraduationCap } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'full-time' | 'contract' | 'education';
  badge: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export default function ExperienceSection() {
  const [selectedId, setSelectedId] = useState<string>('exp-insanger');

  const experiences: ExperienceItem[] = [
    {
      id: 'exp-insanger',
      role: 'Software Developer',
      company: 'Insanger Private Limited',
      period: 'Apr 2025 – Present',
      location: 'Noida, India (Hybrid)',
      type: 'full-time',
      badge: 'CURRENT ROLE &bull; 70K+ APP',
      summary: 'Architecting scalable backend microservices, ultra-low latency live-streaming pipelines, and real-time Socket.IO presence systems for 4+ mobile entertainment apps.',
      achievements: [
        'Contributed to the core backend architecture of a live-streaming platform with over 70,000+ Google Play downloads.',
        'Engineered dynamic cryptographic token generation and 9-seat co-host audio/video mixing using ZEGOCLOUD and Agora RTC SDKs.',
        'Orchestrated multi-room Socket.IO presence cluster backed by Redis Pub/Sub, handling 1,000+ concurrent listeners per room with <40ms latency.',
        'Built asynchronous virtual gifting engine with BullMQ and Redis queues, executing atomic wallet coin transfers and 60FPS SVGA animations without blocking database threads.',
        'Configured automated media asset transcoding pipelines delivering user avatars and stream recordings to Cloudflare R2 object storage.',
      ],
      technologies: ['Node.js', 'Socket.IO', 'ZEGOCLOUD SDK', 'Agora RTC', 'BullMQ', 'Redis', 'Express.js', 'Cloudflare R2', 'MongoDB', 'React Native'],
    },
    {
      id: 'exp-megaminds',
      role: 'Software Developer',
      company: 'Megaminds',
      period: 'Aug 2024 – Feb 2025',
      location: 'Noida, India',
      type: 'full-time',
      badge: 'MOBILE & WEB APPS',
      summary: 'Developed performant cross-platform mobile apps with React Native / Expo and architected high-performance web applications using Next.js.',
      achievements: [
        'Built cross-platform mobile UI components using React Native and Expo with seamless gesture handlers and offline caching.',
        'Engineered high-concurrency real-time messaging pipelines with WebSocket listeners and optimistic UI state updates.',
        'Configured automated background push notification workers with Firebase Cloud Messaging (FCM) achieving 98%+ delivery rate.',
        'Refactored frontend component libraries reducing initial mobile bundle size by 28%.',
      ],
      technologies: ['React Native', 'Expo', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Firebase FCM', 'Tailwind CSS', 'REST APIs'],
    },
    {
      id: 'exp-manma',
      role: 'Junior Software Developer',
      company: 'Manma',
      period: 'Nov 2023 – May 2024',
      location: 'Noida, India',
      type: 'full-time',
      badge: 'FULL-STACK DEVELOPMENT',
      summary: 'Designed RESTful APIs, optimized database queries, and built responsive user dashboards using React and Express.',
      achievements: [
        'Developed modular Node.js REST API endpoints for user authentication, profile workflows, and data exports.',
        'Engineered dynamic administrative dashboard panels with data sorting, date range filtering, and CSV report downloads.',
        'Wrote optimized MongoDB aggregation queries reducing dashboard latency by 35%.',
      ],
      technologies: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'React.js', 'Material UI', 'Postman'],
    },
    {
      id: 'edu-glocal',
      role: 'Bachelor of Computer Applications (BCA)',
      company: 'Glocal University',
      period: '2021 – 2024',
      location: 'Saharanpur, Uttar Pradesh',
      type: 'education',
      badge: 'ACADEMIC DEGREE',
      summary: 'Graduated with Bachelor of Computer Applications degree with core focus on computer science, algorithms, software engineering, and database systems.',
      achievements: [
        'Specialized in Object-Oriented Programming (OOP), Data Structures & Algorithms, and Relational Database Systems.',
        'Built full-stack capstone projects including real-time web applications and relational inventory databases.',
        'Participated in technical workshops on cloud architectures and modern JavaScript application design.',
      ],
      technologies: ['Data Structures', 'Algorithms', 'Database Management (DBMS)', 'Operating Systems', 'Web Technologies', 'Software Engineering'],
    },
  ];

  const activeExp = experiences.find((e) => e.id === selectedId) || experiences[0];

  return (
    <section id="experience" className="experience-section" style={{ marginTop: '20px' }}>
      {/* Section Header */}
      <div className="section-header" style={{ marginBottom: '28px' }}>
        <div>
          <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Briefcase size={13} />
            <span>Career Milestones &amp; Track Record</span>
          </div>
          <h2 className="section-title">
            Professional <span style={{ color: 'var(--accent-emerald)' }}>Experience</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '680px', marginTop: 6, lineHeight: 1.5 }}>
            Hands-on software development experience across real-time streaming, mobile applications, and distributed backends.
          </p>
        </div>

        <div>
          <a
            href="mailto:manoj2022019@gmail.com?subject=Resume%20Request%20for%20Manoj%20Kumar"
            className="btn-secondary"
            style={{ fontSize: '0.86rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <Download size={14} /> Request Full PDF Resume
          </a>
        </div>
      </div>

      {/* Split Interactive Experience Deck */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1fr) minmax(0, 1.8fr)',
        gap: '24px',
      }}>
        {/* Left Column: Timeline List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {experiences.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                style={{
                  background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: isSelected ? '1px solid var(--accent-emerald)' : '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  padding: '18px 20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  boxShadow: isSelected ? '0 0 20px rgba(16, 185, 129, 0.15)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 700,
                    color: isSelected ? 'var(--accent-emerald)' : 'var(--text-dim)',
                    textTransform: 'uppercase',
                  }}>
                    {item.period}
                  </span>

                  {isSelected && (
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-emerald)',
                      boxShadow: '0 0 8px var(--accent-emerald)',
                    }} />
                  )}
                </div>

                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {item.role}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {item.type === 'education' ? <GraduationCap size={14} /> : <Building2 size={14} />}
                  <span>{item.company}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glass-bright)',
          borderRadius: '18px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: 'var(--shadow-card)',
        }}>
          {/* Header of selected role */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {activeExp.role}
                </h3>
                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'JetBrains Mono',
                  fontWeight: 700,
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: 'var(--accent-emerald)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}>
                  {activeExp.badge}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{activeExp.company}</span>
                <span>&bull;</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'JetBrains Mono' }}>
                  <Calendar size={13} /> {activeExp.period}
                </span>
                <span>&bull;</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <MapPin size={13} /> {activeExp.location}
                </span>
              </div>
            </div>
          </div>

          {/* Role Summary */}
          <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {activeExp.summary}
          </p>

          {/* Key Engineering Deliverables */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '12px' }}>
              Key Accomplishments &amp; Architectural Work:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeExp.achievements.map((ach, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                  <span>{ach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--text-dim)', marginBottom: '8px' }}>
              TECHNOLOGIES USED:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {activeExp.technologies.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.74rem',
                    fontFamily: 'JetBrains Mono',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    background: 'var(--bg-card-hover)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--accent-emerald-light)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
