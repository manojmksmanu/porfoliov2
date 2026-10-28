export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'scaling-websockets-nodejs',
    title: 'Scaling Real-Time WebSockets to 50,000+ Concurrent Connections in Node.js',
    summary: 'A deep-dive into clustering, Redis pub/sub backplanes, socket memory leaks, and OS TCP socket tuning.',
    date: 'Oct 14, 2026',
    readTime: '6 min read',
    category: 'Backend Architecture',
    tags: ['Node.js', 'WebSockets', 'Redis', 'Performance']
  },
  {
    slug: 'webp-avif-client-side-compression',
    title: 'Why Client-Side WebP & AVIF Compression Outperforms Server Uploads',
    summary: 'How HTML5 Canvas and offscreen workers can save 80% bandwidth by compressing high-res photos before reaching the cloud.',
    date: 'Sep 28, 2026',
    readTime: '5 min read',
    category: 'Web Performance',
    tags: ['Next.js', 'WebP', 'Canvas API', 'DevTools']
  },
  {
    slug: 'designing-resilient-apis',
    title: 'Designing Resilient Distributed APIs: Retries, Idempotency & Circuit Breakers',
    summary: 'Practical patterns for preventing cascading microservice failures in cloud environments using Node.js & Go.',
    date: 'Aug 19, 2026',
    readTime: '8 min read',
    category: 'Systems Design',
    tags: ['Microservices', 'Distributed Systems', 'API Design']
  }
];
