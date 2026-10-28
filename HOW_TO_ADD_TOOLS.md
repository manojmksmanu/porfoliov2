# 🛠️ How to Add New Tools to Your Portfolio

Your project is built with a **modular, plug-and-play architecture** so you can easily add as many developer tools as you want!

---

## ⚡ 2 Simple Ways to Add a Tool

### Method 1: Using the Built-In UI Generator (Recommended!)
1. Open your browser and go to `/tools`.
2. Click the glowing **`+ Add More Tools`** button at the top right.
3. Type the name and category of your tool.
4. Click **`Copy Registry Snippet`** and paste into `src/data/tools.ts`.
5. Click **`Copy Component Code`** and save it in `src/components/tools/YourToolName.tsx`.
6. Done! Your tool will automatically appear in the Tools Hub, the Home Workbench, search filters, and category badges!

---

### Method 2: Manual Step-by-Step

#### Step 1: Add Tool Definition to `src/data/tools.ts`
Open `src/data/tools.ts` and add your new tool object to `TOOLS_REGISTRY`:

```typescript
export const TOOLS_REGISTRY: ToolItem[] = [
  // ... existing tools
  {
    id: 'jwt-debugger',
    name: 'JWT Debugger & Inspector',
    description: 'Decode, inspect and verify JSON Web Tokens (JWT) client-side.',
    category: 'utility',
    icon: 'Shield', // Lucide icon name
    badge: 'Security',
    color: 'var(--accent-purple)',
    isPopular: true,
    route: '/tools/jwt-debugger',
    tags: ['JWT', 'Bearer Token', 'HMAC', 'Decode'],
    features: [
      'Instant header and payload decoder',
      'Expiration timestamp parser',
      'Zero server transmission'
    ]
  }
];
```

#### Step 2: Create Component in `src/components/tools/YourTool.tsx`
Create a clean React component in `src/components/tools/JwtDebuggerTool.tsx`:

```tsx
'use client';

import React, { useState } from 'react';

export default function JwtDebuggerTool() {
  const [token, setToken] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Your tool UI and logic here */}
    </div>
  );
}
```

#### Step 3: Mount in `src/app/tools/page.tsx`
Import your component:
```tsx
import JwtDebuggerTool from '@/components/tools/JwtDebuggerTool';

// Inside the component renderer:
{activeTool.id === 'jwt-debugger' && <JwtDebuggerTool />}
```

That's it! The tool is immediately searchable, filterable, testable in the Studio view, and browsable in the Grid catalog!
