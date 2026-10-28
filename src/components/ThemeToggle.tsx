'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sparkles, Sun } from 'lucide-react';

export type ThemeType = 'obsidian' | 'nebula' | 'titanium';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>('obsidian');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('manoj_theme');
    let initial: ThemeType = 'obsidian';
    if (raw === 'nebula') initial = 'nebula';
    else if (raw === 'titanium' || raw === 'paper') initial = 'titanium';
    else initial = 'obsidian'; // default to obsidian for 'citrus', 'night', or undefined

    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    setMounted(true);
  }, []);

  const switchTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem('manoj_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: newTheme }));
  };

  if (!mounted) {
    return (
      <div className="theme-toggle-container">
        <div className="theme-pill-track">
          <span className="theme-pill-btn active">
            <Moon size={12} /> Obsidian
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-toggle-container" title="Select Visual Theme">
      <div className="theme-pill-track">
        <button
          type="button"
          onClick={() => switchTheme('obsidian')}
          className={`theme-pill-btn ${theme === 'obsidian' ? 'active' : ''}`}
          aria-label="Switch to Cyber Obsidian Theme"
        >
          <Moon size={12} /> Obsidian
        </button>

        <button
          type="button"
          onClick={() => switchTheme('nebula')}
          className={`theme-pill-btn ${theme === 'nebula' ? 'active' : ''}`}
          aria-label="Switch to Cosmic Nebula Theme"
        >
          <Sparkles size={12} /> Nebula
        </button>

        <button
          type="button"
          onClick={() => switchTheme('titanium')}
          className={`theme-pill-btn ${theme === 'titanium' ? 'active' : ''}`}
          aria-label="Switch to Quantum Titanium Theme"
        >
          <Sun size={12} /> Light
        </button>
      </div>
    </div>
  );
}
