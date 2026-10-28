'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Sparkles, Check, ChevronRight } from 'lucide-react';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function DevTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'whoami',
      output: (
        <div>
          <span style={{ color: '#34d399', fontWeight: 700 }}>Manoj Kumar</span> — Software Developer &amp; Real-Time Systems Specialist.
          <br />
          <span style={{ color: 'var(--text-secondary)' }}>
            Noida, India • Experienced in live-streaming, WebSockets, ZEGOCLOUD/Agora SDKs, and HR enterprise platforms.
            Contributed to apps with <strong style={{ color: '#fbbf24' }}>70,000+ Google Play downloads</strong>!
          </span>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let res: string | React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        res = (
          <div>
            Available commands:
            <br />
            &bull; <strong style={{ color: '#34d399' }}>whoami</strong> — Summary of Manoj Kumar
            <br />
            &bull; <strong style={{ color: '#34d399' }}>skills</strong> — Core tech stack &amp; SDK integrations
            <br />
            &bull; <strong style={{ color: '#34d399' }}>experience</strong> — Insanger, Megaminds, Manma
            <br />
            &bull; <strong style={{ color: '#34d399' }}>projects</strong> — Live streaming, HR payroll, &amp; chat apps
            <br />
            &bull; <strong style={{ color: '#34d399' }}>contact</strong> — Direct email &amp; phone details
            <br />
            &bull; <strong style={{ color: '#34d399' }}>clear</strong> — Clear terminal screen
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div>
            <strong style={{ color: '#34d399' }}>Manoj Kumar</strong> — Software Engineer
            <br />
            Location: Noida, India
            <br />
            Specialization: Node.js, TypeScript, Socket.IO, Real-Time Audio/Video (ZEGOCLOUD/Agora), Redis &amp; BullMQ.
            <br />
            Highlight: Scaled 4+ live-streaming &amp; entertainment apps, including 70,000+ Google Play downloads!
          </div>
        );
        break;

      case 'skills':
        res = (
          <div>
            <div style={{ color: '#38bdf8', fontWeight: 700 }}>-- Languages &amp; Core --</div>
            JavaScript (ESNext), TypeScript, SQL, HTML5, CSS3
            <div style={{ color: '#34d399', fontWeight: 700, marginTop: 4 }}>-- Backend &amp; Real-Time --</div>
            Node.js, Express.js, Socket.IO, REST APIs, BullMQ, Redis, ZEGOCLOUD SDK, Agora SDK
            <div style={{ color: '#a855f7', fontWeight: 700, marginTop: 4 }}>-- Frontend &amp; Mobile --</div>
            React.js, Next.js 15, React Native, Expo, Tailwind CSS, Material UI, Flutter (basic)
            <div style={{ color: '#fbbf24', fontWeight: 700, marginTop: 4 }}>-- Database &amp; Cloud --</div>
            MongoDB, PostgreSQL, Prisma ORM, Cloudflare R2, Cloudinary, Firebase, Docker
          </div>
        );
        break;

      case 'experience':
        res = (
          <div>
            1. <strong style={{ color: '#34d399' }}>Insanger Private Limited</strong> (Apr 2025 - Present)
            <br />
            &nbsp;&nbsp;&bull; 4+ live-streaming apps, co-host workflows, SVGA virtual gifting, coin wallet transactions.
            <br />
            &nbsp;&nbsp;&bull; Real-time Socket.IO presence, BullMQ delayed billing, Cloudflare R2 media pipelines.
            <br />
            2. <strong style={{ color: '#38bdf8' }}>Megaminds</strong> (Aug 2024 - Feb 2025)
            <br />
            &nbsp;&nbsp;&bull; React Native, Expo, Next.js, messaging pipelines, push notifications.
            <br />
            3. <strong style={{ color: '#a855f7' }}>Manma</strong> (Nov 2023 - May 2024)
            <br />
            &nbsp;&nbsp;&bull; Responsive web architecture &amp; UI performance optimization.
          </div>
        );
        break;

      case 'projects':
        res = (
          <div>
            &bull; <strong style={{ color: '#34d399' }}>LiveStream Social Entertainment Suite:</strong> 70K+ downloads on Play Store.
            <br />
            &bull; <strong style={{ color: '#38bdf8' }}>Enterprise HR &amp; Payroll Platform:</strong> Employee records, biometric attendance, salary slips.
            <br />
            &bull; <strong style={{ color: '#a855f7' }}>Megaminds Real-Time Chat Hub:</strong> Cross-platform messaging &amp; push sync.
            <br />
            &bull; <strong style={{ color: '#fbbf24' }}>Real-Time Co-Host Engine:</strong> Sub-120ms audio/video presence microservice.
          </div>
        );
        break;

      case 'contact':
        res = (
          <div>
            Email: <a href="mailto:manoj2022019@gmail.com" style={{ color: 'var(--accent-emerald)' }}>manoj2022019@gmail.com</a>
            <br />
            Phone: <span style={{ color: 'var(--text-primary)' }}>+91 9667328778</span>
            <br />
            GitHub: <a href="https://github.com/manojmksmanu" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>github.com/manojmksmanu</a>
            <br />
            LinkedIn: <a href="https://linkedin.com/in/manoj-kumar-05b2b91aa" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>linkedin.com/in/manoj-kumar-05b2b91aa</a>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        res = `Command not recognized: "${trimmed}". Type "help" to see available commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: res }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
    setInput('');
  };

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-accent)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        fontFamily: 'JetBrains Mono, monospace',
      }}
    >
      {/* Terminal Title Bar */}
      <div
        style={{
          background: 'var(--bg-card-hover)',
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-glass)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#f43f5e', display: 'inline-block' }}></span>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#fbbf24', display: 'inline-block' }}></span>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.78rem', marginLeft: 8 }}>
            manoj@insanger-workstation: ~ (zsh)
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.74rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>
          <span className="pulse-dot" style={{ width: 6, height: 6 }}></span>
          SOCKET.IO READY
        </div>
      </div>

      {/* Quick Interactive Command Chips */}
      <div style={{ background: 'var(--bg-input)', padding: '8px 16px', display: 'flex', gap: 6, flexWrap: 'wrap', borderBottom: '1px solid var(--border-glass)' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', alignSelf: 'center', marginRight: 4 }}>Quick Run:</span>
        {['whoami', 'skills', 'experience', 'projects', 'contact', 'help', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-glass)',
              color: 'var(--accent-emerald)',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.74rem',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 700,
            }}
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* Output Console */}
      <div
        style={{
          padding: '16px',
          maxHeight: '260px',
          overflowY: 'auto',
          fontSize: '0.82rem',
          lineHeight: 1.6,
          color: 'var(--text-primary)',
          background: 'var(--bg-card)',
        }}
      >
        <div style={{ color: 'var(--text-dim)', marginBottom: 8 }}>
          Welcome to Manoj Kumar&apos;s Interactive Dev Console. Type <strong style={{ color: 'var(--accent-emerald)' }}>help</strong> to inspect systems.
        </div>

        {history.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-emerald)', fontWeight: 700 }}>
              <ChevronRight size={14} /> manoj@dev:~$ {item.command}
            </div>
            <div style={{ paddingLeft: 18, marginTop: 4, color: 'var(--text-primary)' }}>
              {item.output}
            </div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Command Input Prompt */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px',
          background: 'var(--bg-card-hover)',
          borderTop: '1px solid var(--border-glass)',
        }}
      >
        <span style={{ color: 'var(--accent-emerald)', fontWeight: 800, fontSize: '0.9rem' }}>$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'skills', 'experience', 'projects', or 'help'..."
          style={{
            flexGrow: 1,
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'inherit',
            fontSize: '0.82rem',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-emerald)',
            cursor: 'pointer',
            padding: 4,
          }}
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
