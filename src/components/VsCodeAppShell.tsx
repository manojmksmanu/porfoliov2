'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Folder, FolderOpen, FileCode, FileJson, Terminal, Wrench, 
  Send, Braces, Image as ImageIcon, Zap, ChevronRight, ChevronDown, 
  X, Maximize2, ExternalLink, Play, Radio, Cpu, Layers, Sparkles, Plus, 
  Search, CheckCircle2, Mail, Phone, Github, Linkedin, Briefcase, GraduationCap,
  PanelLeftClose, PanelLeft, Code2, SlidersHorizontal, GitBranch, AlertTriangle,
  RotateCw, Check, CheckCircle
} from 'lucide-react';

import ThemeToggle from './ThemeToggle';
import Hero from './Hero';
import ExperienceSection from './ExperienceSection';
import ToolsSection from './ToolsSection';
import ProjectsSection from './ProjectsSection';
import ContactCTA from './ContactCTA';
import Footer from './Footer';

import ImageConverterTool from './tools/ImageConverterTool';
import ApiTesterTool from './tools/ApiTesterTool';
import JsonFormatterTool from './tools/JsonFormatterTool';
import ApiPerformanceTool from './tools/ApiPerformanceTool';
import Base64Tool from './tools/Base64Tool';
import RegexTool from './tools/RegexTool';
import DevTerminal from './DevTerminal';
import DevTabs from './DevTabs';
import SystemArchitecture from './SystemArchitecture';

export interface OpenFileTab {
  id: string;
  name: string;
  category: 'portfolio' | 'tool' | 'code' | 'terminal';
  icon: React.ReactNode;
  toolRoute?: string;
  badge?: string;
}

export default function VsCodeAppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeActivity, setActiveActivity] = useState<'explorer' | 'tools' | 'experience' | 'projects' | 'terminal'>('explorer');

  // Folder collapse states for Explorer
  const [portfolioFolderOpen, setPortfolioFolderOpen] = useState(true);
  const [toolsFolderOpen, setToolsFolderOpen] = useState(true);
  const [configFolderOpen, setConfigFolderOpen] = useState(true);
  const [openEditorsOpen, setOpenEditorsOpen] = useState(true);
  const [outlineOpen, setOutlineOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);

  // Tools Search in Tools Activity View
  const [toolSearch, setToolSearch] = useState('');

  // Registry of all known tabs
  const allKnownFiles: Record<string, OpenFileTab> = {
    'tab-overview': {
      id: 'tab-overview',
      name: 'ManojKumar.tsx',
      category: 'portfolio',
      icon: <FileCode size={14} style={{ color: 'var(--accent-cyan)' }} />,
      badge: 'Main',
    },
    'tab-image': {
      id: 'tab-image',
      name: 'image-converter.tool',
      category: 'tool',
      icon: <ImageIcon size={14} style={{ color: 'var(--accent-emerald)' }} />,
      toolRoute: '/tools/image-converter',
      badge: 'Folder ZIP',
    },
    'tab-api': {
      id: 'tab-api',
      name: 'api-tester.tool',
      category: 'tool',
      icon: <Send size={14} style={{ color: 'var(--accent-cyan)' }} />,
      toolRoute: '/tools/api-tester',
      badge: 'Live Fetch',
    },
    'tab-json': {
      id: 'tab-json',
      name: 'json-formatter.tool',
      category: 'tool',
      icon: <Braces size={14} style={{ color: 'var(--accent-purple)' }} />,
      toolRoute: '/tools/json-formatter',
      badge: 'AST Lint',
    },
    'tab-perf': {
      id: 'tab-perf',
      name: 'api-performance.tool',
      category: 'tool',
      icon: <Zap size={14} style={{ color: '#fbbf24' }} />,
      toolRoute: '/tools/api-performance',
      badge: 'Benchmark',
    },
    'tab-base64': {
      id: 'tab-base64',
      name: 'base64-hash.tool',
      category: 'tool',
      icon: <SlidersHorizontal size={14} style={{ color: 'var(--accent-emerald)' }} />,
      badge: 'UTF-8',
    },
    'tab-regex': {
      id: 'tab-regex',
      name: 'regex-tester.tool',
      category: 'tool',
      icon: <Search size={14} style={{ color: 'var(--accent-cyan)' }} />,
      badge: 'Live Match',
    },
    'tab-experience': {
      id: 'tab-experience',
      name: 'experience.json',
      category: 'portfolio',
      icon: <FileJson size={14} style={{ color: '#fbbf24' }} />,
      badge: 'Resume',
    },
    'tab-projects': {
      id: 'tab-projects',
      name: 'projects.ts',
      category: 'portfolio',
      icon: <Layers size={14} style={{ color: 'var(--accent-emerald)' }} />,
      badge: '70K+ App',
    },
    'tab-arch': {
      id: 'tab-arch',
      name: 'StreamingTopology.arch',
      category: 'code',
      icon: <Radio size={14} style={{ color: 'var(--accent-purple)' }} />,
      badge: 'RTC',
    },
    'tab-engine-code': {
      id: 'tab-engine-code',
      name: 'LiveStreamEngine.ts',
      category: 'code',
      icon: <Code2 size={14} style={{ color: 'var(--accent-cyan)' }} />,
      badge: 'TypeScript',
    },
    'tab-package': {
      id: 'tab-package',
      name: 'package.json',
      category: 'code',
      icon: <FileJson size={14} style={{ color: '#ef4444' }} />,
      badge: 'npm',
    },
    'tab-readme': {
      id: 'tab-readme',
      name: 'README.md',
      category: 'code',
      icon: <FileCode size={14} style={{ color: 'var(--accent-cyan)' }} />,
      badge: 'Docs',
    },
    'tab-contact': {
      id: 'tab-contact',
      name: 'contact.env',
      category: 'portfolio',
      icon: <Mail size={14} style={{ color: 'var(--accent-emerald)' }} />,
      badge: 'Hire',
    },
    'tab-terminal': {
      id: 'tab-terminal',
      name: 'terminal.sh',
      category: 'terminal',
      icon: <Terminal size={14} style={{ color: 'var(--accent-purple)' }} />,
      badge: 'CLI',
    },
  };

  // Open tabs list
  const [tabs, setTabs] = useState<OpenFileTab[]>([
    allKnownFiles['tab-overview'],
    allKnownFiles['tab-image'],
    allKnownFiles['tab-experience'],
    allKnownFiles['tab-terminal'],
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('tab-overview');

  const openFile = (file: OpenFileTab) => {
    if (!tabs.find((t) => t.id === file.id)) {
      setTabs([...tabs, file]);
    }
    setActiveTabId(file.id);
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeTabId === id && remaining.length > 0) {
      setActiveTabId(remaining[remaining.length - 1].id);
    }
  };

  // Listen for open-vscode-tab event from any card on page
  useEffect(() => {
    const handleOpenTab = (e: CustomEvent<{ tabId: string; name?: string }>) => {
      const { tabId } = e.detail;
      const target = allKnownFiles[tabId];
      if (target) {
        openFile(target);
      }
    };
    window.addEventListener('open-vscode-tab' as unknown as string, handleOpenTab as EventListener);
    return () => window.removeEventListener('open-vscode-tab' as unknown as string, handleOpenTab as EventListener);
  }, [tabs]);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className="vscode-full-app-container">
      {/* 1. Left Authentic Activity Bar */}
      <nav className="vscode-main-activity-bar" aria-label="Activity Bar">
        <div className="activity-bar-top">
          {/* Explorer */}
          <button
            type="button"
            className={`activity-bar-icon ${activeActivity === 'explorer' && sidebarOpen ? 'active' : ''}`}
            onClick={() => {
              if (activeActivity === 'explorer') {
                setSidebarOpen(!sidebarOpen);
              } else {
                setActiveActivity('explorer');
                setSidebarOpen(true);
              }
            }}
            title="Explorer (Files, Resume &amp; Tools)"
          >
            <Folder size={22} />
          </button>

          {/* Tools Suite Manager */}
          <button
            type="button"
            className={`activity-bar-icon ${activeActivity === 'tools' && sidebarOpen ? 'active' : ''}`}
            onClick={() => {
              if (activeActivity === 'tools') {
                setSidebarOpen(!sidebarOpen);
              } else {
                setActiveActivity('tools');
                setSidebarOpen(true);
              }
            }}
            title="Tools Suite Manager (Extensible)"
          >
            <Wrench size={22} />
            <span className="activity-badge">6</span>
          </button>

          {/* Experience & Education */}
          <button
            type="button"
            className={`activity-bar-icon ${activeActivity === 'experience' && sidebarOpen ? 'active' : ''}`}
            onClick={() => {
              if (activeActivity === 'experience') {
                setSidebarOpen(!sidebarOpen);
              } else {
                setActiveActivity('experience');
                setSidebarOpen(true);
                openFile(allKnownFiles['tab-experience']);
              }
            }}
            title="Career Timeline &amp; Education"
          >
            <Briefcase size={22} />
          </button>

          {/* Projects Gallery */}
          <button
            type="button"
            className={`activity-bar-icon ${activeActivity === 'projects' && sidebarOpen ? 'active' : ''}`}
            onClick={() => {
              if (activeActivity === 'projects') {
                setSidebarOpen(!sidebarOpen);
              } else {
                setActiveActivity('projects');
                setSidebarOpen(true);
                openFile(allKnownFiles['tab-projects']);
              }
            }}
            title="Projects Gallery (70K+ Downloads App)"
          >
            <Layers size={22} />
          </button>

          {/* Terminal CLI */}
          <button
            type="button"
            className={`activity-bar-icon ${activeActivity === 'terminal' ? 'active' : ''}`}
            onClick={() => {
              setActiveActivity('terminal');
              openFile(allKnownFiles['tab-terminal']);
            }}
            title="Interactive CLI Terminal"
          >
            <Terminal size={22} />
          </button>

          {/* Search / Command Palette */}
          <button
            type="button"
            className="activity-bar-icon"
            onClick={openPalette}
            title="Search Files &amp; Commands (⌘K)"
          >
            <Search size={22} />
          </button>
        </div>

        <div className="activity-bar-bottom">
          <a
            href="mailto:manoj2022019@gmail.com?subject=Job%20Inquiry%20for%20Manoj%20Kumar"
            className="activity-bar-icon"
            title="Hire Manoj Kumar (Email)"
          >
            <Mail size={22} />
          </a>
          <a
            href="https://github.com/manojmksmanu"
            target="_blank"
            rel="noreferrer"
            className="activity-bar-icon"
            title="GitHub Profile (@manojmksmanu)"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com/in/manoj-kumar-05b2b91aa"
            target="_blank"
            rel="noreferrer"
            className="activity-bar-icon"
            title="LinkedIn Profile"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </nav>

      {/* 2. Left Collapsible VS Code Primary Sidebar */}
      {sidebarOpen && (
        <aside className="vscode-main-file-tree">
          
          {/* ==============================================
             SIDEBAR VIEW 1: EXPLORER (FILES & TOOLS)
             ============================================== */}
          {activeActivity === 'explorer' && (
            <>
              {/* Header */}
              <div className="file-tree-header">
                <div className="tree-header-left">
                  <span className="tree-title font-mono">EXPLORER</span>
                  <span className="tree-workspace-tag font-mono">MANOJ.DEV</span>
                </div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setPortfolioFolderOpen(true);
                      setToolsFolderOpen(true);
                    }}
                    className="tree-collapse-btn"
                    title="Refresh Tree"
                  >
                    <RotateCw size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="tree-collapse-btn"
                    title="Close Sidebar (Ctrl+B)"
                  >
                    <PanelLeftClose size={14} />
                  </button>
                </div>
              </div>

              {/* Section 0: Open Editors */}
              <div className="tree-section">
                <div 
                  className="tree-section-header"
                  onClick={() => setOpenEditorsOpen(!openEditorsOpen)}
                >
                  {openEditorsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>OPEN EDITORS ({tabs.length})</span>
                </div>

                {openEditorsOpen && (
                  <div className="tree-items-list" style={{ marginBottom: 6 }}>
                    {tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={`tree-leaf-item ${activeTabId === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTabId(tab.id)}
                      >
                        {tab.icon}
                        <span className="font-mono leaf-label">{tab.name}</span>
                        {tabs.length > 1 && (
                          <button
                            type="button"
                            onClick={(e) => closeTab(e, tab.id)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 2 }}
                            title="Close"
                          >
                            <X size={11} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 1: Portfolio Files */}
              <div className="tree-section">
                <div 
                  className="tree-section-header"
                  onClick={() => setPortfolioFolderOpen(!portfolioFolderOpen)}
                >
                  {portfolioFolderOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>PORTFOLIO / SHOWCASE</span>
                </div>

                {portfolioFolderOpen && (
                  <div className="tree-items-list">
                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-overview' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-overview'])}
                    >
                      <FileCode size={14} style={{ color: 'var(--accent-cyan)' }} />
                      <span className="font-mono leaf-label">ManojKumar.tsx</span>
                      <span className="leaf-badge font-mono">Profile</span>
                    </div>

                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-experience' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-experience'])}
                    >
                      <FileJson size={14} style={{ color: '#fbbf24' }} />
                      <span className="font-mono leaf-label">experience.json</span>
                      <span className="leaf-badge font-mono">Resume</span>
                    </div>

                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-projects' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-projects'])}
                    >
                      <Layers size={14} style={{ color: 'var(--accent-emerald)' }} />
                      <span className="font-mono leaf-label">projects.ts</span>
                      <span className="leaf-badge font-mono" style={{ color: 'var(--accent-emerald)' }}>70K+</span>
                    </div>

                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-arch' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-arch'])}
                    >
                      <Radio size={14} style={{ color: 'var(--accent-purple)' }} />
                      <span className="font-mono leaf-label">StreamingTopology.arch</span>
                      <span className="leaf-badge font-mono">RTC</span>
                    </div>

                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-engine-code' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-engine-code'])}
                    >
                      <Code2 size={14} style={{ color: 'var(--accent-cyan)' }} />
                      <span className="font-mono leaf-label">LiveStreamEngine.ts</span>
                      <span className="leaf-badge font-mono">Backend</span>
                    </div>

                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-contact' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-contact'])}
                    >
                      <Mail size={14} style={{ color: 'var(--accent-emerald)' }} />
                      <span className="font-mono leaf-label">contact.env</span>
                      <span className="leaf-badge font-mono">Hire</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 2: Extensible Developer Tools (6 Tools!) */}
              <div className="tree-section" style={{ marginTop: '8px' }}>
                <div 
                  className="tree-section-header"
                  onClick={() => setToolsFolderOpen(!toolsFolderOpen)}
                >
                  {toolsFolderOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span style={{ color: 'var(--accent-emerald)' }}>
                    DEVELOPER TOOLS (6)
                  </span>
                </div>

                {toolsFolderOpen && (
                  <div className="tree-items-list">
                    {/* Tool 1 */}
                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-image' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-image'])}
                    >
                      <ImageIcon size={14} style={{ color: 'var(--accent-emerald)' }} />
                      <span className="font-mono leaf-label">image-converter.tool</span>
                      <span className="leaf-badge font-mono">ZIP</span>
                    </div>

                    {/* Tool 2 */}
                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-api' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-api'])}
                    >
                      <Send size={14} style={{ color: 'var(--accent-cyan)' }} />
                      <span className="font-mono leaf-label">api-tester.tool</span>
                      <span className="leaf-badge font-mono">HTTP</span>
                    </div>

                    {/* Tool 3 */}
                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-json' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-json'])}
                    >
                      <Braces size={14} style={{ color: 'var(--accent-purple)' }} />
                      <span className="font-mono leaf-label">json-formatter.tool</span>
                      <span className="leaf-badge font-mono">Lint</span>
                    </div>

                    {/* Tool 4 */}
                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-perf' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-perf'])}
                    >
                      <Zap size={14} style={{ color: '#fbbf24' }} />
                      <span className="font-mono leaf-label">api-performance.tool</span>
                      <span className="leaf-badge font-mono">P95</span>
                    </div>

                    {/* Tool 5: Base64 */}
                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-base64' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-base64'])}
                    >
                      <SlidersHorizontal size={14} style={{ color: 'var(--accent-emerald)' }} />
                      <span className="font-mono leaf-label">base64-hash.tool</span>
                      <span className="leaf-badge font-mono">B64</span>
                    </div>

                    {/* Tool 6: Regex */}
                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-regex' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-regex'])}
                    >
                      <Search size={14} style={{ color: 'var(--accent-cyan)' }} />
                      <span className="font-mono leaf-label">regex-tester.tool</span>
                      <span className="leaf-badge font-mono">Regex</span>
                    </div>

                    <Link
                      href="/tools"
                      className="tree-add-tool-link font-mono"
                    >
                      <Plus size={13} />
                      <span>Browse All Tools Studio ➔</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Section 2.5: Config & Specifications */}
              <div className="tree-section" style={{ marginTop: '8px' }}>
                <div 
                  className="tree-section-header"
                  onClick={() => setConfigFolderOpen(!configFolderOpen)}
                >
                  {configFolderOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>CONFIG &amp; SPECS</span>
                </div>

                {configFolderOpen && (
                  <div className="tree-items-list">
                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-package' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-package'])}
                    >
                      <FileJson size={14} style={{ color: '#ef4444' }} />
                      <span className="font-mono leaf-label">package.json</span>
                      <span className="leaf-badge font-mono">npm</span>
                    </div>

                    <div
                      className={`tree-leaf-item ${activeTabId === 'tab-readme' ? 'active' : ''}`}
                      onClick={() => openFile(allKnownFiles['tab-readme'])}
                    >
                      <FileCode size={14} style={{ color: 'var(--accent-cyan)' }} />
                      <span className="font-mono leaf-label">README.md</span>
                      <span className="leaf-badge font-mono">Docs</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Outline */}
              <div className="tree-section" style={{ marginTop: '8px' }}>
                <div 
                  className="tree-section-header"
                  onClick={() => setOutlineOpen(!outlineOpen)}
                >
                  {outlineOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>OUTLINE</span>
                </div>
                {outlineOpen && (
                  <div className="tree-items-list">
                    <a href="#about" className="tree-leaf-item" style={{ textDecoration: 'none' }}>
                      <span className="leaf-label"># Hero &amp; Headline</span>
                    </a>
                    <a href="#experience" className="tree-leaf-item" style={{ textDecoration: 'none' }}>
                      <span className="leaf-label"># Work Experience</span>
                    </a>
                    <a href="#tools" className="tree-leaf-item" style={{ textDecoration: 'none' }}>
                      <span className="leaf-label"># Developer Tools Suite</span>
                    </a>
                    <a href="#projects" className="tree-leaf-item" style={{ textDecoration: 'none' }}>
                      <span className="leaf-label"># Flagship 70K+ App</span>
                    </a>
                    <a href="#contact" className="tree-leaf-item" style={{ textDecoration: 'none' }}>
                      <span className="leaf-label"># Hire &amp; Contact</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Section 4: Timeline */}
              <div className="tree-section" style={{ marginTop: '8px' }}>
                <div 
                  className="tree-section-header"
                  onClick={() => setTimelineOpen(!timelineOpen)}
                >
                  {timelineOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span>TIMELINE (GIT COMMITS)</span>
                </div>
                {timelineOpen && (
                  <div className="tree-items-list" style={{ fontSize: '0.74rem' }}>
                    <div className="tree-leaf-item" onClick={() => openFile(allKnownFiles['tab-experience'])}>
                      <GitBranch size={12} style={{ color: 'var(--accent-emerald)' }} />
                      <span className="leaf-label">2025 Insanger (70K+ App)</span>
                    </div>
                    <div className="tree-leaf-item" onClick={() => openFile(allKnownFiles['tab-experience'])}>
                      <GitBranch size={12} style={{ color: 'var(--accent-cyan)' }} />
                      <span className="leaf-label">2024 Megaminds (React/Node)</span>
                    </div>
                    <div className="tree-leaf-item" onClick={() => openFile(allKnownFiles['tab-experience'])}>
                      <GitBranch size={12} style={{ color: '#fbbf24' }} />
                      <span className="leaf-label">2023 Manma Technologies</span>
                    </div>
                    <div className="tree-leaf-item" onClick={() => openFile(allKnownFiles['tab-experience'])}>
                      <GitBranch size={12} style={{ color: 'var(--accent-purple)' }} />
                      <span className="leaf-label">2021 Glocal University BCA</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ==============================================
             SIDEBAR VIEW 2: TOOLS SUITE EXPLORER
             ============================================== */}
          {activeActivity === 'tools' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="file-tree-header">
                <div className="tree-header-left">
                  <span className="tree-title font-mono">TOOLS SUITE (6)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="tree-collapse-btn"
                >
                  <PanelLeftClose size={14} />
                </button>
              </div>

              {/* Quick Search */}
              <div style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <Search size={13} style={{ color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  value={toolSearch}
                  onChange={(e) => setToolSearch(e.target.value)}
                  placeholder="Filter 6 developer tools..."
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.78rem',
                    width: '100%',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Tools List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  {
                    tab: allKnownFiles['tab-image'],
                    sub: 'WebP / AVIF & Entire Folder ZIP',
                    cat: 'Media',
                  },
                  {
                    tab: allKnownFiles['tab-api'],
                    sub: 'REST HTTP Client & Latency',
                    cat: 'Network',
                  },
                  {
                    tab: allKnownFiles['tab-json'],
                    sub: 'Prettify, Minify & Linting',
                    cat: 'Data',
                  },
                  {
                    tab: allKnownFiles['tab-perf'],
                    sub: 'P50 / P95 Latency Benchmark',
                    cat: 'Perf',
                  },
                  {
                    tab: allKnownFiles['tab-base64'],
                    sub: 'Base64 Text & File Hash',
                    cat: 'Utility',
                  },
                  {
                    tab: allKnownFiles['tab-regex'],
                    sub: 'Regular Expression Matcher',
                    cat: 'Utility',
                  },
                ]
                  .filter((t) =>
                    t.tab.name.toLowerCase().includes(toolSearch.toLowerCase()) ||
                    t.sub.toLowerCase().includes(toolSearch.toLowerCase()) ||
                    t.cat.toLowerCase().includes(toolSearch.toLowerCase())
                  )
                  .map((t) => (
                    <div
                      key={t.tab.id}
                      onClick={() => openFile(t.tab)}
                      style={{
                        padding: '10px',
                        background: activeTabId === t.tab.id ? 'rgba(0,0,0,0.08)' : 'var(--bg-card)',
                        border: activeTabId === t.tab.id ? '1px solid var(--accent-emerald)' : '1px solid var(--border-glass)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                        transition: 'var(--transition)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                          {t.tab.icon}
                          <span>{t.tab.name}</span>
                        </div>
                        <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px', background: 'var(--vscode-sidebar-section-header)', color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono' }}>
                          {t.cat}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', paddingLeft: 21 }}>
                        {t.sub}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Extensible Info */}
              <div style={{
                background: 'var(--vscode-sidebar-section-header)',
                border: '1px dashed var(--border-accent)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                <strong style={{ color: 'var(--text-primary)' }}>🔌 Extensible Architecture</strong>
                <p style={{ marginTop: 4 }}>
                  Add any number of future tools in <code>src/data/tools.ts</code>. They immediately show up here!
                </p>
                <Link
                  href="/tools"
                  style={{ color: 'var(--accent-emerald)', fontWeight: 700, display: 'inline-block', marginTop: 6, textDecoration: 'none' }}
                >
                  Open Central Tools Hub ➔
                </Link>
              </div>
            </div>
          )}

          {/* ==============================================
             SIDEBAR VIEW 3: EXPERIENCE EXPLORER
             ============================================== */}
          {activeActivity === 'experience' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="file-tree-header">
                <div className="tree-header-left">
                  <span className="tree-title font-mono">CAREER &amp; RESUME</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="tree-collapse-btn"
                >
                  <PanelLeftClose size={14} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  {
                    company: 'Insanger Private Limited',
                    role: 'Software Developer',
                    period: 'Apr 2025 – Present',
                    highlight: '70,000+ Downloads Live App, ZEGOCLOUD RTC',
                    color: 'var(--accent-emerald)',
                  },
                  {
                    company: 'Megaminds Technology',
                    role: 'Software Developer',
                    period: 'Aug 2024 – Feb 2025',
                    highlight: 'React Native, Node.js, Real-time Chat',
                    color: 'var(--accent-cyan)',
                  },
                  {
                    company: 'Manma Technologies',
                    role: 'Junior Developer',
                    period: 'Nov 2023 – May 2024',
                    highlight: 'Express.js & MongoDB Optimization',
                    color: '#fbbf24',
                  },
                  {
                    company: 'Glocal University',
                    role: 'BCA Degree (Computer Apps)',
                    period: '2021 – 2024',
                    highlight: 'Data Structures, Networking, Distributed Systems',
                    color: 'var(--accent-purple)',
                  },
                ].map((pos) => (
                  <div
                    key={pos.company}
                    onClick={() => openFile(allKnownFiles['tab-experience'])}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.84rem', color: pos.color }}>
                      {pos.company}
                    </div>
                    <div style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {pos.role}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono' }}>
                      {pos.period}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                      {pos.highlight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==============================================
             SIDEBAR VIEW 4: PROJECTS EXPLORER
             ============================================== */}
          {activeActivity === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="file-tree-header">
                <div className="tree-header-left">
                  <span className="tree-title font-mono">PROJECTS (70K+ APP)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="tree-collapse-btn"
                >
                  <PanelLeftClose size={14} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  {
                    title: 'Live Streaming & Audio Rooms App',
                    metric: '70,000+ Downloads on Google Play',
                    tech: 'ZEGOCLOUD, Agora, BullMQ, Redis',
                  },
                  {
                    title: 'High-Throughput Microservices Engine',
                    metric: '<40ms Latency @ 10K Concurrency',
                    tech: 'Node.js Cluster, Socket.IO, Docker',
                  },
                  {
                    title: 'Real-Time Admin Monitoring Dashboard',
                    metric: 'Live Room Metrics & User Telemetry',
                    tech: 'Next.js 15, TypeScript, WebSockets',
                  },
                  {
                    title: 'Global E-Commerce API Platform',
                    metric: 'Payment Gateway & Inventory Sync',
                    tech: 'Express.js, MongoDB, Redis Cache',
                  },
                ].map((proj) => (
                  <div
                    key={proj.title}
                    onClick={() => openFile(allKnownFiles['tab-projects'])}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '8px',
                      padding: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                      {proj.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                      {proj.metric}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono' }}>
                      {proj.tech}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </aside>
      )}

      {/* 3. Main Workstation Body Area */}
      <div className="vscode-main-workstation">
        {/* Editor Top Bar with Tabs + Theme Switcher (Paper | Night | Citrus) */}
        <header className="vscode-editor-top-header">
          {/* Left: Open Editor Tabs */}
          <div className="editor-tabs-scroll-container">
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="editor-open-sidebar-btn"
                title="Open Sidebar (Ctrl+B)"
              >
                <PanelLeft size={16} />
              </button>
            )}

            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`editor-workspace-tab ${isActive ? 'active' : ''}`}
                >
                  {tab.icon}
                  <span className="font-mono tab-name">{tab.name}</span>
                  {tabs.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => closeTab(e, tab.id)}
                      className="tab-close-icon"
                      title="Close Tab"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: The 3 Themes Pill Switcher + Quick Actions */}
          <div className="editor-top-actions">
            {/* Quick Command Palette Trigger */}
            <button
              type="button"
              onClick={openPalette}
              className="editor-cmd-palette-btn font-mono"
              title="Search or Run (⌘K)"
            >
              <Search size={13} />
              <span>⌘K</span>
            </button>

            {/* Exact 3 Themes Pill Switcher: Paper | Night | Citrus */}
            <ThemeToggle />

            {/* Hire Button */}
            <a
              href="mailto:manoj2022019@gmail.com?subject=Job%20Inquiry%20for%20Manoj%20Kumar"
              className="editor-hire-cta font-mono"
            >
              Hire Manoj ➔
            </a>
          </div>
        </header>

        {/* Breadcrumb Path Bar */}
        <div className="vscode-editor-breadcrumbs">
          <span style={{ color: 'var(--text-dim)' }}>manoj.dev</span>
          <span>&gt;</span>
          <span style={{ color: 'var(--text-dim)' }}>
            {activeTab?.category === 'tool' ? 'src/tools' : 'src/portfolio'}
          </span>
          <span>&gt;</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{activeTab?.name}</span>

          {activeTab?.toolRoute && (
            <div style={{ marginLeft: 'auto' }}>
              <Link
                href={activeTab.toolRoute}
                className="fullscreen-studio-chip font-mono"
              >
                <span>Open Dedicated Full Page Studio</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          )}
        </div>

        {/* Active Editor Viewport Content */}
        <main className="vscode-main-viewport">
          
          {/* VIEW 1: Overview / ManojKumar.tsx */}
          {activeTab?.id === 'tab-overview' && (
            <div className="viewport-content-wrapper">
              <Hero />
              <ExperienceSection />
              <ToolsSection />
              <ProjectsSection />
              <ContactCTA />
              <Footer />
            </div>
          )}

          {/* VIEW 2: Experience / experience.json */}
          {activeTab?.id === 'tab-experience' && (
            <div className="viewport-content-wrapper">
              <ExperienceSection />
            </div>
          )}

          {/* VIEW 3: Projects / projects.ts */}
          {activeTab?.id === 'tab-projects' && (
            <div className="viewport-content-wrapper">
              <ProjectsSection />
            </div>
          )}

          {/* VIEW 4: Architecture Topology */}
          {activeTab?.id === 'tab-arch' && (
            <div className="viewport-content-wrapper">
              <SystemArchitecture />
            </div>
          )}

          {/* VIEW 5: LiveStreamEngine.ts Code Snippets */}
          {activeTab?.id === 'tab-engine-code' && (
            <div className="viewport-content-wrapper">
              <DevTabs />
            </div>
          )}

          {/* VIEW 6: Contact */}
          {activeTab?.id === 'tab-contact' && (
            <div className="viewport-content-wrapper">
              <ContactCTA />
            </div>
          )}

          {/* VIEW 7: image-converter.tool */}
          {activeTab?.id === 'tab-image' && (
            <div className="viewport-content-wrapper">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    🖼️ Image &amp; Entire Folder Batch Converter
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 4 }}>
                    Convert WebP, AVIF, PNG, JPEG with dual preview, split slider, and ZIP download preserving folder tree.
                  </p>
                </div>
                <Link
                  href="/tools/image-converter"
                  className="btn-editorial-primary"
                  style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                >
                  Open Dedicated Fullscreen Studio ➔
                </Link>
              </div>
              <ImageConverterTool />
            </div>
          )}

          {/* VIEW 8: api-tester.tool */}
          {activeTab?.id === 'tab-api' && (
            <div className="viewport-content-wrapper">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    📡 REST API Tester &amp; Inspector
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 4 }}>
                    Send real HTTP requests from your browser, calculate round-trip latency, inspect headers, and format payloads.
                  </p>
                </div>
                <Link
                  href="/tools/api-tester"
                  className="btn-editorial-primary"
                  style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                >
                  Open Fullscreen API Studio ➔
                </Link>
              </div>
              <ApiTesterTool />
            </div>
          )}

          {/* VIEW 9: json-formatter.tool */}
          {activeTab?.id === 'tab-json' && (
            <div className="viewport-content-wrapper">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    🧩 JSON Formatter &amp; AST Validator
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 4 }}>
                    Prettify, minify, sort keys, validate syntax errors with line/column pointers, and copy clean JSON.
                  </p>
                </div>
                <Link
                  href="/tools/json-formatter"
                  className="btn-editorial-primary"
                  style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                >
                  Open Fullscreen JSON Studio ➔
                </Link>
              </div>
              <JsonFormatterTool />
            </div>
          )}

          {/* VIEW 10: api-performance.tool */}
          {activeTab?.id === 'tab-perf' && (
            <div className="viewport-content-wrapper">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    ⚡ API Latency &amp; Concurrency Benchmark
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 4 }}>
                    Simulate high-concurrency requests and calculate P50, P90, P95, P99 latency percentiles and TTFB.
                  </p>
                </div>
                <Link
                  href="/tools/api-performance"
                  className="btn-editorial-primary"
                  style={{ padding: '10px 20px', fontSize: '0.88rem' }}
                >
                  Open Fullscreen Benchmark ➔
                </Link>
              </div>
              <ApiPerformanceTool />
            </div>
          )}

          {/* VIEW 11: base64-hash.tool */}
          {activeTab?.id === 'tab-base64' && (
            <div className="viewport-content-wrapper">
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  🔒 Base64 Encoder &amp; Decoder
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 4 }}>
                  Client-side UTF-8 Base64 conversion and payload analysis.
                </p>
              </div>
              <Base64Tool />
            </div>
          )}

          {/* VIEW 12: regex-tester.tool */}
          {activeTab?.id === 'tab-regex' && (
            <div className="viewport-content-wrapper">
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  🔍 Regular Expression Live Matcher
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 4 }}>
                  Real-time regex compilation, flags g/i/m/s, captured matches breakdown, and syntax validation.
                </p>
              </div>
              <RegexTool />
            </div>
          )}

          {/* VIEW 13: terminal.sh */}
          {activeTab?.id === 'tab-terminal' && (
            <div className="viewport-content-wrapper">
              <DevTerminal />
            </div>
          )}

          {/* VIEW 14: package.json */}
          {activeTab?.id === 'tab-package' && (
            <div className="viewport-content-wrapper">
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  📦 package.json &bull; Developer Suite Manifest
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: 4 }}>
                  Real-world production dependencies, streaming RTC SDKs, and distributed messaging queues.
                </p>
              </div>

              <div style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                borderRadius: '12px',
                padding: '24px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.86rem',
                lineHeight: 1.7,
                overflowX: 'auto',
                color: 'var(--text-primary)',
              }}>
                <pre style={{ margin: 0 }}>
{`{
  "name": "manoj-developer-suite",
  "version": "2.4.0",
  "author": "Manoj Kumar <manoj2022019@gmail.com>",
  "role": "Software Developer & Real-Time RTC Specialist",
  "location": "Noida, NCR, India",
  "phone": "+91 9667328778",
  "flagshipProject": {
    "name": "Live Streaming & Audio Rooms App",
    "downloads": "70,000+ Google Play Downloads",
    "architecture": "Distributed Node.js + Redis Cluster + BullMQ"
  },
  "dependencies": {
    "@zegocloud/zego-uikit-prebuilt": "^2.11.0",
    "agora-rtc-sdk-ng": "^4.22.0",
    "bullmq": "^5.14.0",
    "ioredis": "^5.4.1",
    "socket.io": "^4.7.5",
    "next": "^15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "jszip": "^3.10.1",
    "lucide-react": "^0.475.0",
    "typescript": "^5.4.0"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "benchmark:rtc": "node scripts/benchmark-streaming.js"
  }
}`}
                </pre>
              </div>
            </div>
          )}

          {/* VIEW 15: README.md */}
          {activeTab?.id === 'tab-readme' && (
            <div className="viewport-content-wrapper">
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-glass)',
                borderRadius: '16px',
                padding: '32px',
                color: 'var(--text-primary)',
                lineHeight: 1.7,
              }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 12, borderBottom: '1px solid var(--border-glass)', paddingBottom: 12 }}>
                  👨‍💻 Manoj Kumar &bull; Software Developer Studio
                </h1>
                
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '16px 0 24px' }}>
                  <span style={{ background: 'var(--bg-input)', border: '1px solid var(--border-accent)', padding: '4px 10px', borderRadius: 6, fontSize: '0.78rem', fontFamily: 'JetBrains Mono', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    Downloads: 70K+ Active Users
                  </span>
                  <span style={{ background: 'var(--bg-input)', border: '1px solid var(--border-glass)', padding: '4px 10px', borderRadius: 6, fontSize: '0.78rem', fontFamily: 'JetBrains Mono', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    RTC: ZEGOCLOUD &bull; Agora &bull; Socket.IO
                  </span>
                  <span style={{ background: 'var(--bg-input)', border: '1px solid var(--border-glass)', padding: '4px 10px', borderRadius: 6, fontSize: '0.78rem', fontFamily: 'JetBrains Mono', fontWeight: 700, color: 'var(--accent-purple)' }}>
                    Backend: BullMQ &bull; Redis &bull; Node.js
                  </span>
                  <span style={{ background: 'var(--bg-input)', border: '1px solid var(--border-glass)', padding: '4px 10px', borderRadius: 6, fontSize: '0.78rem', fontFamily: 'JetBrains Mono', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    Location: Noida, India
                  </span>
                </div>

                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: 24, marginBottom: 8, color: 'var(--accent-emerald)' }}>
                  🚀 Summary &amp; Engineering Focus
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem' }}>
                  Software Developer based in Noida with proven expertise in building high-concurrency real-time systems, live streaming engines, audio chatrooms, and scalable microservices. Contributed directly to apps achieving over <strong>70,000+ Google Play downloads</strong>.
                </p>

                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: 24, marginBottom: 8, color: 'var(--accent-cyan)' }}>
                  🛠️ In-Browser Developer Productivity Suite (6 Tools)
                </h2>
                <ul style={{ paddingLeft: 20, color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                  <li><strong>Image &amp; Folder Batch Converter:</strong> WebP/AVIF/PNG/JPEG with folder tree preservation and instant ZIP archive download.</li>
                  <li><strong>REST API Tester:</strong> Full in-browser HTTP client with millisecond latency telemetry, request headers &amp; JSON formatter.</li>
                  <li><strong>JSON Formatter &amp; AST Validator:</strong> Syntax error detection, indentation formatting, key sorting, and dot-notation search.</li>
                  <li><strong>API Latency Benchmark:</strong> High-concurrency load tester calculating P50, P90, P95, and P99 latency percentiles.</li>
                  <li><strong>Base64 UTF-8 Utility:</strong> Client-side bi-directional encoding/decoding.</li>
                  <li><strong>Regex Live Tester:</strong> Real-time regex match counter, flag toggles, and captured group analysis.</li>
                </ul>

                <div style={{ marginTop: 28, paddingTop: 18, borderTop: '1px solid var(--border-glass)', display: 'flex', gap: 12, alignItems: 'center' }}>
                  <a href="mailto:manoj2022019@gmail.com" className="btn-editorial-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                    Contact Manoj Kumar ➔
                  </a>
                  <a href="https://github.com/manojmksmanu" target="_blank" rel="noreferrer" className="btn-editorial-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                    GitHub @manojmksmanu ↗
                  </a>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 4. Authentic VS Code Bottom Status Bar */}
      <footer className="vscode-global-status-bar" aria-label="Status Bar">
        <div className="status-bar-left">
          <a
            href="https://github.com/manojmksmanu"
            target="_blank"
            rel="noreferrer"
            className="status-bar-item"
            title="Current Git Branch"
          >
            <GitBranch size={12} />
            <span>main*</span>
          </a>

          <span className="status-bar-item" title="No errors or warnings in project">
            <span>⊗ 0</span>
            <span>⚠ 0</span>
          </span>

          <span className="status-bar-item font-mono" style={{ opacity: 0.9 }}>
            TypeScript 5.4
          </span>

          <span className="status-bar-item font-mono" style={{ opacity: 0.9 }}>
            Next.js 15.5
          </span>
        </div>

        <div className="status-bar-right">
          <span className="status-bar-item">
            Ln 1, Col 1
          </span>

          <span className="status-bar-item">
            Spaces: 2
          </span>

          <span className="status-bar-item">
            UTF-8
          </span>

          <span className="status-bar-item" style={{ fontWeight: 700 }}>
            Manoj Kumar &bull; Software Developer (Noida)
          </span>
        </div>
      </footer>
    </div>
  );
}
