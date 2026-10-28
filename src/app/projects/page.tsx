'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import Link from 'next/link';
import { PROJECTS_DATA, ProjectItem } from '@/data/projects';
import { ArrowLeft, ExternalLink, Github, Search, Star, Layers } from 'lucide-react';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesCategory = activeCategory === 'all' || proj.category === activeCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 24px 80px' }}>
      <Navbar />

      <main style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
        
        {/* Header */}
        <div>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="section-label">Engineering Showcase</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Featured <span style={{ color: 'var(--accent-emerald)' }}>Projects &amp; Systems</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
            A curated collection of scalable backend systems, cloud microservices, and interactive web applications engineered for speed and reliability.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', padding: '16px 20px' }}>
          
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'fullstack', label: 'Full-Stack Apps' },
              { id: 'backend', label: 'Backend & Systems' },
              { id: 'cloud', label: 'Cloud & Telemetry' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`method-btn ${activeCategory === cat.id ? 'active' : ''}`}
                style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or name..."
              style={{
                width: '100%',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                padding: '8px 12px 8px 36px',
                fontSize: '0.84rem',
                outline: 'none',
              }}
            />
          </div>

        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {filteredProjects.map((proj) => (
            <div key={proj.id} className="project-card" style={{ height: '100%' }}>
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={proj.image}
                  alt={proj.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {proj.metrics && (
                  <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(9, 14, 24, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid var(--border-accent)', color: '#34d399', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>
                    ⚡ {proj.metrics}
                  </span>
                )}
                {proj.stars && (
                  <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(9, 14, 24, 0.85)', backdropFilter: 'blur(8px)', border: '1px solid var(--border-glass)', color: '#fbbf24', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Star size={11} fill="#fbbf24" /> {proj.stars}
                  </span>
                )}
              </div>

              <div className="project-card-body">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{proj.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                  {proj.description}
                </p>

                <div className="project-tags" style={{ margin: '12px 0 16px' }}>
                  {proj.tags.map((t) => (
                    <span key={t} className="tag-chip">{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-glass)', paddingTop: '14px', marginTop: 'auto' }}>
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#34d399', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    Live Demo <ExternalLink size={14} />
                  </a>

                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--text-dim)', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <Github size={15} /> Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>No projects match your search criteria.</p>
          </div>
        )}

        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}
