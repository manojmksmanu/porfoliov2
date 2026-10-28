'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ArrowLeft, Plus, Radio, Braces, Image as ImageIcon, Zap, 
  SlidersHorizontal, ShieldCheck, Sparkles, ExternalLink, Copy, Check, 
  Code2, Wrench, X, Share2, Maximize2, ArrowRight
} from 'lucide-react';
import { TOOLS_REGISTRY, ToolItem } from '@/data/tools';

import ApiTesterTool from '@/components/tools/ApiTesterTool';
import JsonFormatterTool from '@/components/tools/JsonFormatterTool';
import ImageConverterTool from '@/components/tools/ImageConverterTool';
import ApiPerformanceTool from '@/components/tools/ApiPerformanceTool';
import Base64Tool from '@/components/tools/Base64Tool';
import RegexTool from '@/components/tools/RegexTool';

export default function ToolsHubPage() {
  // If null, show the 6 Buttons Launchpad. If a tool ID is set, open that tool in Full View!
  const [openToolId, setOpenToolId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Add New Tool Boilerplate Generator Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newToolName, setNewToolName] = useState('JWT Debugger & Inspector');
  const [newToolId, setNewToolId] = useState('jwt-debugger');
  const [newToolCategory, setNewToolCategory] = useState<'api' | 'data' | 'media' | 'utility' | 'perf'>('utility');
  const [newToolDesc, setNewToolDesc] = useState('Decode, inspect and verify JSON Web Tokens (JWT) client-side.');
  const [copiedRegistry, setCopiedRegistry] = useState(false);
  const [copiedComponent, setCopiedComponent] = useState(false);

  // Check URL query param on mount: if ?tool=... is given, open that tool in Full View directly
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryTool = params.get('tool');
      if (queryTool && TOOLS_REGISTRY.some((t) => t.id === queryTool)) {
        setOpenToolId(queryTool);
      }
    }
  }, []);

  const openToolInFullView = (id: string) => {
    setOpenToolId(id);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tool', id);
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeFullView = () => {
    setOpenToolId(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('tool');
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentTool = TOOLS_REGISTRY.find((t) => t.id === openToolId);

  const handleCopyLink = () => {
    if (!currentTool) return;
    const url = `${window.location.origin}/tools?tool=${currentTool.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper to render icon for tools
  const renderToolIcon = (iconName: string, size = 20, color = 'var(--accent-cyan)') => {
    switch (iconName) {
      case 'Radio':
        return <Radio size={size} style={{ color }} />;
      case 'Braces':
        return <Braces size={size} style={{ color }} />;
      case 'Image':
        return <ImageIcon size={size} style={{ color }} />;
      case 'Zap':
        return <Zap size={size} style={{ color }} />;
      case 'SlidersHorizontal':
        return <SlidersHorizontal size={size} style={{ color }} />;
      case 'Search':
        return <Wrench size={size} style={{ color }} />;
      default:
        return <Wrench size={size} style={{ color }} />;
    }
  };

  // Boilerplate generator code
  const generatedRegistryCode = `// Add this to src/data/tools.ts in TOOLS_REGISTRY array:
{
  id: '${newToolId}',
  name: '${newToolName}',
  description: '${newToolDesc}',
  category: '${newToolCategory}',
  icon: 'Wrench',
  badge: 'New Utility',
  color: 'var(--accent-cyan)',
  isPopular: true,
  route: '/tools/${newToolId}',
  tags: ['${newToolCategory.toUpperCase()}', 'Client-Side', 'Fast'],
  features: [
    'Zero-latency browser processing',
    'Interactive input & live output viewer',
    'One-click copy to clipboard'
  ]
}`;

  const generatedComponentCode = `// Create file: src/components/tools/${newToolId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}.tsx
'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function ${newToolId.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = () => {
    setOutput('Processed: ' + input);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input here..."
        style={{
          width: '100%',
          height: '130px',
          background: 'var(--bg-input)',
          border: '1px solid var(--border-glass)',
          borderRadius: '10px',
          color: 'var(--text-primary)',
          padding: '12px',
          fontFamily: 'JetBrains Mono',
          fontSize: '0.86rem',
        }}
      />
      <button
        type="button"
        onClick={handleProcess}
        className="btn-primary"
        style={{ width: 'fit-content', padding: '10px 20px' }}
      >
        <Sparkles size={14} /> Process
      </button>
      {output && (
        <pre style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-glass)',
          borderRadius: '10px',
          padding: '14px',
          color: 'var(--accent-emerald)',
          fontSize: '0.85rem'
        }}>
          {output}
        </pre>
      )}
    </div>
  );
}`;

  return (
    <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '24px 24px 100px' }}>
      <Navbar />

      {/* ========================================================
          STATE 1: 6 PROMINENT TOOL BUTTONS LAUNCHPAD
          (Shown when NO tool is opened in full view)
          ======================================================== */}
      {!openToolId && (
        <main style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Header */}
          <div>
            <Link
              href="/"
              style={{
                color: 'var(--text-dim)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.85rem',
                marginBottom: 14,
                transition: 'var(--transition)',
              }}
            >
              <ArrowLeft size={14} /> Back to Portfolio Home
            </Link>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 12px',
              background: 'rgba(0, 242, 254, 0.1)',
              border: '1px solid rgba(0, 242, 254, 0.3)',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              color: 'var(--accent-cyan)',
              marginBottom: '10px',
              fontFamily: 'JetBrains Mono',
            }}>
              <span className="pulse-dot" style={{ background: 'var(--accent-cyan)' }} />
              <span>INTERACTIVE DEVELOPER LAUNCHPAD &bull; {TOOLS_REGISTRY.length} TOOLS READY</span>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px',
            }}>
              <div>
                <h1 style={{
                  fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'var(--text-primary)',
                }}>
                  Developer Tools{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-emerald))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Station
                  </span>
                </h1>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.08rem',
                  maxWidth: '750px',
                  lineHeight: 1.6,
                  marginTop: '8px',
                }}>
                  Tap any of the 6 buttons below to launch that specific tool in an expansive, immersive <strong>Full-View Studio</strong>.
                </p>
              </div>

              {/* "+ Add More Tools" Action */}
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                style={{
                  background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)',
                  color: '#04111d',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '12px 24px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 20px rgba(0, 242, 254, 0.3)',
                  transition: 'var(--transition)',
                }}
              >
                <Plus size={16} /> + Add More Tools
              </button>
            </div>
          </div>

          {/* THE 6 PROMINENT TOOL BUTTONS GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {TOOLS_REGISTRY.map((tool, index) => {
              const buttonColor = tool.color || 'var(--accent-cyan)';
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => openToolInFullView(tool.id)}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-glass-bright)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '26px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '20px',
                    boxShadow: 'var(--shadow-card)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = buttonColor;
                    e.currentTarget.style.boxShadow = `0 15px 35px -5px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 242, 254, 0.25)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-glass-bright)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  }}
                >
                  {/* Top Bar: Icon + Badge + Number */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '14px',
                      background: 'var(--bg-input)',
                      border: `1px solid ${buttonColor}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 15px rgba(0, 242, 254, 0.2)`,
                    }}>
                      {renderToolIcon(tool.icon, 24, buttonColor)}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '0.72rem',
                        fontFamily: 'JetBrains Mono',
                        fontWeight: 800,
                        color: buttonColor,
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid var(--border-glass)',
                        padding: '4px 10px',
                        borderRadius: '999px',
                      }}>
                        {tool.badge || `Tool #${index + 1}`}
                      </span>

                      <span style={{
                        fontSize: '0.8rem',
                        fontFamily: 'JetBrains Mono',
                        color: 'var(--text-dim)',
                        fontWeight: 700,
                      }}>
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Center: Title & Description */}
                  <div>
                    <h3 style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                      letterSpacing: '-0.02em',
                    }}>
                      {tool.name}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                    }}>
                      {tool.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {tool.tags.map((tag) => (
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
                          color: 'var(--text-dim)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Tap Call-to-Action Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-glass)',
                  }}>
                    <span style={{
                      fontSize: '0.86rem',
                      fontWeight: 800,
                      color: buttonColor,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}>
                      Open in Full View <ArrowRight size={14} />
                    </span>

                    <span style={{
                      fontSize: '0.74rem',
                      color: 'var(--text-dim)',
                      fontFamily: 'JetBrains Mono',
                    }}>
                      Client-Side &bull; Ready
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Privacy & Architecture Guarantee Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass-bright)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-card)',
            marginTop: '8px',
          }}>
            <ShieldCheck size={32} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.98rem' }}>
                100% In-Browser Sandbox Guarantee
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginTop: '2px', lineHeight: 1.5 }}>
                None of your files, API tokens, or JSON data are sent to any remote server. Everything executes locally in your browser memory via Web Workers, Canvas 2D, and JSZip.
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================
          STATE 2: IMMERSIVE FULL-VIEW OF THE SELECTED TOOL
          (Opens when ANY of the 6 buttons is clicked!)
          ======================================================== */}
      {openToolId && currentTool && (
        <main style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Control Bar: Back to All Tools (6 Buttons) + Switcher */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass-bright)',
            borderRadius: 'var(--radius-xl)',
            padding: '14px 20px',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            {/* Back Button */}
            <button
              type="button"
              onClick={closeFullView}
              style={{
                background: 'linear-gradient(135deg, var(--accent-cyan), #0284c7)',
                color: '#04111d',
                border: 'none',
                borderRadius: '999px',
                padding: '9px 18px',
                fontSize: '0.86rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(0, 242, 254, 0.3)',
                transition: 'var(--transition)',
              }}
            >
              <ArrowLeft size={15} /> Back to All 6 Tools
            </button>

            {/* Middle: Tool Name & Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--bg-input)',
                border: `1px solid ${currentTool.color || 'var(--accent-cyan)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {renderToolIcon(currentTool.icon, 16, currentTool.color || 'var(--accent-cyan)')}
              </div>

              <div>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {currentTool.name}
                </span>
                <span style={{
                  marginLeft: '8px',
                  fontSize: '0.68rem',
                  fontFamily: 'JetBrains Mono',
                  fontWeight: 700,
                  color: currentTool.color || 'var(--accent-cyan)',
                  background: 'rgba(255, 255, 255, 0.06)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}>
                  FULL VIEW
                </span>
              </div>
            </div>

            {/* Right: Quick Switcher & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Copy Shareable Link */}
              <button
                type="button"
                onClick={handleCopyLink}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-secondary)',
                  borderRadius: '999px',
                  padding: '7px 14px',
                  fontSize: '0.78rem',
                  fontFamily: 'JetBrains Mono',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
                title="Copy share link for this tool"
              >
                {copiedLink ? <Check size={13} style={{ color: 'var(--accent-emerald)' }} /> : <Share2 size={13} />}
                <span>{copiedLink ? 'Copied!' : 'Share Tool'}</span>
              </button>

              {/* Direct Standalone Route */}
              <Link
                href={currentTool.route}
                style={{
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  borderRadius: '999px',
                  padding: '7px 14px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
                title="Direct standalone page route"
              >
                Route <ExternalLink size={12} />
              </Link>
            </div>
          </div>

          {/* Quick Switcher Buttons Pill Strip (allows fast switching while staying in Full View) */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            padding: '4px 2px',
          }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', alignSelf: 'center', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono', marginRight: 4 }}>
              Switch Tool:
            </span>
            {TOOLS_REGISTRY.map((t) => {
              const isCurrent = t.id === openToolId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => openToolInFullView(t.id)}
                  style={{
                    background: isCurrent ? 'var(--accent-cyan)' : 'var(--bg-card)',
                    color: isCurrent ? '#04111d' : 'var(--text-secondary)',
                    border: '1px solid var(--border-glass)',
                    padding: '6px 14px',
                    borderRadius: '999px',
                    fontSize: '0.76rem',
                    fontWeight: isCurrent ? 800 : 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    transition: 'var(--transition)',
                  }}
                >
                  {renderToolIcon(t.icon, 13, isCurrent ? '#04111d' : t.color || 'var(--accent-cyan)')}
                  <span>{t.name}</span>
                </button>
              );
            })}
          </div>

          {/* THE SPECIFIC TOOL IN FULL VIEWPORT */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass-bright)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            boxShadow: 'var(--shadow-card)',
            minHeight: '650px',
          }}>
            {/* Tool Active Component */}
            {openToolId === 'api-tester' && <ApiTesterTool />}
            {openToolId === 'json-formatter' && <JsonFormatterTool />}
            {openToolId === 'image-converter' && <ImageConverterTool />}
            {openToolId === 'api-performance' && <ApiPerformanceTool />}
            {openToolId === 'base64-tool' && <Base64Tool />}
            {openToolId === 'regex-tool' && <RegexTool />}

            {/* Feature Bullet Points */}
            {currentTool.features && (
              <div style={{
                marginTop: '36px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-glass)',
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono', marginBottom: '10px' }}>
                  Architecture &amp; Features:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
                  {currentTool.features.map((feat, idx) => (
                    <div key={idx} style={{
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}>
                      <span style={{ color: 'var(--accent-emerald)' }}>&bull;</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* ========================================================
          MODAL: "+ ADD NEW TOOL / BOILERPLATE GENERATOR"
          ======================================================== */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass-bright)',
            borderRadius: 'var(--radius-xl)',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
          }}>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                color: 'var(--text-secondary)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={15} />
            </button>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: 'var(--accent-cyan)',
              fontSize: '0.78rem',
              fontFamily: 'JetBrains Mono',
              fontWeight: 800,
              marginBottom: 8,
            }}>
              <Code2 size={14} /> PLUG-AND-PLAY TOOL GENERATOR
            </div>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              Add a New Utility Tool in 2 Steps
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
              Type the name of your tool and copy the generated snippets to add a 7th tool button:
            </p>

            {/* Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={{ fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Tool Display Name
                </label>
                <input
                  type="text"
                  value={newToolName}
                  onChange={(e) => {
                    setNewToolName(e.target.value);
                    setNewToolId(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'));
                  }}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    fontSize: '0.84rem',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Category
                </label>
                <select
                  value={newToolCategory}
                  onChange={(e) => setNewToolCategory(e.target.value as any)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    fontSize: '0.84rem',
                  }}
                >
                  <option value="utility">Utility & Security</option>
                  <option value="api">API & Network</option>
                  <option value="data">Data & JSON</option>
                  <option value="media">Media & Images</option>
                  <option value="perf">Performance Benchmark</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-dim)', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                Short Description
              </label>
              <input
                type="text"
                value={newToolDesc}
                onChange={(e) => setNewToolDesc(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  padding: '8px 12px',
                  fontSize: '0.84rem',
                }}
              />
            </div>

            {/* Step 1 Code Output */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono' }}>
                  STEP 1: Paste into src/data/tools.ts
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedRegistryCode);
                    setCopiedRegistry(true);
                    setTimeout(() => setCopiedRegistry(false), 2000);
                  }}
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-secondary)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {copiedRegistry ? <Check size={12} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={12} />}
                  <span>{copiedRegistry ? 'Copied' : 'Copy Registry Snippet'}</span>
                </button>
              </div>

              <pre style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.72rem',
                fontFamily: 'JetBrains Mono',
                color: 'var(--text-secondary)',
                maxHeight: '120px',
                overflowY: 'auto',
              }}>
                {generatedRegistryCode}
              </pre>
            </div>

            {/* Step 2 Code Output */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono' }}>
                  STEP 2: Component Starter Boilerplate
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedComponentCode);
                    setCopiedComponent(true);
                    setTimeout(() => setCopiedComponent(false), 2000);
                  }}
                  style={{
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-glass)',
                    color: 'var(--text-secondary)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {copiedComponent ? <Check size={12} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={12} />}
                  <span>{copiedComponent ? 'Copied' : 'Copy Component Code'}</span>
                </button>
              </div>

              <pre style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.72rem',
                fontFamily: 'JetBrains Mono',
                color: 'var(--text-secondary)',
                maxHeight: '140px',
                overflowY: 'auto',
              }}>
                {generatedComponentCode}
              </pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="btn-primary"
                style={{ padding: '8px 20px', fontSize: '0.86rem' }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
