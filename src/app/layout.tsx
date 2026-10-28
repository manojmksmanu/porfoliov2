import type { Metadata } from 'next';
import './globals.css';
import CommandPalette from '@/components/CommandPalette';
import CreativeIntro from '@/components/CreativeIntro';

export const metadata: Metadata = {
  title: 'Manoj Kumar | Software Developer & Real-Time Engineering Studio',
  description: 'Manoj Kumar — Software Developer specializing in real-time live-streaming architectures (ZEGOCLOUD / Agora), Socket.IO, distributed backends (BullMQ / Redis), and developer productivity tools. Contributed to apps with 70K+ downloads.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CreativeIntro />
        <div className="cyber-grid-background" />
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
