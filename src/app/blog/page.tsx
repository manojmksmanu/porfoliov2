'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blog';
import { ArrowLeft, Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogPage() {
  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 24px 80px' }}>
      <Navbar />

      <main style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
        
        {/* Header */}
        <div>
          <Link href="/" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="section-label">Engineering Publications</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Developer <span style={{ color: 'var(--accent-emerald)' }}>Notes &amp; Articles</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Thoughts, technical benchmarks, and architecture breakdowns on building distributed systems, real-time WebSockets, and client-side web tools.
          </p>
        </div>

        {/* Featured Post Card */}
        {BLOG_POSTS[0] && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(6, 182, 212, 0.08))',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--radius-xl)',
              padding: '36px',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
            onClick={() => alert(`Opening article: "${BLOG_POSTS[0].title}"`)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ background: 'var(--accent-emerald)', color: '#070a12', fontSize: '0.74rem', fontWeight: 800, padding: '3px 8px', borderRadius: 4, textTransform: 'uppercase' }}>
                Featured Article
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={13} /> {BLOG_POSTS[0].date}
              </span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.84rem', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Clock size={13} /> {BLOG_POSTS[0].readTime}
              </span>
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>
              {BLOG_POSTS[0].title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '800px', marginBottom: 20 }}>
              {BLOG_POSTS[0].summary}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {BLOG_POSTS[0].tags.map((t) => (
                  <span key={t} className="tag-chip">{t}</span>
                ))}
              </div>
              <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Read Full Breakdown <ArrowRight size={15} />
              </span>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '22px' }}>
          {BLOG_POSTS.slice(1).map((post) => (
            <div
              key={post.slug}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glass)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
              onClick={() => alert(`Opening article: "${post.title}"`)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-dim)', fontSize: '0.78rem', marginBottom: 12 }}>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{post.category}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                  {post.summary}
                </p>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>{post.date}</span>
                <span style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Read article <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
