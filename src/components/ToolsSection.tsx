'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Send, Braces, Image as ImageIcon, Zap, 
  Sparkles, FolderDown, ShieldCheck, Cpu, SlidersHorizontal, CheckCircle2,
  ExternalLink, Layers, Search, Plus
} from 'lucide-react';

interface ToolCardData {
  id: string;
  name: string;
  category: 'media' | 'api' | 'data' | 'perf' | 'util';
  route: string;
  tabId: string;
  description: string;
  tags: string[];
  features: string[];
  icon: React.ReactNode;
  badge: string;
  color: string;
}

export default function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'media' | 'api' | 'data' | 'perf' | 'util'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const triggerOpenTab = (tabId: string, name: string) => {
    window.dispatchEvent(new CustomEvent('open-vscode-tab', { detail: { tabId, name } }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tools: ToolCardData[] = [
    {
      id: 'image-converter',
      name: 'Image & Entire Folder Batch Converter Studio',
      category: 'media',
      route: '/tools/image-converter',
      tabId: 'tab-image',
      description: 'Convert images to WebP, AVIF, PNG, JPEG. Upload entire folders, preserve nested directory structures, inspect dual-preview & interactive split slider, and download the entire folder as a ZIP.',
      tags: ['WebP / AVIF', 'Folder Upload', 'Split Slider', 'ZIP Archive', 'Canvas 2D'],
      features: [
        'Complete folder batch conversion with folder structure preservation',
        'Interactive Split-Screen comparison slider & zoom loupe (3x)',
        'Real-time compression % savings calculator',
        'Instant ZIP archive download using JSZip',
      ],
      icon: <ImageIcon size={22} />,
      badge: 'POPULAR &bull; JSZip',
      color: 'var(--accent-emerald)',
    },
    {
      id: 'api-tester',
      name: 'REST API Tester & Inspector Studio',
      category: 'api',
      route: '/tools/api-tester',
      tabId: 'tab-api',
      description: 'Send real HTTP requests from your browser with query builder, headers, auth bearer tokens, round-trip timing breakdown, and JSON response highlighting.',
      tags: ['GET / POST / PUT', 'Bearer Token', 'Timing Breakdown', 'cURL Export'],
      features: [
        'Full HTTP client with request headers, params & body tabs',
        'Accurate millisecond latency and status code telemetry',
        'One-click cURL command generator',
        'Prettified response body and response headers viewer',
      ],
      icon: <Send size={22} />,
      badge: 'REAL FETCH CLIENT',
      color: 'var(--accent-cyan)',
    },
    {
      id: 'json-formatter',
      name: 'JSON Formatter & AST Validator Studio',
      category: 'data',
      route: '/tools/json-formatter',
      tabId: 'tab-json',
      description: 'Prettify, minify, sort keys, validate syntax errors with line/column markers, search nested properties with dot notation, and copy clean payload.',
      tags: ['AST Lint', 'Minify', 'Key Sorting', 'Path Query', 'Zero Latency'],
      features: [
        'Precise syntax error detection with line numbers',
        'One-click format (2/4 spaces) or minify to single line',
        'Deterministic alphabetical key sorting',
        'Instant payload copy & file download',
      ],
      icon: <Braces size={22} />,
      badge: 'AST ENGINE',
      color: 'var(--accent-purple)',
    },
    {
      id: 'api-performance',
      name: 'API Latency & Concurrency Benchmark',
      category: 'perf',
      route: '/tools/api-performance',
      tabId: 'tab-perf',
      description: 'Simulate high-concurrency requests against your API endpoints. Calculates TTFB, P50, P90, P95, P99 latency percentiles, error rates, and request distribution.',
      tags: ['P50 / P95 / P99', 'Concurrency', 'TTFB', 'Performance Telemetry'],
      features: [
        'Concurrent worker requests simulation',
        'Detailed latency percentile distribution calculations',
        'Success vs error rate percentage telemetry',
        'Detailed request timing breakdown table',
      ],
      icon: <Zap size={22} />,
      badge: 'CONCURRENCY RUNNER',
      color: '#fbbf24',
    },
    {
      id: 'base64-tool',
      name: 'Base64 Encoder & Decoder Studio',
      category: 'util',
      route: '/tools/base64',
      tabId: 'tab-base64',
      description: 'Instant client-side Base64 text encoding and decoding with full UTF-8 character support and length calculation.',
      tags: ['Base64', 'UTF-8', 'Zero Server Lag', 'Copy Ready'],
      features: [
        'Bi-directional encoding and decoding',
        'Full international UTF-8 support',
        'Live char count and instant copy',
        'Client-side privacy guaranteed',
      ],
      icon: <SlidersHorizontal size={22} />,
      badge: 'LIGHTNING UTILITY',
      color: 'var(--accent-emerald)',
    },
    {
      id: 'regex-tool',
      name: 'Regex Tester & Matcher Engine',
      category: 'util',
      route: '/tools/regex',
      tabId: 'tab-regex',
      description: 'Real-time regular expression compilation, flag toggles (g, i, m, s), match counting, and captured group analysis.',
      tags: ['Regex', 'Flags g/i/m', 'Live Matcher', 'Group Extract'],
      features: [
        'Real-time regex compilation with syntax error indicator',
        'Live match counter and index locations',
        'Instant toggleable flags (global, case-insensitive, multiline)',
        'Extracted matches list with index markers',
      ],
      icon: <Search size={22} />,
      badge: 'REGEX PARSER',
      color: 'var(--accent-cyan)',
    },
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="tools" className="tools-workbench-section" style={{ marginTop: '20px' }}>
      {/* Section Header */}
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <div>
          <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Cpu size={13} />
            <span>Developer Productivity Workbench</span>
          </div>
          <h2 className="section-title">
            In-Browser <span style={{ color: 'var(--accent-emerald)' }}>Engineering Utilities ({tools.length})</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '680px', marginTop: 6, lineHeight: 1.5 }}>
            Production-grade developer tools built with modern Web APIs, Canvas 2D, and Web Workers.
            100% client-side execution — zero data leaves your browser.
          </p>

          {/* Engineering Capabilities Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 12 }}>
            <span style={{ fontSize: '0.74rem', background: 'var(--bg-input)', border: '1px solid var(--border-accent)', padding: '4px 10px', borderRadius: '6px', color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
              🔒 100% Client-Side Privacy
            </span>
            <span style={{ fontSize: '0.74rem', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', padding: '4px 10px', borderRadius: '6px', color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
              ⚡ Zero Server Lag
            </span>
            <span style={{ fontSize: '0.74rem', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', padding: '4px 10px', borderRadius: '6px', color: 'var(--accent-purple)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
              📦 JSZip &amp; Canvas 2D
            </span>
            <span style={{ fontSize: '0.74rem', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', padding: '4px 10px', borderRadius: '6px', color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono', fontWeight: 700 }}>
              📂 Recursive Folder Preservation
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link href="/tools" className="section-link" style={{ fontSize: '0.9rem' }}>
            Open Central Tools Hub <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px',
        padding: '8px 12px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-glass-bright)',
        borderRadius: '12px',
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All Utilities (${tools.length})` },
            { id: 'media', label: 'Media & Folders' },
            { id: 'api', label: 'Networking & APIs' },
            { id: 'data', label: 'Data & JSON' },
            { id: 'perf', label: 'Performance' },
            { id: 'util', label: 'Utilities' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as typeof activeCategory)}
              style={{
                background: activeCategory === cat.id ? 'var(--text-primary)' : 'transparent',
                color: activeCategory === cat.id ? 'var(--bg-main)' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'var(--transition)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-glass)',
          borderRadius: '8px',
          padding: '6px 12px',
        }}>
          <Search size={14} style={{ color: 'var(--text-dim)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools or tags..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              fontFamily: 'inherit',
              width: '160px',
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontSize: '0.75rem' }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Grid of Tool Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
      }}>
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="tool-card-showcase"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass-bright)',
              borderRadius: '16px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '18px',
              position: 'relative',
              boxShadow: 'var(--shadow-card)',
              transition: 'var(--transition)',
            }}
          >
            {/* Top row: Icon, Category & Badge */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'var(--bg-card-hover)',
                  border: `1px solid ${tool.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: tool.color,
                }}>
                  {tool.icon}
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  background: 'var(--bg-card-hover)',
                  border: '1px solid var(--border-glass-bright)',
                  color: 'var(--accent-emerald)',
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                }}>
                  {tool.badge}
                </span>
              </div>

              {/* Tool Title */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {tool.name}
              </h3>

              {/* Tool Description */}
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '16px' }}>
                {tool.description}
              </p>

              {/* Feature Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                {tool.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={15} style={{ color: 'var(--accent-emerald)', marginTop: '2px', flexShrink: 0 }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: 'var(--bg-card-hover)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-dim)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-glass)',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              <button
                type="button"
                onClick={() => triggerOpenTab(tool.tabId, tool.name)}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-accent)',
                  color: 'var(--accent-emerald)',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'var(--transition)',
                }}
              >
                <span>Run in IDE Tab ⚡</span>
              </button>

              <Link
                href={tool.route}
                className="btn-editorial-primary"
                style={{
                  padding: '7px 14px',
                  fontSize: '0.8rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <span>Full Page</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        ))}

        {/* Extensibility Card: Add Any Number of Tools! */}
        <div
          style={{
            background: 'var(--bg-card-hover)',
            border: '2px dashed var(--border-accent)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: '14px',
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-emerald)',
          }}>
            <Plus size={24} />
          </div>

          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Extensible Tool Architecture
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '320px', lineHeight: 1.5 }}>
              Add 5, 20, or 50+ new tools anytime in <code>src/data/tools.ts</code>. They automatically appear in the VS Code sidebar and Central Tools Hub!
            </p>
          </div>

          <Link
            href="/tools"
            className="btn-editorial-secondary"
            style={{ fontSize: '0.84rem', padding: '8px 16px' }}
          >
            Explore Central Tools Hub ➔
          </Link>
        </div>
      </div>
    </section>
  );
}
