'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Wrench, Github, Linkedin, Mail } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Work', href: '/#projects' },
    { label: 'Tools', href: '/tools' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Stack', href: '/about#skills' },
    { label: 'Contact', href: '/contact' },
  ];

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <header className="editorial-navbar-header" style={{ marginBottom: '24px' }}>
      {/* Editorial Navigation Bar */}
      <nav className="editorial-navbar">
        {/* Brand Logo - Bold Grotesque like aarav.dev in screenshot */}
        <Link href="/" className="editorial-brand">
          <span className="brand-dot-dev">manoj.dev</span>
          <span className="brand-pill-role">Software Developer</span>
        </Link>

        {/* Center Nav Links */}
        <ul className="editorial-nav-links">
          {navItems.map((item) => {
            const isToolActive = item.href === '/tools' && pathname.startsWith('/tools');
            const isContactActive = item.href === '/contact' && pathname === '/contact';
            const isActive = isToolActive || isContactActive;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`editorial-nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Corner: The 3 Themes Pill Switcher + Quick Actions */}
        <div className="editorial-nav-actions">
          {/* Quick Command Palette Button */}
          <button
            type="button"
            onClick={openPalette}
            className="editorial-search-btn"
            title="Search or Run Command (⌘K)"
          >
            <Search size={14} />
            <kbd className="cmd-pill-tag">⌘K</kbd>
          </button>

          {/* 3 Themes Pill Switcher: Paper | Night | Citrus */}
          <ThemeToggle />

          {/* Hire Me CTA Button */}
          <a
            href="mailto:manoj2022019@gmail.com?subject=Job%20Inquiry%20for%20Manoj%20Kumar"
            className="editorial-hire-btn"
          >
            Hire Manoj
          </a>
        </div>
      </nav>
    </header>
  );
}
