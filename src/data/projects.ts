export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'all' | 'fullstack' | 'backend' | 'cloud' | 'devtools';
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  metrics?: string;
  stars?: number;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'livestream-suite',
    title: 'LiveStream Social & Entertainment Suite',
    description: 'Real-time interactive audio/video entertainment platform powered by ZEGOCLOUD & Agora SDKs. Features host/co-host requests, PK battles, SVGA virtual gifting, coin wallets, and background billing with BullMQ. Live on Google Play with 70,000+ active downloads.',
    image: '/images/project_streaming.jpg',
    tags: ['Node.js', 'Socket.IO', 'ZEGOCLOUD', 'Agora', 'Redis', 'BullMQ'],
    category: 'backend',
    featured: true,
    liveUrl: 'https://play.google.com',
    githubUrl: 'https://github.com/manojmksmanu',
    metrics: '70,000+ Google Play Downloads',
    stars: 340
  },
  {
    id: 'hr-payroll-system',
    title: 'Enterprise HR & Payroll Automation System',
    description: 'Comprehensive enterprise workforce management platform. Built backend APIs and administrative dashboards for employee attendance/leave tracking, biometric clock-in, and automated monthly salary and tax disbursement.',
    image: '/images/project_hr_system.jpg',
    tags: ['PostgreSQL', 'Prisma ORM', 'Node.js', 'TypeScript', 'React'],
    category: 'fullstack',
    featured: true,
    liveUrl: 'https://github.com/manojmksmanu',
    githubUrl: 'https://github.com/manojmksmanu',
    metrics: '99.9% Uptime Payroll SLA',
    stars: 120
  },
  {
    id: 'megaminds-realtime-chat',
    title: 'Megaminds Real-Time Chat & Push Hub',
    description: 'Cross-platform mobile and web application featuring instant real-time messaging, multi-format media file sharing, push notifications, and responsive UI published to Google Play & App Store.',
    image: '/images/project_ecommerce.jpg',
    tags: ['React Native', 'Expo', 'Next.js', 'Socket.IO', 'MongoDB'],
    category: 'fullstack',
    featured: true,
    liveUrl: 'https://github.com/manojmksmanu',
    githubUrl: 'https://github.com/manojmksmanu',
    metrics: 'Real-Time Sync Engine',
    stars: 92
  },
  {
    id: 'cohost-webrtc-engine',
    title: 'Distributed Co-Host & Real-Time Presence Engine',
    description: 'High-throughput microservices architecture for live room presence, audio/video room state synchronization, broadcaster controls, participant lists, and Cloudflare R2 / Cloudinary asset pipelines.',
    image: '/images/project_microservices.jpg',
    tags: ['TypeScript', 'Socket.IO', 'Redis', 'Cloudflare R2', 'Docker'],
    category: 'cloud',
    featured: false,
    liveUrl: 'https://github.com/manojmksmanu',
    githubUrl: 'https://github.com/manojmksmanu',
    metrics: 'Sub-120ms Latency',
    stars: 175
  },
  {
    id: 'agency-admin-portal',
    title: 'Host Agency & Commission Admin Portal',
    description: 'Mission-critical administrative management portal for managing hosts, coin plans, agency commissions, withdrawal approval workflows, and creator verification statistics.',
    image: '/images/project_admin_panel.jpg',
    tags: ['Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
    category: 'cloud',
    featured: false,
    liveUrl: 'https://github.com/manojmksmanu',
    githubUrl: 'https://github.com/manojmksmanu',
    metrics: 'Multi-Agency Commission Engine',
    stars: 88
  }
];
