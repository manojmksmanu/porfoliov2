'use client';

import React, { useState, useMemo } from 'react';
import { Search, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

export default function RegexTool() {
  const [pattern, setPattern] = useState('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(
    'Reach out to Manoj Kumar at manoj2022019@gmail.com or support@insanger.com for real-time streaming architectures.'
  );

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: null };
    try {
      const regex = new RegExp(pattern, flags);
      const results: { match: string; index: number }[] = [];
      let m: RegExpExecArray | null;

      if (flags.includes('g')) {
        while ((m = regex.exec(testString)) !== null) {
          results.push({ match: m[0], index: m.index });
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        m = regex.exec(testString);
        if (m) results.push({ match: m[0], index: m.index });
      }
      return { matches: results, error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid Regular Expression';
      return { matches: [], error: message };
    }
  }, [pattern, flags, testString]);

  const toggleFlag = (flagChar: string) => {
    if (flags.includes(flagChar)) {
      setFlags(flags.replace(flagChar, ''));
    } else {
      setFlags(flags + flagChar);
    }
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-glass-bright)',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      boxShadow: 'var(--shadow-card)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search size={20} style={{ color: 'var(--accent-cyan)' }} />
            <span>Regex Tester &amp; Live Matcher</span>
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>
            Real-time regex compilation, flag selectors, and match highlighting.
          </p>
        </div>

        {/* Flag toggles */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', marginRight: 4 }}>Flags:</span>
          {['g', 'i', 'm', 's'].map((f) => {
            const active = flags.includes(f);
            return (
              <button
                key={f}
                type="button"
                onClick={() => toggleFlag(f)}
                style={{
                  background: active ? 'var(--pill-active-bg)' : 'var(--bg-input)',
                  color: active ? 'var(--pill-active-text)' : 'var(--text-secondary)',
                  border: '1px solid ' + (active ? 'var(--border-accent)' : 'var(--border-glass)'),
                  borderRadius: '6px',
                  padding: '4px 10px',
                  fontSize: '0.74rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pattern Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          Regular Expression Pattern
        </label>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-input)',
          border: error ? '1px solid #ef4444' : '1px solid var(--border-glass)',
          borderRadius: '8px',
          padding: '0 12px',
        }}>
          <span style={{ color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Type regex pattern..."
            style={{
              flexGrow: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              padding: '10px 8px',
              color: 'var(--text-primary)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.85rem',
            }}
          />
          <span style={{ color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>/{flags}</span>
        </div>
        {error && (
          <div style={{ fontSize: '0.74rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: 4 }}>
            <AlertCircle size={12} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Test String */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Test String
          </label>
          <span style={{ fontSize: '0.74rem', fontFamily: 'JetBrains Mono', color: 'var(--accent-emerald)', fontWeight: 700 }}>
            {matches.length} {matches.length === 1 ? 'match' : 'matches'} found
          </span>
        </div>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Paste or type text to test regex matches..."
          style={{
            width: '100%',
            height: '110px',
            padding: '12px',
            borderRadius: '8px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-primary)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.82rem',
            resize: 'vertical',
            outline: 'none',
          }}
        />
      </div>

      {/* Match Results Strip */}
      {matches.length > 0 && (
        <div style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-glass)',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>
            Captured Matches:
          </span>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {matches.map((m, i) => (
              <span
                key={i}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--accent-emerald)',
                  borderRadius: '4px',
                  padding: '3px 8px',
                  fontSize: '0.75rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  color: 'var(--accent-emerald)',
                  fontWeight: 700,
                }}
              >
                #{i + 1}: &quot;{m.match}&quot; <span style={{ color: 'var(--text-dim)', fontWeight: 400 }}>@ idx {m.index}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
