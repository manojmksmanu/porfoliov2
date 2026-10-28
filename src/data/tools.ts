export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: 'all' | 'api' | 'data' | 'media' | 'utility' | 'perf';
  icon: string;
  badge?: string;
  color?: string;
  isPopular?: boolean;
  route: string;
  tags: string[];
  features?: string[];
}

export const TOOLS_REGISTRY: ToolItem[] = [
  {
    id: 'api-tester',
    name: 'REST API Tester & Inspector',
    description: 'Send real HTTP requests from your browser with query builder, headers, auth bearer tokens, and live millisecond latency telemetry.',
    category: 'api',
    icon: 'Radio',
    badge: 'Live Network',
    color: 'var(--accent-cyan)',
    isPopular: true,
    route: '/tools/api-tester',
    tags: ['HTTP Client', 'GET / POST / PUT', 'Headers', 'cURL Export', 'Timing Breakdown'],
    features: [
      'Full HTTP request engine with custom headers, query params & request body',
      'Accurate millisecond latency and status code telemetry',
      'One-click cURL command exporter',
      'Prettified response inspector with raw/tree views',
    ],
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & AST Validator',
    description: 'Format, minify, sort keys, validate syntax errors with line/column markers, search nested properties with dot notation, and copy clean payload.',
    category: 'data',
    icon: 'Braces',
    badge: 'AST Engine',
    color: 'var(--accent-purple)',
    isPopular: true,
    route: '/tools/json-formatter',
    tags: ['AST Lint', '2/4 Spaces', 'Minify', 'Alphabetical Sorting', 'Zero Latency'],
    features: [
      'Precise syntax error detection with line numbers',
      'One-click format (2/4 spaces) or single-line minify',
      'Deterministic key sorting for Git diffs',
      'Instant payload copy & file download',
    ],
  },
  {
    id: 'image-converter',
    name: 'Image & Folder Batch Converter Studio',
    description: 'Client-side WebP, AVIF, PNG, and JPEG compression studio. Upload entire folders, preserve nested directory structures, and download ZIP archives.',
    category: 'media',
    icon: 'Image',
    badge: 'Folder ZIP',
    color: 'var(--accent-emerald)',
    isPopular: true,
    route: '/tools/image-converter',
    tags: ['WebP / AVIF', 'Folder Upload', 'Split Slider', 'ZIP Archive', 'Canvas 2D'],
    features: [
      'Complete folder batch conversion with folder structure preservation',
      'Interactive Split-Screen comparison slider & zoom loupe (3x)',
      'Real-time compression % savings calculator',
      'Instant ZIP archive download using JSZip',
    ],
  },
  {
    id: 'api-performance',
    name: 'API Latency & Concurrency Benchmark',
    description: 'Simulate high-concurrency requests against your API endpoints. Calculates TTFB, P50, P90, P95, P99 latency percentiles, error rates, and request distribution.',
    category: 'perf',
    icon: 'Zap',
    badge: 'Benchmark',
    color: '#fbbf24',
    isPopular: false,
    route: '/tools/api-performance',
    tags: ['P50 / P95 / P99', 'Concurrency', 'TTFB', 'Performance Telemetry'],
    features: [
      'Concurrent worker requests simulation',
      'Detailed latency percentile distribution calculations',
      'Success vs error rate percentage telemetry',
      'Visual response latency bar chart',
    ],
  },
  {
    id: 'base64-tool',
    name: 'Base64 Encoder & Decoder Studio',
    description: 'Instant client-side encoding and decoding with UTF-8 support, byte counter, URI safety options, and authorization header generation.',
    category: 'utility',
    icon: 'SlidersHorizontal',
    badge: 'UTF-8 Utility',
    color: 'var(--accent-cyan)',
    isPopular: true,
    route: '/tools/base64-tool',
    tags: ['Base64', 'UTF-8 String', 'Binary Payload', 'Basic Auth', 'Instant Process'],
    features: [
      'Bidirectional encode / decode with zero network calls',
      'UTF-8 and multi-byte unicode character preservation',
      'Live character and byte size comparison',
      'One-click copy to clipboard',
    ],
  },
  {
    id: 'regex-tool',
    name: 'Regex Tester & Matcher Playground',
    description: 'Real-time regular expression compilation, flag toggles (g, i, m, s), match highlighting, group capturing, and common regex pattern library.',
    category: 'utility',
    icon: 'Search',
    badge: 'Regex Engine',
    color: 'var(--accent-emerald)',
    isPopular: false,
    route: '/tools/regex-tool',
    tags: ['RegEx Matcher', 'Capture Groups', 'Flag Toggles', 'Common Patterns', 'Live Compile'],
    features: [
      'Instant match highlighting with capture groups breakdown',
      'Interactive flag switches (global, case-insensitive, multiline)',
      'Library of common regex patterns (email, URL, phone, IP)',
      'Syntax error feedback in real time',
    ],
  },
];
