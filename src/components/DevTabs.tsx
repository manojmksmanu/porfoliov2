'use client';

import React, { useState } from 'react';
import { Copy, Check, FileCode, Terminal, Sparkles } from 'lucide-react';

interface CodeFile {
  name: string;
  lang: string;
  iconColor: string;
  description: string;
  code: string;
}

export default function DevTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const files: CodeFile[] = [
    {
      name: 'LiveStreamEngine.ts',
      lang: 'TypeScript',
      iconColor: '#38bdf8',
      description: 'Ultra-low latency room orchestration & co-host seat mixing (ZEGOCLOUD / Agora)',
      code: `import { generateZegoRtcToken } from '@/services/rtcAuth';
import { redisClient } from '@/lib/redis';
import { liveStreamQueue } from '@/queues/streamBilling';

export interface CoHostSession {
  roomId: string;
  hostId: string;
  coHostSlots: Map<number, string>;
  isPkBattleActive: boolean;
}

export async function joinCoHostRoom(userId: string, roomId: string, slotIndex: number) {
  // 1. Verify seat availability with distributed atomic lock
  const lockKey = \`lock:room:\${roomId}:slot:\${slotIndex}\`;
  const acquired = await redisClient.set(lockKey, userId, 'NX', 'EX', 10);
  if (!acquired) throw new Error('Seat occupied or transition in progress');

  // 2. Generate dynamic HMAC cryptographic RTC media token
  const rtcToken = generateZegoRtcToken({
    appId: process.env.ZEGO_APP_ID!,
    userId,
    roomId,
    privilege: { canPublishAudio: true, canPublishVideo: true }
  });

  // 3. Notify real-time listeners via Redis Pub/Sub
  await redisClient.publish(\`room:\${roomId}:events\`, JSON.stringify({
    event: 'CO_HOST_JOINED',
    slot: slotIndex,
    userId,
    timestamp: Date.now()
  }));

  return { status: 'ONLINE', rtcToken, slotIndex };
}`,
    },
    {
      name: 'BullMQGiftWorker.ts',
      lang: 'TypeScript',
      iconColor: '#34d399',
      description: 'Distributed queue worker processing coin wallet deductions & virtual SVGA gifting',
      code: `import { Worker, Job } from 'bullmq';
import { db } from '@/lib/db';
import { broadcastRoomAnimation } from '@/services/socketServer';

interface GiftPayload {
  senderId: string;
  receiverHostId: string;
  giftId: string;
  coinValue: number;
  roomId: string;
  svgaAssetUrl: string;
}

export const giftWorker = new Worker<GiftPayload>(
  'live_virtual_gifts',
  async (job: Job<GiftPayload>) => {
    const { senderId, receiverHostId, coinValue, roomId, svgaAssetUrl } = job.data;

    // Execute atomic wallet transfer in single database transaction
    await db.$transaction(async (tx) => {
      // 1. Decrement sender balance
      const sender = await tx.wallet.update({
        where: { userId: senderId },
        data: { coins: { decrement: coinValue } }
      });
      if (sender.coins < 0) throw new Error('Insufficient wallet balance');

      // 2. Credit host earnings (70% revenue share)
      await tx.wallet.update({
        where: { userId: receiverHostId },
        data: { diamondEarnings: { increment: Math.floor(coinValue * 0.7) } }
      });
    });

    // 3. Trigger 60FPS full-screen SVGA gift animation to all viewers
    await broadcastRoomAnimation(roomId, {
      svgaUrl: svgaAssetUrl,
      sender: senderId,
      amount: coinValue
    });
  },
  { concurrency: 50, connection: { host: process.env.REDIS_HOST } }
);`,
    },
    {
      name: 'SocketPresence.ts',
      lang: 'TypeScript',
      iconColor: '#a855f7',
      description: 'Socket.IO multi-room presence heartbeat & live listener count sync',
      code: `import { Server, Socket } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { pubClient, subClient } from '@/lib/redisCluster';

export function setupSocketServer(io: Server) {
  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket: Socket) => {
    const userId = socket.handshake.auth.userId;

    socket.on('JOIN_STREAM', async ({ roomId }) => {
      socket.join(roomId);

      // Increment room active count in Redis hyperloglog
      await pubClient.pfadd(\`unique_viewers:\${roomId}\`, userId);
      const viewerCount = await pubClient.scard(\`room_occupancy:\${roomId}\`);

      io.to(roomId).emit('VIEWER_UPDATE', { count: viewerCount });
    });

    socket.on('disconnecting', () => {
      // Automatic cleanup across all active streaming rooms
      for (const room of socket.rooms) {
        io.to(room).emit('USER_LEFT', { userId });
      }
    });
  });
}`,
    },
  ];

  const current = files[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border-glass-bright)',
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
    }}>
      {/* IDE Top Bar / File Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-card-hover)',
        borderBottom: '1px solid var(--border-glass)',
        padding: '0 8px',
        overflowX: 'auto',
      }}>
        {/* File Tabs */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {files.map((file, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={file.name}
                type="button"
                onClick={() => setActiveTab(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: isActive ? 'var(--bg-card)' : 'transparent',
                  border: 'none',
                  borderTop: isActive ? '2px solid var(--accent-emerald)' : '2px solid transparent',
                  borderRight: '1px solid var(--border-glass)',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-dim)',
                  fontSize: '0.82rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <FileCode size={14} style={{ color: file.iconColor }} />
                <span>{file.name}</span>
              </button>
            );
          })}
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            borderRadius: '6px',
            padding: '5px 10px',
            color: copied ? 'var(--accent-emerald)' : 'var(--text-secondary)',
            fontSize: '0.74rem',
            fontFamily: 'JetBrains Mono, monospace',
            cursor: 'pointer',
            flexShrink: 0,
            margin: '6px 8px',
          }}
          title="Copy code to clipboard"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          <span>{copied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>

      {/* File Description Header */}
      <div style={{
        padding: '8px 16px',
        background: 'var(--bg-input)',
        borderBottom: '1px solid var(--border-glass)',
        fontSize: '0.78rem',
        color: 'var(--text-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span>💡 {current.description}</span>
        <span style={{ fontFamily: 'JetBrains Mono', color: 'var(--accent-emerald)', fontSize: '0.72rem', fontWeight: 700 }}>
          PROD SPEC &bull; MANOJ KUMAR
        </span>
      </div>

      {/* Code Editor Body */}
      <div style={{
        padding: '16px',
        maxHeight: '340px',
        overflowY: 'auto',
        fontSize: '0.82rem',
        fontFamily: 'JetBrains Mono, monospace',
        lineHeight: 1.6,
        color: 'var(--text-primary)',
        background: 'var(--bg-card)',
      }}>
        <pre style={{ margin: 0 }}>
          <code>{current.code}</code>
        </pre>
      </div>
    </div>
  );
}
