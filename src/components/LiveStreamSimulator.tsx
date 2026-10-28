'use client';

import React, { useState, useEffect } from 'react';
import { Radio, Mic, MicOff, Gift, Zap, Sparkles, Volume2, ShieldCheck, Activity, Users, Flame, RefreshCw } from 'lucide-react';

export default function LiveStreamSimulator() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isPkBattle, setIsPkBattle] = useState(false);
  const [pkScoreHost, setPkScoreHost] = useState(2450);
  const [pkScoreGuest, setPkScoreGuest] = useState(1980);
  const [listenersCount, setListenersCount] = useState(1284);
  const [liveLog, setLiveLog] = useState<string | null>(null);
  const [showGiftAnimation, setShowGiftAnimation] = useState(false);
  const [cryptoToken, setCryptoToken] = useState('04fa92b...9a8f_zegocloud_rtc_active');
  const [latency, setLatency] = useState(24);

  // Equalizer frequency bars
  const [bars, setBars] = useState<number[]>([
    45, 60, 85, 95, 70, 50, 75, 90, 65, 80, 55, 40, 60, 75, 88, 70, 55, 85, 90, 65, 45, 70, 60, 50
  ]);

  // Jitter simulation for realistic stream telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMicOn) {
        setBars((prev) =>
          prev.map(() => Math.floor(Math.random() * (isPkBattle ? 65 : 55)) + (isPkBattle ? 35 : 25))
        );
      } else {
        setBars((prev) => prev.map(() => Math.floor(Math.random() * 12) + 6));
      }

      // Small jitter in latency
      setLatency(22 + Math.floor(Math.random() * 5));
    }, 180);

    return () => clearInterval(interval);
  }, [isMicOn, isPkBattle]);

  // Trigger Virtual Gift BullMQ Workflow
  const handleTriggerGift = () => {
    setShowGiftAnimation(true);
    setListenersCount((c) => c + Math.floor(Math.random() * 8) + 2);
    if (isPkBattle) {
      setPkScoreHost((s) => s + 500);
    }

    const workerId = Math.floor(Math.random() * 4) + 1;
    const processTime = (12 + Math.random() * 6).toFixed(1);
    setLiveLog(
      `[BullMQ Worker #${workerId}] Queue job completed in ${processTime}ms: -500 coins atomic deduction -> Host credited -> SVGA event broadcasted to ${listenersCount} peers via Redis Pub/Sub.`
    );

    setTimeout(() => {
      setShowGiftAnimation(false);
    }, 2400);
  };

  // Toggle Mic
  const handleToggleMic = () => {
    const newState = !isMicOn;
    setIsMicOn(newState);
    setLiveLog(
      newState
        ? 'Agora RTC & ZEGOCLOUD: Audio stream unmuted. 48kHz dual-channel Opus encoder active.'
        : 'Agora RTC & ZEGOCLOUD: Audio stream muted. Broadcast packets throttled to preserve bandwidth.'
    );
  };

  // Toggle PK Battle
  const handleTogglePkBattle = () => {
    const nextPk = !isPkBattle;
    setIsPkBattle(nextPk);
    if (nextPk) {
      setLiveLog('Socket.IO Room Cluster: PK Battle session initialized. Multi-seat video mixing enabled.');
    } else {
      setLiveLog('Socket.IO Room Cluster: Restored standard 9-seat audio co-host layout.');
    }
  };

  // Generate new token
  const handleRefreshToken = () => {
    const rand = Math.random().toString(36).substring(2, 8);
    const token = `04fa${rand}...${Date.now().toString().slice(-4)}_agora_rtc_signed`;
    setCryptoToken(token);
    setLiveLog(`Cryptographic Token Service: Generated dynamic HMAC-SHA256 RTC token (Expires in 3600s).`);
  };

  return (
    <div className="stream-simulator-hud" style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-glass-bright)',
      borderRadius: 'var(--radius-xl)',
      padding: '24px',
      boxShadow: 'var(--shadow-card)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top Holographic Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border-glass)',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#f87171',
            padding: '4px 10px',
            borderRadius: '999px',
            fontSize: '0.74rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            <span className="pulse-dot" style={{ background: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
            LIVE STAGE #8892
          </div>

          <span style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            fontWeight: 600,
          }}>
            9-Seat Co-Host Audio &amp; Video Mesh
          </span>
        </div>

        {/* Listeners Count */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--bg-input)',
          padding: '4px 12px',
          borderRadius: '999px',
          border: '1px solid var(--border-glass)',
          fontSize: '0.78rem',
          color: 'var(--text-primary)',
          fontWeight: 700,
          fontFamily: 'JetBrains Mono',
        }}>
          <Users size={13} style={{ color: 'var(--accent-cyan)' }} />
          <span>{listenersCount.toLocaleString()} Live Listeners</span>
        </div>
      </div>

      {/* PK Battle Gauge Banner (if active) */}
      {isPkBattle && (
        <div style={{
          marginBottom: '18px',
          background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.2), rgba(59, 130, 246, 0.2))',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '12px 16px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', fontWeight: 800, marginBottom: '6px', fontFamily: 'JetBrains Mono' }}>
            <span style={{ color: '#ef4444' }}>🔴 HOST MANOJ: {pkScoreHost} PTS</span>
            <span style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 4 }}><Flame size={12} /> PK BATTLE LIVE</span>
            <span style={{ color: '#38bdf8' }}>CHALLENGER: {pkScoreGuest} PTS 🔵</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '999px', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${(pkScoreHost / (pkScoreHost + pkScoreGuest)) * 100}%`, background: 'linear-gradient(90deg, #ef4444, #f87171)', transition: 'width 0.4s ease' }} />
            <div style={{ flex: 1, background: 'linear-gradient(90deg, #38bdf8, #0284c7)' }} />
          </div>
        </div>
      )}

      {/* Centerpiece: Real-Time Spectrum Equalizer Visualizer */}
      <div style={{
        background: 'var(--bg-input)',
        border: '1px solid var(--border-glass)',
        borderRadius: '14px',
        padding: '20px',
        marginBottom: '20px',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Volume2 size={15} style={{ color: isMicOn ? 'var(--accent-emerald)' : 'var(--text-dim)' }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>
              SPECTRUM VISUALIZER: {isMicOn ? 'AUDIO ACTIVE (48kHz)' : 'HOST MIC MUTED'}
            </span>
          </div>

          <div style={{
            fontSize: '0.72rem',
            fontFamily: 'JetBrains Mono',
            color: 'var(--accent-emerald)',
            background: 'rgba(16, 185, 129, 0.12)',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}>
            ZEGOCLOUD RTC + AGORA
          </div>
        </div>

        {/* Animated Spectrum Wave Bars */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '4px',
          height: '76px',
          padding: '6px 0',
        }}>
          {bars.map((height, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${height}%`,
                background: isMicOn
                  ? `linear-gradient(180deg, var(--accent-cyan) 0%, var(--accent-emerald) 60%, rgba(16, 185, 129, 0.2) 100%)`
                  : 'rgba(100, 116, 139, 0.3)',
                borderRadius: '3px 3px 0 0',
                transition: 'height 0.16s ease',
                boxShadow: isMicOn && height > 60 ? '0 0 10px rgba(0, 242, 254, 0.4)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Floating Flying Gift / Coin Animation Overlay */}
        {showGiftAnimation && (
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '14px',
            backdropFilter: 'blur(3px)',
            animation: 'fadeIn 0.2s ease',
          }}>
            <div style={{
              fontSize: '2.5rem',
              animation: 'bounce 0.6s infinite alternate',
            }}>
              🚀 ✨ 💎
            </div>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: 800,
              color: '#fbbf24',
              fontFamily: 'JetBrains Mono',
              textShadow: '0 0 12px rgba(251, 191, 36, 0.6)',
              marginTop: '6px',
            }}>
              SUPER ROCKET GIFT SENT! (500 COINS)
            </div>
            <div style={{ fontSize: '0.72rem', color: '#fff', opacity: 0.85, marginTop: '2px' }}>
              BullMQ Worker Queue Processed • SVGA Triggered
            </div>
          </div>
        )}
      </div>

      {/* Real-time Telemetry Matrix */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '10px',
        marginBottom: '20px',
      }}>
        <div style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-glass)',
          borderRadius: '10px',
          padding: '10px 12px',
        }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
            RTC Latency
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'JetBrains Mono', marginTop: '3px' }}>
            {latency} ms
          </div>
        </div>

        <div style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-glass)',
          borderRadius: '10px',
          padding: '10px 12px',
        }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
            Stream Bitrate
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'JetBrains Mono', marginTop: '3px' }}>
            2,850 kbps
          </div>
        </div>

        <div style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-glass)',
          borderRadius: '10px',
          padding: '10px 12px',
        }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
            Queue Worker
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-purple)', fontFamily: 'JetBrains Mono', marginTop: '3px' }}>
            BullMQ ⚡
          </div>
        </div>

        <div style={{
          background: 'var(--bg-input)',
          border: '1px solid var(--border-glass)',
          borderRadius: '10px',
          padding: '10px 12px',
        }}>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>
            SVGA Gifts
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'JetBrains Mono', marginTop: '3px' }}>
            60 FPS
          </div>
        </div>
      </div>

      {/* Interactive Controls Deck */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
      }}>
        <button
          type="button"
          onClick={handleTriggerGift}
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '9px 18px',
            fontSize: '0.84rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)',
            transition: 'var(--transition)',
          }}
        >
          <Gift size={15} /> Send Virtual Gift (BullMQ Queue)
        </button>

        <button
          type="button"
          onClick={handleToggleMic}
          style={{
            background: isMicOn ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: isMicOn ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
            color: isMicOn ? 'var(--accent-emerald-light)' : '#f87171',
            borderRadius: '999px',
            padding: '9px 16px',
            fontSize: '0.84rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'var(--transition)',
          }}
        >
          {isMicOn ? <Mic size={15} /> : <MicOff size={15} />}
          {isMicOn ? 'Host Mic: Active' : 'Host Mic: Muted'}
        </button>

        <button
          type="button"
          onClick={handleTogglePkBattle}
          style={{
            background: isPkBattle ? 'rgba(236, 72, 153, 0.2)' : 'var(--bg-input)',
            border: isPkBattle ? '1px solid rgba(236, 72, 153, 0.5)' : '1px solid var(--border-glass)',
            color: isPkBattle ? '#f472b6' : 'var(--text-secondary)',
            borderRadius: '999px',
            padding: '9px 16px',
            fontSize: '0.84rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'var(--transition)',
          }}
        >
          <Flame size={15} /> {isPkBattle ? 'Exit PK Battle' : 'Simulate PK Battle'}
        </button>

        <button
          type="button"
          onClick={handleRefreshToken}
          title="Regenerate Signed RTC Room Token"
          style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-dim)',
            borderRadius: '999px',
            padding: '9px 12px',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'var(--transition)',
          }}
        >
          <RefreshCw size={13} /> Token
        </button>
      </div>

      {/* Live Server / Queue Event Log Feed */}
      {liveLog && (
        <div style={{
          marginTop: '16px',
          background: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--border-glass)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontFamily: 'JetBrains Mono',
          fontSize: '0.74rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
        }}>
          <span style={{ color: 'var(--accent-emerald)', fontWeight: 800 }}>⚡ EVENT:</span>
          <span>{liveLog}</span>
        </div>
      )}
    </div>
  );
}
