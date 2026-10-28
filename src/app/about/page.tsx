'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import Link from 'next/link';
import { ArrowLeft, Download, Award, Briefcase, GraduationCap, CheckCircle2, Code2, Server, Database, Smartphone, Radio, Mail, Phone, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  const skillCategories = [
    {
      name: 'Languages',
      icon: <Code2 size={18} />,
      skills: ['JavaScript (ESNext)', 'TypeScript', 'SQL', 'HTML5', 'CSS3']
    },
    {
      name: 'Backend & Real-Time Systems',
      icon: <Server size={18} />,
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Socket.IO (Live Presence)', 'BullMQ (Delayed Jobs)', 'SVGA Animations']
    },
    {
      name: 'Frontend & Mobile Engineering',
      icon: <Smartphone size={18} />,
      skills: ['React Native', 'Expo', 'React.js', 'Next.js 15 (App Router)', 'Tailwind CSS', 'Material UI', 'Flutter (basic)']
    },
    {
      name: 'Database & Caching',
      icon: <Database size={18} />,
      skills: ['MongoDB & Mongoose', 'PostgreSQL', 'Prisma ORM', 'Redis (State & Cache)']
    },
    {
      name: 'Live Streaming SDKs & Cloud',
      icon: <Radio size={18} />,
      skills: ['ZEGOCLOUD Audio/Video SDK', 'Agora RTC SDK', 'Cloudflare R2 Storage', 'Cloudinary', 'Firebase Push Notifications']
    },
    {
      name: 'Platforms & Tools',
      icon: <Award size={18} />,
      skills: ['Google Play Console', 'App Store Connect', 'Git & GitHub', 'VS Code', 'Figma']
    }
  ];

  const experience = [
    {
      role: 'Software Developer',
      company: 'Insanger Private Limited',
      period: 'Apr 2025 — Present',
      location: 'Noida, India',
      highlights: [
        'Contributed to the development & maintenance of 4+ live-streaming & social entertainment apps, working across mobile features, backend APIs, real-time events, and admin panels.',
        'Designed and maintained REST APIs with Node.js, Express.js, and TypeScript for user workflows, live-room operations, coin wallet activity, VIP plans, and host agency management.',
        'Integrated ZEGOCLOUD and Agora SDKs to power real-time audio/video rooms, co-host requests/responses, participant lists, broadcaster controls, and live chat synchronization via Socket.IO.',
        'Engineered virtual gifting features with coin deduction transactions, gift events, and SVGA animation playback in live rooms.',
        'Implemented background billing workflows using Socket.IO and delayed/background job processing with BullMQ.',
        'Managed room state caching and frequently accessed user sessions with Redis, alongside Cloudflare R2 and Cloudinary for media delivery.',
        'Contributed to an enterprise HR management application: employee attendance/leave administration, salary management, and payroll operations.',
        'Contributed to a live product portfolio that includes an application with 70,000+ active downloads on Google Play Store.'
      ]
    },
    {
      role: 'App and Web Developer',
      company: 'Megaminds',
      period: 'Aug 2024 — Feb 2025',
      location: 'India',
      highlights: [
        'Built cross-platform mobile and web application features using React Native, React.js, Next.js, Expo, Node.js, Express.js, Socket.IO, and MongoDB.',
        'Implemented real-time messaging, file-sharing flows, and push notification integrations.',
        'Developed performant REST APIs and improved frontend responsiveness for seamless user interactions.',
        'Collaborated on app publishing workflows for Google Play and Apple App Store.'
      ]
    },
    {
      role: 'Web Developer',
      company: 'Manma',
      period: 'Nov 2023 — May 2024',
      location: 'India',
      highlights: [
        'Contributed to responsive website development with attention to accessibility, usability, and speed optimization.',
        'Collaborated with cross-functional design teams to implement modern UI updates and maintained Git documentation.'
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 24px 80px' }}>
      <Navbar />

      <main style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Breadcrumb & Header */}
        <div>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="section-label">Software Developer Resume &amp; Profile</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            About <span style={{ color: 'var(--accent-emerald)' }}>Manoj Kumar</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '780px', lineHeight: 1.6 }}>
            Software Developer experienced in developing mobile and web applications, backend services, admin panels, and real-time systems. Experienced in live-streaming, audio/video rooms, and enterprise HR workflows.
          </p>
        </div>

        {/* Bio Card with Avatar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '32px', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-accent)', boxShadow: '0 0 35px rgba(16,185,129,0.2)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/developer_avatar.jpg"
              alt="Manoj Kumar - Software Developer"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="pulse-dot"></span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399' }}>NOIDA, INDIA &bull; +91 9667328778</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manoj Kumar &bull; Software Developer</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.94rem' }}>
              Hands-on contributions across API development, live-room audio/video SDK integrations (ZEGOCLOUD, Agora), coin wallet transactions, and multi-platform app releases on Google Play and App Store.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: 6 }}>
              <a
                href="mailto:manoj2022019@gmail.com"
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.88rem' }}
              >
                <Mail size={15} /> Contact: manoj2022019@gmail.com
              </a>

              <a
                href="https://github.com/manojmksmanu"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                GitHub Profile ↗
              </a>

              <a
                href="https://linkedin.com/in/manoj-kumar-05b2b91aa"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ padding: '10px 18px', fontSize: '0.88rem' }}
              >
                LinkedIn Profile ↗
              </a>
            </div>
          </div>
        </div>

        {/* Education Highlight Card */}
        <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.08))', border: '1px solid var(--border-accent)', borderRadius: 'var(--radius-lg)', padding: '24px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(16,185,129,0.2)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Education &amp; Degree</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Bachelor of Computer Applications (BCA)</h3>
              <p style={{ color: 'var(--accent-emerald)', fontSize: '0.9rem', fontWeight: 600 }}>Glocal University &bull; 2021 — 2024</p>
            </div>
          </div>
          <span style={{ fontFamily: 'JetBrains Mono', background: 'var(--bg-card)', color: 'var(--accent-emerald)', border: '1px solid var(--border-accent)', padding: '6px 14px', borderRadius: 999, fontSize: '0.84rem', fontWeight: 700 }}>
            Graduated (3-Year Degree)
          </span>
        </div>

        {/* Skills Matrix */}
        <div>
          <div className="section-label">Technical Stack</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 20 }}>Technical Skills &amp; Tools</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {skillCategories.map((cat) => (
              <div key={cat.name} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--accent-emerald)', marginBottom: 14 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {cat.icon}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{cat.name}</h4>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cat.skills.map((skill) => (
                    <span key={skill} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', padding: '5px 10px', borderRadius: 6, color: 'var(--text-primary)' }}>
                      <CheckCircle2 size={12} style={{ color: 'var(--accent-emerald)' }} />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Work Experience */}
        <div>
          <div className="section-label">Employment History</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 24 }}>Professional Work Experience</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {experience.map((exp, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(16,185,129,0.15)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>{exp.role}</h3>
                      <div style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.98rem' }}>
                        {exp.company} &bull; <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: '#a5b4fc', background: 'rgba(99,102,241,0.15)', padding: '4px 12px', borderRadius: 6 }}>
                    {exp.period}
                  </span>
                </div>

                <ul style={{ paddingLeft: '22px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {exp.highlights.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
