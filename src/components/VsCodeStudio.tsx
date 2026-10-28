'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Folder, FolderOpen, FileCode, FileJson, Terminal, Wrench, 
  Send, Braces, Image as ImageIcon, Zap, ChevronRight, ChevronDown, 
  X, Maximize2, ExternalLink, Play, Radio, Cpu, Layers, Sparkles, Plus, CheckCircle2
} from 'lucide-react';

import ImageConverterTool from './tools/ImageConverterTool';
import ApiTesterTool from './tools/ApiTesterTool';
import JsonFormatterTool from './tools/JsonFormatterTool';
import ApiPerformanceTool from './tools/ApiPerformanceTool';
import DevTerminal from './DevTerminal';
import DevTabs from './DevTabs';
import SystemArchitecture from './SystemArchitecture';

interface OpenTab {
  id: string;
  name: string;
  type: 'profile' | 'tool' | 'code' | 'experience' | 'terminal' | 'arch';
  icon: React.ReactNode;
  toolRoute?: string;
}

export default function VsCodeStudio() {
  // Activity bar active section
  const [activeActivity, setActiveActivity] = useState<'explorer' | 'tools' | 'experience' | 'projects' | 'terminal'>('explorer');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Folder collapse states
  const [toolsFolderOpen, setToolsFolderOpen] = useState(true);
  const [portfolioFolderOpen, setPortfolioFolderOpen] = useState(true);

  // Open tabs
  const [tabs, setTabs] = useState<OpenTab[]>([
    {
      id: 'tab-profile',
      name: 'ManojKumar.tsx',
      type: 'profile',
      icon: <FileCode size={14} style={{ color: '#38bdf8' }} />,
    },
    {
      id: 'tab-image',
      name: 'image-converter.tool',
      type: 'tool',
      icon: <ImageIcon size={14} style={{ color: 'var(--accent-emerald)' }} />,
      toolRoute: '/tools/image-converter',
    },
    {
      id: 'tab-api',
      name: 'api-tester.tool',
      type: 'tool',
      icon: <Send size={14} style={{ color: '#38bdf8' }} />,
      toolRoute: '/tools/api-tester',
    },
    {
      id: 'tab-terminal',
      name: 'terminal.sh',
      type: 'terminal',
      icon: <Terminal size={14} style={{ color: '#a855f7' }} />,
    },
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('tab-profile');

  // Open a file or tool
  const openFile = (file: OpenTab) => {
    if (!tabs.find((t) => t.id === file.id)) {
      setTabs([...tabs, file]);
    }
    setActiveTabId(file.id);
  };

  // Close tab
  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeTabId === id && remaining.length > 0) {
      setActiveTabId(remaining[remaining.length - 1].id);
    }
  };

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className="vscode-studio-root" id="studio">
      {/* Top VS Code Window Bar */}
      <div className="vscode-window-header">
        <div className="vscode-window-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>

        <div className="vscode-window-title font-mono">
          <span>manoj.dev — Visual Studio Code &bull; Next.js 15 App Router</span>
        </div>

        <div className="vscode-window-actions">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="vscode-toggle-sidebar-btn font-mono"
            title="Toggle Sidebar (Ctrl+B)"
          >
            {sidebarOpen ? '◀ Hide Sidebar' : '▶ Show Sidebar'}
          </button>
        </div>
      </div>

      {/* Main Studio Frame */}
      <div className="vscode-studio-body">
        {/* 1. Slim Left Activity Bar */}
        <div className="vscode-activity-sidebar">
          <div className="activity-group-top">
            <button
              type="button"
              className={`activity-btn ${activeActivity === 'explorer' ? 'active' : ''}`}
              onClick={() => {
                setActiveActivity('explorer');
                setSidebarOpen(true);
              }}
              title="Explorer (Files & Tools)"
            >
              <Folder size={20} />
            </button>

            <button
              type="button"
              className={`activity-btn ${activeActivity === 'tools' ? 'active' : ''}`}
              onClick={() => {
                setActiveActivity('tools');
                setSidebarOpen(true);
              }}
              title="Tools Suite Manager"
            >
              <Wrench size={20} />
            </button>

            <button
              type="button"
              className={`activity-btn ${activeActivity === 'experience' ? 'active' : ''}`}
              onClick={() => {
                setActiveActivity('experience');
                setSidebarOpen(true);
              }}
              title="Experience & Education"
            >
              <FileJson size={20} />
            </button>

            <button
              type="button"
              className={`activity-btn ${activeActivity === 'projects' ? 'active' : ''}`}
              onClick={() => {
                setActiveActivity('projects');
                setSidebarOpen(true);
              }}
              title="Projects (70K+ App)"
            >
              <Layers size={20} />
            </button>

            <button
              type="button"
              className={`activity-btn ${activeActivity === 'terminal' ? 'active' : ''}`}
              onClick={() => {
                setActiveActivity('terminal');
                openFile({
                  id: 'tab-terminal',
                  name: 'terminal.sh',
                  type: 'terminal',
                  icon: <Terminal size={14} style={{ color: '#a855f7' }} />,
                });
              }}
              title="CLI Terminal Console"
            >
              <Terminal size={20} />
            </button>
          </div>

          <div className="activity-group-bottom">
            <Link href="/contact" className="activity-btn" title="Hire / Contact Manoj">
              <span style={{ fontSize: '0.85rem' }}>✉️</span>
            </Link>
          </div>
        </div>

        {/* 2. Side Panel / File & Tool Explorer */}
        {sidebarOpen && (
          <aside className="vscode-file-tree-sidebar">
            <div className="explorer-title-row">
              <span className="explorer-title font-mono">EXPLORER</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono' }}>
                MK-WORKSPACE
              </span>
            </div>

            {/* Folder 1: Portfolio Files */}
            <div className="tree-folder-group">
              <div 
                className="tree-folder-header"
                onClick={() => setPortfolioFolderOpen(!portfolioFolderOpen)}
              >
                {portfolioFolderOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span className="folder-name font-mono">SRC / PORTFOLIO</span>
              </div>

              {portfolioFolderOpen && (
                <div className="tree-file-list">
                  <div
                    className={`tree-file-item ${activeTabId === 'tab-profile' ? 'active' : ''}`}
                    onClick={() => openFile({
                      id: 'tab-profile',
                      name: 'ManojKumar.tsx',
                      type: 'profile',
                      icon: <FileCode size={14} style={{ color: '#38bdf8' }} />,
                    })}
                  >
                    <FileCode size={14} style={{ color: '#38bdf8' }} />
                    <span className="file-label font-mono">ManojKumar.tsx</span>
                  </div>

                  <div
                    className={`tree-file-item ${activeTabId === 'tab-engine' ? 'active' : ''}`}
                    onClick={() => openFile({
                      id: 'tab-engine',
                      name: 'LiveStreamEngine.ts',
                      type: 'code',
                      icon: <FileCode size={14} style={{ color: 'var(--accent-emerald)' }} />,
                    })}
                  >
                    <FileCode size={14} style={{ color: 'var(--accent-emerald)' }} />
                    <span className="file-label font-mono">LiveStreamEngine.ts</span>
                  </div>

                  <div
                    className={`tree-file-item ${activeTabId === 'tab-arch' ? 'active' : ''}`}
                    onClick={() => openFile({
                      id: 'tab-arch',
                      name: 'StreamingTopology.arch',
                      type: 'arch',
                      icon: <Radio size={14} style={{ color: '#a855f7' }} />,
                    })}
                  >
                    <Radio size={14} style={{ color: '#a855f7' }} />
                    <span className="file-label font-mono">StreamingTopology.arch</span>
                  </div>

                  <div
                    className={`tree-file-item ${activeTabId === 'tab-exp-json' ? 'active' : ''}`}
                    onClick={() => openFile({
                      id: 'tab-exp-json',
                      name: 'experience.json',
                      type: 'experience',
                      icon: <FileJson size={14} style={{ color: '#fbbf24' }} />,
                    })}
                  >
                    <FileJson size={14} style={{ color: '#fbbf24' }} />
                    <span className="file-label font-mono">experience.json</span>
                  </div>
                </div>
              )}
            </div>

            {/* Folder 2: Tools Suite (Extensible for adding 50+ tools!) */}
            <div className="tree-folder-group" style={{ marginTop: '8px' }}>
              <div 
                className="tree-folder-header"
                onClick={() => setToolsFolderOpen(!toolsFolderOpen)}
              >
                {toolsFolderOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span className="folder-name font-mono" style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  TOOLS SUITE (4 ACTIVE)
                </span>
              </div>

              {toolsFolderOpen && (
                <div className="tree-file-list">
                  <div
                    className={`tree-file-item ${activeTabId === 'tab-image' ? 'active' : ''}`}
                    onClick={() => openFile({
                      id: 'tab-image',
                      name: 'image-converter.tool',
                      type: 'tool',
                      icon: <ImageIcon size={14} style={{ color: 'var(--accent-emerald)' }} />,
                      toolRoute: '/tools/image-converter',
                    })}
                  >
                    <ImageIcon size={14} style={{ color: 'var(--accent-emerald)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="file-label font-mono">image-converter.tool</span>
                      <span style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>WebP/AVIF &amp; Folder ZIP</span>
                    </div>
                  </div>

                  <div
                    className={`tree-file-item ${activeTabId === 'tab-api' ? 'active' : ''}`}
                    onClick={() => openFile({
                      id: 'tab-api',
                      name: 'api-tester.tool',
                      type: 'tool',
                      icon: <Send size={14} style={{ color: '#38bdf8' }} />,
                      toolRoute: '/tools/api-tester',
                    })}
                  >
                    <Send size={14} style={{ color: '#38bdf8' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="file-label font-mono">api-tester.tool</span>
                      <span style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>REST &amp; Latency Gauge</span>
                    </div>
                  </div>

                  <div
                    className={`tree-file-item ${activeTabId === 'tab-json' ? 'active' : ''}`}
                    onClick={() => openFile({
                      id: 'tab-json',
                      name: 'json-formatter.tool',
                      type: 'tool',
                      icon: <Braces size={14} style={{ color: '#a855f7' }} />,
                      toolRoute: '/tools/json-formatter',
                    })}
                  >
                    <Braces size={14} style={{ color: '#a855f7' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="file-label font-mono">json-formatter.tool</span>
                      <span style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>AST Lint &amp; Prettify</span>
                    </div>
                  </div>

                  <div
                    className={`tree-file-item ${activeTabId === 'tab-perf' ? 'active' : ''}`}
                    onClick={() => openFile({
                      id: 'tab-perf',
                      name: 'api-performance.tool',
                      type: 'tool',
                      icon: <Zap size={14} style={{ color: '#fbbf24' }} />,
                      toolRoute: '/tools/api-performance',
                    })}
                  >
                    <Zap size={14} style={{ color: '#fbbf24' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="file-label font-mono">api-performance.tool</span>
                      <span style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>Concurrency &amp; TTFB</span>
                    </div>
                  </div>

                  {/* Add New Tool Extensibility Hook */}
                  <Link
                    href="/tools"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      borderRadius: '6px',
                      color: 'var(--accent-emerald)',
                      fontSize: '0.74rem',
                      fontFamily: 'JetBrains Mono',
                      textDecoration: 'none',
                      marginTop: '6px',
                      background: 'var(--bg-card-hover)',
                      border: '1px dashed var(--border-accent)',
                    }}
                  >
                    <Plus size={13} />
                    <span>Explore Central Tools Hub ➔</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Folder 3: Terminal */}
            <div className="tree-folder-group" style={{ marginTop: '8px' }}>
              <div
                className={`tree-file-item ${activeTabId === 'tab-terminal' ? 'active' : ''}`}
                onClick={() => openFile({
                  id: 'tab-terminal',
                  name: 'terminal.sh',
                  type: 'terminal',
                  icon: <Terminal size={14} style={{ color: '#a855f7' }} />,
                })}
              >
                <Terminal size={14} style={{ color: '#a855f7' }} />
                <span className="file-label font-mono">&gt;_ terminal.sh</span>
              </div>
            </div>
          </aside>
        )}

        {/* 3. Main Editor Workstation Area */}
        <main className="vscode-editor-pane">
          {/* Editor Tabs Bar */}
          <div className="vscode-editor-tabs-bar">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`editor-tab ${isActive ? 'active' : ''}`}
                >
                  {tab.icon}
                  <span className="tab-title font-mono">{tab.name}</span>
                  {tabs.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => closeTab(e, tab.id)}
                      className="tab-close-btn"
                      title="Close Tab"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Breadcrumb Path Bar */}
          <div className="vscode-breadcrumbs-bar">
            <span style={{ color: 'var(--text-dim)' }}>manoj-portfolio</span>
            <span>&gt;</span>
            <span style={{ color: 'var(--text-dim)' }}>
              {activeTab?.type === 'tool' ? 'src/tools' : 'src/portfolio'}
            </span>
            <span>&gt;</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{activeTab?.name}</span>

            {/* If tool is open, provide direct Launch Full Studio button */}
            {activeTab?.toolRoute && (
              <div style={{ marginLeft: 'auto' }}>
                <Link
                  href={activeTab.toolRoute}
                  className="open-fullscreen-studio-link"
                  title="Open this tool in a dedicated full-screen page"
                >
                  <span>Launch Dedicated Studio Page</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            )}
          </div>

          {/* Editor Body Render */}
          <div className="vscode-editor-viewport">
            
            {/* TAB: ManojKumar.tsx (Profile & Overview) */}
            {activeTab?.id === 'tab-profile' && (
              <div className="editor-profile-container">
                <div className="profile-grid">
                  <div className="profile-info-column">
                    <div className="hero-status-tag">
                      <span className="pulse-dot"></span>
                      <span>Insanger Private Limited &bull; Noida, India</span>
                    </div>

                    <h2 className="editor-big-title">
                      Manoj Kumar — <span style={{ color: 'var(--accent-emerald)' }}>Software Developer</span>
                    </h2>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                      Specialized in <strong>backend services, real-time live-streaming architectures</strong> (ZEGOCLOUD / Agora), <strong>Socket.IO presence engines</strong>, and full-stack React / React Native applications.
                      Contributed to 4+ live-streaming platforms including an app with <strong style={{ color: 'var(--accent-emerald)' }}>70,000+ Google Play downloads</strong>.
                    </p>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '14px 0' }}>
                      {['Node.js', 'Socket.IO', 'ZEGOCLOUD', 'Agora', 'Redis', 'BullMQ', 'React Native', 'Next.js', 'MongoDB', 'PostgreSQL'].map((t) => (
                        <span key={t} className="tag-chip" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>{t}</span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => openFile({
                          id: 'tab-image',
                          name: 'image-converter.tool',
                          type: 'tool',
                          icon: <ImageIcon size={14} style={{ color: 'var(--accent-emerald)' }} />,
                          toolRoute: '/tools/image-converter',
                        })}
                        className="btn-editorial-primary"
                        style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                      >
                        <ImageIcon size={15} /> Try Image &amp; Folder Converter
                      </button>

                      <button
                        type="button"
                        onClick={() => openFile({
                          id: 'tab-api',
                          name: 'api-tester.tool',
                          type: 'tool',
                          icon: <Send size={14} style={{ color: '#38bdf8' }} />,
                          toolRoute: '/tools/api-tester',
                        })}
                        className="btn-editorial-secondary"
                        style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                      >
                        <Send size={15} /> Test Live API Tool
                      </button>

                      <a
                        href="mailto:manoj2022019@gmail.com?subject=Job%20Inquiry%20for%20Manoj%20Kumar"
                        className="btn-editorial-secondary"
                        style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                      >
                        Hire Manoj
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Avatar Deck */}
                  <div className="profile-visual-column">
                    <div className="editor-avatar-box">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/developer_avatar.jpg"
                        alt="Manoj Kumar - Software Developer"
                        className="editor-avatar-img"
                      />
                    </div>

                    <div style={{
                      background: 'var(--bg-card-hover)',
                      border: '1px solid var(--border-glass-bright)',
                      borderRadius: '12px',
                      padding: '14px',
                      width: '100%',
                      maxWidth: '280px',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono' }}>
                        70K+ Downloads
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginTop: 2 }}>
                        Google Play Live Stream Suite
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: image-converter.tool */}
            {activeTab?.id === 'tab-image' && (
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      🖼️ Image &amp; Entire Folder Batch Converter
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: 2 }}>
                      Convert WebP, AVIF, PNG, JPEG with dual preview, split slider, and download folder as ZIP.
                    </p>
                  </div>
                  <Link
                    href="/tools/image-converter"
                    className="btn-editorial-primary"
                    style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                  >
                    Open Fullscreen Studio Page ➔
                  </Link>
                </div>
                <ImageConverterTool />
              </div>
            )}

            {/* TAB: api-tester.tool */}
            {activeTab?.id === 'tab-api' && (
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      📡 REST API Tester &amp; Inspector
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: 2 }}>
                      Send real HTTP requests, inspect latency timing breakdown, headers, and formatted payloads.
                    </p>
                  </div>
                  <Link
                    href="/tools/api-tester"
                    className="btn-editorial-primary"
                    style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                  >
                    Open Fullscreen API Studio ➔
                  </Link>
                </div>
                <ApiTesterTool />
              </div>
            )}

            {/* TAB: json-formatter.tool */}
            {activeTab?.id === 'tab-json' && (
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      🧩 JSON Formatter &amp; AST Validator
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: 2 }}>
                      Prettify, minify, sort keys, validate syntax errors, and copy clean payload.
                    </p>
                  </div>
                  <Link
                    href="/tools/json-formatter"
                    className="btn-editorial-primary"
                    style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                  >
                    Open Fullscreen JSON Studio ➔
                  </Link>
                </div>
                <JsonFormatterTool />
              </div>
            )}

            {/* TAB: api-performance.tool */}
            {activeTab?.id === 'tab-perf' && (
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      ⚡ API Latency &amp; Concurrency Benchmark
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: 2 }}>
                      Simulate high concurrency and calculate P50, P95, P99 latency percentiles.
                    </p>
                  </div>
                  <Link
                    href="/tools/api-performance"
                    className="btn-editorial-primary"
                    style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                  >
                    Open Fullscreen Benchmark ➔
                  </Link>
                </div>
                <ApiPerformanceTool />
              </div>
            )}

            {/* TAB: LiveStreamEngine.ts */}
            {activeTab?.id === 'tab-engine' && (
              <div style={{ padding: '0' }}>
                <DevTabs />
              </div>
            )}

            {/* TAB: StreamingTopology.arch */}
            {activeTab?.id === 'tab-arch' && (
              <div style={{ padding: '24px' }}>
                <SystemArchitecture />
              </div>
            )}

            {/* TAB: experience.json */}
            {activeTab?.id === 'tab-exp-json' && (
              <div style={{ padding: '24px', fontFamily: 'JetBrains Mono', fontSize: '0.84rem' }}>
                <pre style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.65 }}>
{`{
  "developer": "Manoj Kumar",
  "location": "Noida, India",
  "phone": "+91 9667328778",
  "email": "manoj2022019@gmail.com",
  "education": {
    "degree": "Bachelor of Computer Applications (BCA)",
    "university": "Glocal University",
    "years": "2021 – 2024"
  },
  "workExperience": [
    {
      "company": "Insanger Private Limited",
      "role": "Software Developer",
      "period": "Apr 2025 – Present",
      "scale": "4+ Live Streaming Apps • 70,000+ Downloads",
      "coreStack": ["Node.js", "Socket.IO", "ZEGOCLOUD", "Agora RTC", "BullMQ", "Redis"]
    },
    {
      "company": "Megaminds",
      "role": "Software Developer",
      "period": "Aug 2024 – Feb 2025",
      "coreStack": ["React Native", "Expo", "Next.js", "Firebase FCM"]
    },
    {
      "company": "Manma",
      "role": "Junior Developer",
      "period": "Nov 2023 – May 2024",
      "coreStack": ["Express.js", "MongoDB", "React.js"]
    }
  ]
}`}
                </pre>
              </div>
            )}

            {/* TAB: terminal.sh */}
            {activeTab?.id === 'tab-terminal' && (
              <div style={{ padding: 0 }}>
                <DevTerminal />
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
