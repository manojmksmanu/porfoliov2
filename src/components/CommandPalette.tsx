'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Terminal, Wrench, Layers, FolderDown, Zap, 
  Send, Braces, Image as ImageIcon, Mail, Phone, Github, 
  Linkedin, FileText, ArrowRight, CornerDownLeft, X, Sparkles, Monitor
} from 'lucide-react';

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Tools' | 'Navigation' | 'Actions' | 'Projects' | 'Developer';
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Listen for Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Also listen for custom event to open palette from anywhere
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-command-palette', handleOpen);
    return () => window.removeEventListener('open-command-palette', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const items: PaletteItem[] = [
    // Tools
    {
      id: 'tool-image',
      title: 'Image & Folder Batch Converter',
      subtitle: 'Convert WebP/AVIF, compress whole folders, split slider, ZIP download',
      category: 'Tools',
      icon: <ImageIcon size={18} className="text-emerald" />,
      badge: 'Full Studio',
      action: () => router.push('/tools/image-converter'),
    },
    {
      id: 'tool-api',
      title: 'REST API Tester & Inspector',
      subtitle: 'Execute real HTTP requests, headers, payload & latency analysis',
      category: 'Tools',
      icon: <Send size={18} className="text-cyan" />,
      badge: 'Live Fetch',
      action: () => router.push('/tools/api-tester'),
    },
    {
      id: 'tool-json',
      title: 'JSON Formatter & Schema Validator',
      subtitle: 'Prettify, minify, sort keys, AST validate & path queries',
      category: 'Tools',
      icon: <Braces size={18} className="text-purple" />,
      badge: 'AST Engine',
      action: () => router.push('/tools/json-formatter'),
    },
    {
      id: 'tool-perf',
      title: 'API Latency & Concurrency Benchmark',
      subtitle: 'Measure concurrent throughput, TTFB, P50/P95/P99 percentiles',
      category: 'Tools',
      icon: <Zap size={18} className="text-amber" />,
      badge: 'Multi-thread',
      action: () => router.push('/tools/api-performance'),
    },
    {
      id: 'tool-hub',
      title: 'Developer Tools Hub',
      subtitle: 'Open the central command center for all developer utilities',
      category: 'Tools',
      icon: <Wrench size={18} />,
      action: () => router.push('/tools'),
    },

    // Projects
    {
      id: 'proj-live',
      title: 'LiveStream Social Suite (70K+ Downloads)',
      subtitle: 'ZEGOCLOUD / Agora RTC, Socket.IO, SVGA gifts, BullMQ billing',
      category: 'Projects',
      icon: <Sparkles size={18} className="text-emerald" />,
      badge: '70K+ Play Store',
      action: () => router.push('/projects'),
    },
    {
      id: 'proj-hr',
      title: 'HR & Automated Payroll Suite',
      subtitle: 'Attendance automation, salary slips, leave pipelines & audit logs',
      category: 'Projects',
      icon: <Layers size={18} />,
      action: () => router.push('/projects'),
    },
    {
      id: 'proj-chat',
      title: 'Megaminds Real-Time Chat Engine',
      subtitle: 'High-concurrency chat, offline message queue, Expo notifications',
      category: 'Projects',
      icon: <Send size={18} />,
      action: () => router.push('/projects'),
    },

    // Navigation
    {
      id: 'nav-home',
      title: 'Go to Home / Overview',
      subtitle: 'Manoj Kumar developer command station',
      category: 'Navigation',
      icon: <Monitor size={18} />,
      action: () => router.push('/'),
    },
    {
      id: 'nav-about',
      title: 'Read About & Full Resume',
      subtitle: 'Work history at Insanger, Megaminds, Manma & BCA Degree',
      category: 'Navigation',
      icon: <FileText size={18} />,
      action: () => router.push('/about'),
    },
    {
      id: 'nav-projects',
      title: 'Explore All Projects Gallery',
      subtitle: 'Live-streaming, RTC apps, distributed microservices, dashboards',
      category: 'Navigation',
      icon: <Layers size={18} />,
      action: () => router.push('/projects'),
    },
    {
      id: 'nav-contact',
      title: 'Contact & Hire Manoj',
      subtitle: 'Direct inquiry, email, phone, location & scheduling',
      category: 'Navigation',
      icon: <Mail size={18} />,
      action: () => router.push('/contact'),
    },

    // Actions
    {
      id: 'act-email',
      title: 'Email Manoj Kumar',
      subtitle: 'manoj2022019@gmail.com',
      category: 'Actions',
      icon: <Mail size={18} className="text-emerald" />,
      action: () => {
        window.location.href = 'mailto:manoj2022019@gmail.com?subject=Job%20Inquiry%20for%20Manoj%20Kumar';
      },
    },
    {
      id: 'act-phone',
      title: 'Call Manoj Kumar',
      subtitle: '+91 9667328778 (Noida, India)',
      category: 'Actions',
      icon: <Phone size={18} className="text-cyan" />,
      action: () => {
        window.location.href = 'tel:+919667328778';
      },
    },
    {
      id: 'act-github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/manojmksmanu',
      category: 'Developer',
      icon: <Github size={18} />,
      action: () => window.open('https://github.com/manojmksmanu', '_blank'),
    },
    {
      id: 'act-linkedin',
      title: 'Open LinkedIn Profile',
      subtitle: 'linkedin.com/in/manoj-kumar-05b2b91aa',
      category: 'Developer',
      icon: <Linkedin size={18} />,
      action: () => window.open('https://linkedin.com/in/manoj-kumar-05b2b91aa', '_blank'),
    },
  ];

  const filtered = items.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (item: PaletteItem) => {
    item.action();
    setIsOpen(false);
  };

  const handleKeyDownInList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        handleSelect(filtered[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="cmd-palette-backdrop"
      onClick={() => setIsOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 8, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        animation: 'fadeIn 0.15s ease-out',
      }}
    >
      <div 
        className="cmd-palette-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'var(--bg-card-solid)',
          border: '1px solid var(--border-accent)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-glass)',
          background: 'var(--bg-card)',
        }}>
          <Search size={20} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDownInList}
            placeholder="Type a command, tool, or project name... (e.g. image, api, resume, call)"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            style={{
              background: 'var(--bg-card-hover)',
              border: '1px solid var(--border-glass)',
              borderRadius: '6px',
              color: 'var(--text-dim)',
              padding: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div 
          style={{
            maxHeight: '420px',
            overflowY: 'auto',
            padding: '10px 12px',
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--text-dim)' }}>
              No commands matching &quot;{query}&quot;. Try typing &apos;image&apos;, &apos;api&apos;, &apos;projects&apos;, or &apos;contact&apos;.
            </div>
          ) : (
            filtered.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--bg-card-hover)' : 'transparent',
                    border: isSelected ? '1px solid var(--border-accent)' : '1px solid transparent',
                    transition: 'all 0.12s ease',
                    marginBottom: '4px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: isSelected ? 'var(--bg-card)' : 'var(--bg-card-hover)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                      flexShrink: 0,
                      border: '1px solid var(--border-glass)',
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ 
                          fontSize: '0.94rem', 
                          fontWeight: 700, 
                          color: 'var(--text-primary)',
                        }}>
                          {item.title}
                        </span>
                        {item.badge && (
                          <span style={{
                            fontSize: '0.68rem',
                            padding: '2px 7px',
                            borderRadius: '999px',
                            background: 'var(--bg-card-hover)',
                            border: '1px solid var(--border-glass)',
                            color: 'var(--accent-emerald)',
                            fontWeight: 700,
                            fontFamily: 'JetBrains Mono, monospace',
                          }}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div style={{ 
                        fontSize: '0.78rem', 
                        color: 'var(--text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: '2px',
                      }}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '12px' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontFamily: 'JetBrains Mono, monospace',
                      color: 'var(--text-dim)',
                      textTransform: 'uppercase',
                    }}>
                      {item.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft size={14} style={{ color: 'var(--accent-emerald)' }} />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          borderTop: '1px solid var(--border-glass)',
          background: 'var(--bg-card)',
          fontSize: '0.75rem',
          color: 'var(--text-dim)',
          fontFamily: 'JetBrains Mono, monospace',
        }}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <span><kbd style={{ background: 'var(--bg-card-hover)', color: 'var(--text-primary)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-glass)' }}>↑</kbd> <kbd style={{ background: 'var(--bg-card-hover)', color: 'var(--text-primary)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-glass)' }}>↓</kbd> Navigate</span>
            <span><kbd style={{ background: 'var(--bg-card-hover)', color: 'var(--text-primary)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-glass)' }}>↵</kbd> Select</span>
            <span><kbd style={{ background: 'var(--bg-card-hover)', color: 'var(--text-primary)', padding: '2px 5px', borderRadius: '4px', border: '1px solid var(--border-glass)' }}>esc</kbd> Close</span>
          </div>
          <div style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
            MK // Command Center
          </div>
        </div>
      </div>
    </div>
  );
}
