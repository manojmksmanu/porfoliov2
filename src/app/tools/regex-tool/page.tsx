'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Search, ShieldCheck } from 'lucide-react';
import RegexTool from '@/components/tools/RegexTool';

export default function RegexToolPage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 80px' }}>
      <Navbar />

      <main style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <Link href="/tools" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to All Tools (6 Buttons)
          </Link>
          <div className="section-label">Regular Expressions &amp; Pattern Matching</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Regex <span style={{ color: 'var(--accent-emerald)' }}>Tester &amp; Matcher Studio</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Real-time regex compilation, flag toggles (g, i, m, s), match highlighting, and common pattern library.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '28px' }}>
          <RegexTool />
        </div>
      </main>

      <Footer />
    </div>
  );
}
