'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, Braces, Image as ImageIcon, Zap, SlidersHorizontal, Search, ExternalLink, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

import ApiTesterTool from './tools/ApiTesterTool';
import JsonFormatterTool from './tools/JsonFormatterTool';
import ImageConverterTool from './tools/ImageConverterTool';
import ApiPerformanceTool from './tools/ApiPerformanceTool';
import Base64Tool from './tools/Base64Tool';
import RegexTool from './tools/RegexTool';

export default function InteractiveDevWorkbench() {
  const [activeTab, setActiveTab] = useState<'api' | 'json' | 'image' | 'perf' | 'base64' | 'regex'>('api');

  const toolsList = [
    {
      id: 'api' as const,
      name: 'API Tester',
      subtitle: 'Real HTTP Fetch Client',
      icon: <Send size={15} />,
      route: '/tools/api-tester',
      badge: 'Live Network',
      color: 'var(--accent-cyan)',
    },
    {
      id: 'json' as const,
      name: 'JSON Formatter',
      subtitle: 'AST Lint & Minifier',
      icon: <Braces size={15} />,
      route: '/tools/json-formatter',
      badge: 'Zero Latency',
      color: 'var(--accent-purple)',
    },
    {
      id: 'image' as const,
      name: 'Image Converter',
      subtitle: 'WebP / AVIF & Folder ZIP',
      icon: <ImageIcon size={15} />,
      route: '/tools/image-converter',
      badge: 'Client Canvas',
      color: 'var(--accent-emerald)',
    },
    {
      id: 'perf' as const,
      name: 'Latency Benchmark',
      subtitle: 'Concurrency & P95 Telemetry',
      icon: <Zap size={15} />,
      route: '/tools/api-performance',
      badge: 'Benchmark',
      color: '#fbbf24',
    },
    {
      id: 'base64' as const,
      name: 'Base64 Studio',
      subtitle: 'UTF-8 & Binary Encoder',
      icon: <SlidersHorizontal size={15} />,
      route: '/tools/base64-tool',
      badge: 'Utility',
      color: 'var(--accent-cyan)',
    },
    {
      id: 'regex' as const,
      name: 'Regex Tester',
      subtitle: 'Real-Time Pattern Matcher',
      icon: <Search size={15} />,
      route: '/tools/regex-tool',
      badge: 'Regex Engine',
      color: 'var(--accent-emerald)',
    },
  ];

  const currentTool = toolsList.find((t) => t.id === activeTab) || toolsList[0];

  return (
    <section id="tools" style={{ marginTop: '40px' }}>
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
            <Wrench size={13} />
            <span>Interactive Developer Productivity Suite</span>
          </div>
          <h2 className="section-title">
            Live <span style={{ color: 'var(--accent-cyan)' }}>Developer Tools</span> Studio
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', maxWidth: '680px', marginTop: 6, lineHeight: 1.5 }}>
            Production-grade utility tools running 100% client-side with zero latency. Test an API, format JSON, compress images, benchmark endpoints, or inspect Base64 strings.
          </p>
        </div>

        <Link
          href="/tools"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass-bright)',
            color: 'var(--text-primary)',
            padding: '10px 18px',
            borderRadius: '999px',
            fontSize: '0.86rem',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'var(--transition)',
          }}
        >
          Open Dedicated Tools Hub <ExternalLink size={14} />
        </Link>
      </div>

      {/* Main Studio Workbench Container */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-glass-bright)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
      }}>
        {/* Horizontal Tool Switcher Tabs */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          background: 'var(--bg-input)',
          borderBottom: '1px solid var(--border-glass)',
          padding: '8px 12px',
          gap: '8px',
        }}>
          {toolsList.map((tool) => {
            const isActive = tool.id === activeTab;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTab(tool.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: isActive ? `1px solid ${tool.color}` : '1px solid transparent',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  transition: 'var(--transition)',
                }}
              >
                <span style={{ color: tool.color }}>{tool.icon}</span>
                <span>{tool.name}</span>
                {isActive && (
                  <span style={{
                    fontSize: '0.68rem',
                    fontFamily: 'JetBrains Mono',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: tool.color,
                  }}>
                    {tool.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tool Header Strip with Quick Fullscreen / Standalone Link */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid var(--border-glass)',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: currentTool.color }}>{currentTool.icon}</span>
            <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {currentTool.name}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              &bull; {currentTool.subtitle}
            </span>
          </div>

          <Link
            href={currentTool.route}
            style={{
              fontSize: '0.78rem',
              color: 'var(--accent-cyan)',
              fontFamily: 'JetBrains Mono',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontWeight: 700,
            }}
          >
            Standalone Full Page ({currentTool.route}) ↗
          </Link>
        </div>

        {/* Live Interactive Tool Viewport */}
        <div style={{ padding: '24px' }}>
          {activeTab === 'api' && <ApiTesterTool />}
          {activeTab === 'json' && <JsonFormatterTool />}
          {activeTab === 'image' && <ImageConverterTool />}
          {activeTab === 'perf' && <ApiPerformanceTool />}
          {activeTab === 'base64' && <Base64Tool />}
          {activeTab === 'regex' && <RegexTool />}
        </div>
      </div>
    </section>
  );
}
