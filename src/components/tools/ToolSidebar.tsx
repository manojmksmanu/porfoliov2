'use client';

import React from 'react';
import ApiTesterTool from './ApiTesterTool';
import JsonFormatterTool from './JsonFormatterTool';
import ImageConverterTool from './ImageConverterTool';
import ApiPerformanceTool from './ApiPerformanceTool';
import { Wrench } from 'lucide-react';

export default function ToolSidebar() {
  return (
    <aside className="tools-dock-column" id="tools-dock">
      <div className="tools-dock-sticky">
        
        {/* Header Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="pulse-dot"></span>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-emerald)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Interactive Developer Tools Dock
            </span>
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 4 }}>
            Live &amp; Client-Side
          </span>
        </div>

        {/* 1. API Tester */}
        <ApiTesterTool />

        {/* 2. JSON Formatter */}
        <JsonFormatterTool />

        {/* 3. Image Converter */}
        <ImageConverterTool />

        {/* 4. API Performance */}
        <ApiPerformanceTool />

        {/* Extensibility Banner */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px dashed var(--border-accent)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            textAlign: 'center',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ fontWeight: 700, color: '#34d399', marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Wrench size={14} /> Easy Add-On Architecture
          </div>
          <div>New tools can be added anytime in <code>src/components/tools/</code> and registered in <code>src/data/tools.ts</code>!</div>
        </div>

      </div>
    </aside>
  );
}
