# 🏗️ DevCanvas - Component Architecture

Complete technical documentation of the DevCanvas codebase.

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
5. [API Routes](#api-routes)
6. [Data Flow](#data-flow)
7. [AI Integration](#ai-integration)
8. [Styling System](#styling-system)
9. [State Management](#state-management)
10. [Future Enhancements](#future-enhancements)

---

## 🎯 System Overview

DevCanvas is a Next.js 14 application that transforms UI screenshots into production-ready code using Claude AI.

### High-Level Architecture

```
┌─────────────┐
│   Browser   │
│  (Client)   │
└──────┬──────┘
       │
       │ HTTP Request
       │
┌──────▼──────────────────────┐
│   Next.js App Router         │
│                              │
│  ┌────────────────────────┐ │
│  │  Landing Page (/page)  │ │
│  └────────────────────────┘ │
│                              │
│  ┌────────────────────────┐ │
│  │  Generator (/generator)│ │
│  └────────┬───────────────┘ │
│           │                  │
│           │ POST /api/generate
│           │                  │
│  ┌────────▼───────────────┐ │
│  │  API Route             │ │
│  │  (Server-Side)         │ │
│  └────────┬───────────────┘ │
└───────────┼─────────────────┘
            │
            │ Claude API Call
            │
┌───────────▼──────────────┐
│  Anthropic Claude API     │
│  (Vision + Text)          │
└───────────┬──────────────┘
            │
            │ Generated Code
            │
     ┌──────▼──────┐
     │   Response  │
     └─────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Syntax Highlighting**: Prism.js

### Backend
- **Runtime**: Node.js 18+
- **API Framework**: Next.js API Routes
- **AI**: Anthropic Claude API (Sonnet 4)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript

---

## 📁 Project Structure

```
devcanvas/
│
├── app/                          # Next.js App Router directory
│   │
│   ├── api/                      # API routes (server-side)
│   │   └── generate/
│   │       └── route.ts          # Claude API integration
│   │
│   ├── generator/                # Generator page
│   │   └── page.tsx              # Main app interface
│   │
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout wrapper
│   └── page.tsx                  # Landing page
│
├── components/                   # Reusable React components
│   └── (future components)
│
├── lib/                          # Utility functions
│   └── utils.ts                  # Helper utilities
│
├── public/                       # Static assets
│   └── (images, icons, etc.)
│
├── .env.local.example            # Environment variables template
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
├── README.md                     # Main documentation
├── QUICKSTART.md                 # Quick start guide
└── ARCHITECTURE.md               # This file
```

---

## 🧩 Core Components

### 1. Landing Page (`app/page.tsx`)

**Purpose**: Marketing page to attract users

**Key Sections**:
- Hero with CTA
- Features showcase
- How it works
- Social proof (stats)
- Footer

**Technologies**:
- Framer Motion for animations
- Responsive grid layout
- Gradient backgrounds
- Glass morphism effects

**Code Structure**:
```typescript
export default function Home() {
  // Navigation section
  // Hero section with animations
  // Features grid
  // How it works section
  // CTA section
  // Footer
}
```

**Animations**:
- Fade in on scroll
- Staggered card animations
- Pulse effects on buttons
- Background gradient animation

---

### 2. Generator Page (`app/generator/page.tsx`)

**Purpose**: Main application interface for code generation

**State Management**:
```typescript
const [screenshot, setScreenshot] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const [generatedCode, setGeneratedCode] = useState<string>("");
const [framework, setFramework] = useState<Framework>("react");
const [copied, setCopied] = useState(false);
```

**Key Features**:
1. **File Upload**:
   - Drag & drop
   - Click to browse
   - Paste from clipboard

2. **Framework Selection**:
   - React
   - Vue
   - HTML

3. **Code Generation**:
   - API call to `/api/generate`
   - Loading state
   - Error handling

4. **Code Display**:
   - Syntax highlighting (Prism.js)
   - Copy to clipboard
   - Download as file

**User Flow**:
```
1. User uploads screenshot
   ↓
2. User selects framework
   ↓
3. User clicks "Generate Code"
   ↓
4. API processes request
   ↓
5. Code appears with syntax highlighting
   ↓
6. User copies or downloads code
```

---

### 3. API Route (`app/api/generate/route.ts`)

**Purpose**: Server-side endpoint for Claude API integration

**Request Format**:
```typescript
POST /api/generate
Content-Type: application/json

{
  "image": "data:image/png;base64,...",
  "framework": "react" | "vue" | "html"
}
```

**Response Format**:
```typescript
{
  "code": "// Generated component code..."
}
```

**Process Flow**:
```
1. Receive request with image + framework
   ↓
2. Validate inputs
   ↓
3. Extract base64 image data
   ↓
4. Call Claude API with optimized prompt
   ↓
5. Parse and clean response
   ↓
6. Return formatted code
```

**Error Handling**:
- Missing fields → 400 Bad Request
- Invalid image → 400 Bad Request
- API error → 500 Internal Server Error
- Missing API key → 500 Internal Server Error

---

## 🔌 API Routes

### `/api/generate` - POST

**Purpose**: Generate code from screenshot using Claude AI

**Authentication**: None (add authentication for production)

**Rate Limiting**: None (implement for production)

**Request Body**:
```typescript
interface GenerateRequest {
  image: string;      // Base64 data URL
  framework: Framework; // "react" | "vue" | "html"
}
```

**Response**:
```typescript
interface GenerateResponse {
  code: string;       // Generated component code
}

interface ErrorResponse {
  error: string;      // Error message
}
```

**Claude API Configuration**:
```typescript
{
  model: "claude-sonnet-4-20250514",
  max_tokens: 4000,
  messages: [
    {
      role: "user",
      content: [
        { type: "image", source: { ... } },
        { type: "text", text: PROMPT }
      ]
    }
  ]
}
```

---

## 🔄 Data Flow

### Screenshot Upload Flow

```
┌──────────────┐
│ User uploads │
│  screenshot  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ FileReader   │
│ converts to  │
│   base64     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Store in     │
│ state        │
└──────────────┘
```

### Code Generation Flow

```
┌──────────────┐
│ User clicks  │
│ "Generate"   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Send POST to │
│ /api/generate│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Extract      │
│ base64 data  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Call Claude  │
│ API          │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Parse        │
│ response     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Clean code   │
│ (remove ```) │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Return to    │
│ frontend     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Display with │
│ highlighting │
└──────────────┘
```

---

## 🤖 AI Integration

### Prompt Engineering

Each framework has a specialized prompt:

#### React Prompt Strategy
```
1. Specify functional components + hooks
2. Request TypeScript types
3. Enforce Tailwind CSS usage
4. Require responsive design
5. Demand accessibility
6. Request clean output (no explanations)
```

#### Vue Prompt Strategy
```
1. Specify Composition API with <script setup>
2. Request proper SFC structure
3. Enforce Tailwind CSS usage
4. Require responsive design
5. Demand accessibility
6. Request clean output
```

#### HTML Prompt Strategy
```
1. Specify semantic HTML5
2. Include Tailwind CDN
3. Require responsive design
4. Demand accessibility
5. Request clean output
```

### Claude API Usage

**Model**: `claude-sonnet-4-20250514`
- Best balance of speed and quality
- Vision capabilities
- 4000 token output limit

**Why Claude over GPT-4V**:
1. Better code quality
2. More consistent formatting
3. Follows instructions precisely
4. Less "chatty" responses
5. Better at Tailwind CSS

### Response Processing

```typescript
// 1. Extract text from response
const generatedCode = message.content
  .filter((block) => block.type === "text")
  .map((block) => block.text)
  .join("\n");

// 2. Clean markdown code blocks
cleanCode = cleanCode.replace(/^```(?:jsx|tsx|vue|html)?\n/, "");
cleanCode = cleanCode.replace(/\n```$/, "");

// 3. Return trimmed result
return cleanCode.trim();
```

---

## 🎨 Styling System

### Tailwind CSS Configuration

**Custom Colors**:
```javascript
colors: {
  primary: "hsl(262 83% 58%)",    // Purple
  secondary: "hsl(240 4.8% 95.9%)", // Light gray
  // ... more colors
}
```

**Custom Animations**:
```javascript
keyframes: {
  "fade-in": { /* ... */ },
  "slide-in-right": { /* ... */ },
  "shine": { /* ... */ }
}
```

### Design System

**Color Palette**:
- Purple: Primary actions, headings
- Pink: Accents, gradients
- Blue: Secondary elements
- Gray: Text, borders

**Typography**:
- Font: Inter (Google Fonts)
- Sizes: Responsive scale (text-sm to text-7xl)
- Weights: 400 (normal), 600 (semibold), 700 (bold)

**Spacing**:
- Container max-width: 1400px
- Section padding: py-20
- Component gaps: gap-4, gap-6, gap-8

---

## 📦 State Management

### Generator Page State

```typescript
// Screenshot state
const [screenshot, setScreenshot] = useState<string | null>(null);

// Loading state
const [loading, setLoading] = useState(false);

// Generated code
const [generatedCode, setGeneratedCode] = useState<string>("");

// Framework selection
const [framework, setFramework] = useState<Framework>("react");

// Copy feedback
const [copied, setCopied] = useState(false);
```

### State Flow

```
User Action → setState → Re-render → Update UI
```

**No external state management needed because**:
- Simple component state
- No global state requirements
- No complex data sharing
- Parent-child communication only

**When to add Redux/Zustand**:
- User authentication
- Component history
- Team collaboration
- Complex data sharing

---

## 🚀 Future Enhancements

### Phase 1: Core Features (Next 2 weeks)
- [ ] Add loading spinner during generation
- [ ] Implement error toast notifications
- [ ] Add more example screenshots
- [ ] Create demo video

### Phase 2: User Features (Next month)
- [ ] User authentication (Clerk/NextAuth)
- [ ] Component history
- [ ] Save favorites
- [ ] Share generated components

### Phase 3: Advanced Features (2-3 months)
- [ ] Live component preview
- [ ] Multiple screenshot upload
- [ ] Batch processing
- [ ] Export to CodeSandbox/StackBlitz

### Phase 4: Collaboration (3-6 months)
- [ ] Team workspaces
- [ ] Component library
- [ ] Version control
- [ ] Comments/feedback

### Phase 5: Integrations (6+ months)
- [ ] Figma plugin
- [ ] VS Code extension
- [ ] CLI tool
- [ ] GitHub Actions integration

---

## 🔐 Security Considerations

### Current Implementation
- ✅ API key stored in environment variables
- ✅ Server-side API calls only
- ❌ No rate limiting
- ❌ No authentication
- ❌ No input validation (beyond basic checks)

### Production Recommendations
1. **Add rate limiting**: Prevent API abuse
2. **Implement authentication**: Track users
3. **Validate images**: Check file size, type
4. **Add CORS**: Restrict API access
5. **Sanitize outputs**: Prevent XSS attacks
6. **Monitor usage**: Track API costs

---

## 📊 Performance Optimization

### Current Performance
- Initial load: ~2s (could be improved)
- Code generation: 5-10s (AI processing time)
- Page transitions: Instant (client-side routing)

### Optimization Opportunities
1. **Image Optimization**:
   - Compress before upload
   - Resize to optimal dimensions
   - Use WebP format

2. **Code Splitting**:
   - Lazy load Prism.js
   - Dynamic imports for components
   - Route-based code splitting

3. **Caching**:
   - Cache generated code (localStorage)
   - Cache AI responses (Redis)
   - CDN for static assets

4. **API Optimization**:
   - Stream responses
   - Compress API payloads
   - Use edge functions

---

## 🧪 Testing Strategy

### Unit Tests (To Implement)
```
lib/utils.ts → Test utility functions
app/api/generate/route.ts → Test API logic
```

### Integration Tests
```
Screenshot upload → API call → Code generation
```

### E2E Tests
```
User flow from landing page to code download
```

### Testing Tools
- Jest (unit tests)
- React Testing Library (component tests)
- Playwright (E2E tests)

---

## 📚 Code Standards

### TypeScript
- Strict mode enabled
- Explicit types for function parameters
- Interfaces over types for objects
- No `any` types

### React
- Functional components only
- Hooks for state management
- Proper cleanup in useEffect
- Memoization for expensive operations

### CSS
- Tailwind utility classes only
- No inline styles
- Mobile-first responsive design
- Consistent spacing scale

---

## 🎓 Key Learnings

### Technical Insights
1. **Prompt Engineering**: Small prompt changes = big output differences
2. **Image Handling**: Base64 encoding adds ~33% overhead
3. **API Limits**: Claude has 4000 token output limit
4. **Type Safety**: TypeScript catches 90% of bugs at compile time

### Product Insights
1. **User Flow**: Simple flows = higher conversion
2. **Visual Feedback**: Loading states are crucial
3. **Error Handling**: Clear errors reduce support requests
4. **Demo Videos**: Worth 1000 words

---

**Questions? Check README.md or Claude API docs!**
