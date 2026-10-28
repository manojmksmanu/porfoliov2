'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROJECTS_DATA, ProjectItem } from '@/data/projects';
import { ArrowRight, ArrowUpRight, Github, ExternalLink, Sparkles, Layers, ShieldCheck, X, Cpu, Server, Activity } from 'lucide-react';

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filtered = PROJECTS_DATA.filter((proj) => {
    if (selectedCategory === 'all') return true;
    return proj.category === selectedCategory;
  });

  return (
    <section id="projects" style={{ marginTop: '40px' }}>
      {/* Section Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div>
          <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Layers size={13} />
            <span>Proven Engineering Milestones</span>
          </div>
          <h2 className="section-title">
            Featured <span style={{ color: 'var(--accent-emerald)' }}>Production Systems</span> &amp; Work
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '680px', marginTop: 6, lineHeight: 1.5 }}>
            Real-world platforms deployed to Google Play and enterprise clients, featuring live streaming SDKs, high-throughput queues, and real-time WebSockets.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glass)',
          padding: '6px',
          borderRadius: '999px',
          flexWrap: 'wrap',
        }}>
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'backend', label: 'Streaming & Systems' },
            { id: 'fullstack', label: 'Full-Stack Apps' },
            { id: 'cloud', label: 'Cloud & Telemetry' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                background: selectedCategory === cat.id ? 'var(--accent-cyan)' : 'transparent',
                color: selectedCategory === cat.id ? '#04111d' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
      }}>
        {filtered.map((proj) => (
          <div
            key={proj.id}
            style={{
              background: 'var(--bg-card)',
              border: proj.featured ? '1px solid var(--border-glass-bright)' : '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-card)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'var(--transition)',
              position: 'relative',
            }}
          >
            {/* Project Image & Badge */}
            <div style={{ position: 'relative', width: '100%', height: '210px', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={proj.image}
                alt={proj.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(6, 8, 14, 0.9) 0%, rgba(6, 8, 14, 0.2) 60%, transparent 100%)',
              }} />

              {/* Metric Tag Over Image */}
              {proj.metrics && (
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'rgba(6, 8, 14, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid var(--accent-emerald)',
                  color: 'var(--accent-emerald-light)',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  fontFamily: 'JetBrains Mono',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                  {proj.metrics}
                </div>
              )}
            </div>

            {/* Project Body */}
            <div style={{
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
              gap: '16px',
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em',
                }}>
                  {proj.title}
                </h3>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                }}>
                  {proj.description}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'JetBrains Mono',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Inspect Architecture & External Links */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '14px',
                borderTop: '1px solid var(--border-glass)',
              }}>
                <button
                  type="button"
                  onClick={() => setActiveModalProject(proj)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--accent-cyan)',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: 0,
                  }}
                >
                  Inspect Architecture Specs &rarr;
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: 'var(--text-secondary)',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                      }}
                      title="GitHub Repository"
                    >
                      <Github size={15} />
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: 'var(--accent-emerald)',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                      }}
                      title="Live Product URL"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Modal: Deep Architecture Specs */}
      {activeModalProject && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass-bright)',
            borderRadius: 'var(--radius-xl)',
            maxWidth: '640px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
          }}>
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--accent-emerald)',
              fontSize: '0.78rem',
              fontFamily: 'JetBrains Mono',
              fontWeight: 700,
              marginBottom: 8,
            }}>
              <ShieldCheck size={14} /> ARCHITECTURE SPEC SHEET
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {activeModalProject.title}
            </h3>

            {activeModalProject.metrics && (
              <div style={{
                display: 'inline-block',
                background: 'rgba(0, 242, 254, 0.12)',
                border: '1px solid rgba(0, 242, 254, 0.3)',
                color: 'var(--accent-cyan)',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontFamily: 'JetBrains Mono',
                fontWeight: 700,
                marginBottom: '16px',
              }}>
                Key Metric: {activeModalProject.metrics}
              </div>
            )}

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {activeModalProject.description}
            </p>

            <div style={{
              background: 'var(--bg-input)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px',
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
                Engineering Highlights &amp; Tech Implementations:
              </div>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.7 }}>
                <li>Engineered high-throughput RESTful &amp; WebSocket microservice endpoints.</li>
                <li>Configured BullMQ distributed job queues with Redis for atomic operations.</li>
                <li>Implemented dynamic cryptographic token generation and session expiration policies.</li>
                <li>Delivered responsive mobile &amp; web experiences with sub-second data synchronization.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {activeModalProject.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.76rem',
                    fontFamily: 'JetBrains Mono',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-primary)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Github size={14} /> View Code
                </a>
              )}
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'var(--accent-cyan)',
                    color: '#04111d',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <ExternalLink size={14} /> Open Live Product
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
