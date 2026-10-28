'use client';

import React, { useState } from 'react';
import { Radio, Server, Database, Cpu, ShieldCheck, Zap, Layers, Activity, Sparkles } from 'lucide-react';

interface ArchNode {
  id: string;
  name: string;
  role: string;
  latency: string;
  tech: string;
  description: string;
  icon: React.ReactNode;
}

export default function SystemArchitecture() {
  const [selectedNode, setSelectedNode] = useState<string>('node-webrtc');

  const nodes: ArchNode[] = [
    {
      id: 'node-client',
      name: 'Client Applications',
      role: 'Cross-platform Mobile & Web',
      latency: '< 16ms render',
      tech: 'React Native, Expo, Redux Toolkit, WebRTC Client',
      description: 'Engineered responsive live-streaming client with custom SVGA animation player, gift sending trays, and co-host camera switching.',
      icon: <Layers size={18} className="text-cyan" />,
    },
    {
      id: 'node-gateway',
      name: 'API Gateway & Nginx',
      role: 'Reverse Proxy & TLS Termination',
      latency: '~2ms proxy',
      tech: 'Nginx, Docker, Cloudflare CDN, Rate Limiting',
      description: 'Handles incoming WebSocket upgrades, SSL offloading, and distributes traffic evenly across Node.js cluster worker processes.',
      icon: <Server size={18} className="text-emerald" />,
    },
    {
      id: 'node-socket',
      name: 'Socket.IO Presence Cluster',
      role: 'Real-time Chat & State Engine',
      latency: '< 25ms round-trip',
      tech: 'Node.js, Socket.IO, Redis Adapter',
      description: 'Maintains live user presence, room broadcast channels, multi-seat mic allocation, and instantaneous chat messages for 1,000+ concurrent listeners per room.',
      icon: <Activity size={18} className="text-purple" />,
    },
    {
      id: 'node-webrtc',
      name: 'RTC Media Engine',
      role: 'Ultra-low Latency Audio/Video',
      latency: '< 180ms global RTC',
      tech: 'ZEGOCLOUD SDK, Agora RTC, Token Auth',
      description: 'Engineered dynamic room token generation, 9-seat co-host audio mixing, fallback stream reconnection, and multi-host PK battle streaming.',
      icon: <Radio size={18} className="text-emerald" />,
    },
    {
      id: 'node-bullmq',
      name: 'Distributed Queue & Workers',
      role: 'Asynchronous Billing & Gifts',
      latency: 'Background 100/s',
      tech: 'BullMQ, Redis Cluster, Transaction Locks',
      description: 'Prevents database lockups during heavy virtual gift rushes. Jobs queue coin deductions, creator revenue sharing, and push notification dispatches.',
      icon: <Cpu size={18} className="text-amber" />,
    },
    {
      id: 'node-storage',
      name: 'Data & Media Persistence',
      role: 'High-availability Storage',
      latency: 'Sub-5ms query',
      tech: 'MongoDB, PostgreSQL, Cloudflare R2, Redis',
      description: 'Stores user accounts, coin transactions, agency commission reports, and stream recorded replays on Cloudflare R2 object storage.',
      icon: <Database size={18} className="text-cyan" />,
    },
  ];

  const active = nodes.find((n) => n.id === selectedNode) || nodes[3];

  return (
    <div className="arch-visualizer-container" style={{
      background: 'rgba(10, 15, 28, 0.7)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.6)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Corner Brackets for Tech HUD feeling */}
      <div style={{ position: 'absolute', top: 8, left: 8, color: 'var(--accent-emerald)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono' }}>┌ SYS.ARCH</div>
      <div style={{ position: 'absolute', top: 8, right: 8, color: 'var(--accent-emerald)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono' }}>TOPOLOGY ┐</div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pulse-dot"></span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase' }}>
              Interactive Live System Architecture
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            Real-Time Streaming &amp; Distributed Queue Topology
          </h3>
        </div>

        <div style={{
          fontSize: '0.72rem',
          fontFamily: 'JetBrains Mono',
          background: 'var(--bg-card-hover)',
          border: '1px solid var(--border-glass-bright)',
          color: 'var(--accent-emerald)',
          padding: '4px 10px',
          borderRadius: '999px',
          fontWeight: 700,
        }}>
          PROD VERIFIED &bull; 70K+ USERS
        </div>
      </div>

      {/* Interactive Topology Nodes Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '12px',
        marginBottom: '20px',
      }}>
        {nodes.map((node, i) => {
          const isSelected = node.id === selectedNode;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNode(node.id)}
              style={{
                background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                border: isSelected ? '1px solid var(--accent-emerald)' : '1px solid var(--border-glass)',
                borderRadius: '10px',
                padding: '12px',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: isSelected ? 'var(--bg-card)' : 'var(--bg-card-hover)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-glass)',
                }}>
                  {node.icon}
                </div>
                <span style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono', color: 'var(--text-dim)' }}>
                  0{i + 1}
                </span>
              </div>

              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {node.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: isSelected ? 'var(--accent-emerald)' : 'var(--text-dim)', fontFamily: 'JetBrains Mono' }}>
                  {node.latency}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Deep-Dive Inspection Panel */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-glass-bright)',
        borderRadius: '12px',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 800, fontSize: '1.05rem' }}>
              {active.name}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              ({active.role})
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono', color: 'var(--accent-cyan)', background: 'var(--bg-card-hover)', border: '1px solid var(--border-glass)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              LATENCY: {active.latency}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {active.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '6px', borderTop: '1px solid var(--border-glass)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'JetBrains Mono' }}>
            CORE STACK:
          </span>
          {active.tech.split(', ').map((t) => (
            <span key={t} style={{
              fontSize: '0.72rem',
              fontFamily: 'JetBrains Mono',
              background: 'var(--bg-card-hover)',
              border: '1px solid var(--border-glass)',
              padding: '2px 8px',
              borderRadius: '4px',
              color: 'var(--accent-emerald)',
              fontWeight: 700,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
