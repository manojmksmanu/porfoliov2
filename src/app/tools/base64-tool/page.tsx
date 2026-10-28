'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import Base64Tool from '@/components/tools/Base64Tool';

export default function Base64ToolPage() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px 80px' }}>
      <Navbar />

      <main style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <Link href="/tools" style={{ color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', marginBottom: 16 }}>
            <ArrowLeft size={14} /> Back to All Tools (6 Buttons)
          </Link>
          <div className="section-label">Encoding &amp; Binary Utilities</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Base64 <span style={{ color: 'var(--accent-cyan)' }}>Encoder &amp; Decoder Studio</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '750px', lineHeight: 1.6 }}>
            Instant client-side encoding and decoding with UTF-8 multi-byte support, byte counter, and URL-safe conversions.
          </p>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-xl)', padding: '28px' }}>
          <Base64Tool />
        </div>
      </main>

      <Footer />
    </div>
  );
}
