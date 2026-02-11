# 🎨 DevCanvas - AI-Powered Component Builder

Transform any UI screenshot into production-ready React, Vue, or HTML components instantly using Claude AI.

![DevCanvas Demo](https://via.placeholder.com/1200x600/7c3aed/ffffff?text=DevCanvas+Demo)

## ✨ Features

- 🤖 **AI-Powered Code Generation** - Claude Vision analyzes screenshots and generates semantic code
- 🎯 **Multiple Frameworks** - Export to React, Vue, or HTML + Tailwind
- 🎨 **Beautiful UI** - Stunning landing page with animations and modern design
- 📋 **Copy & Download** - Easy code export with one-click copy and download
- 🚀 **Production-Ready** - Clean, maintainable code following best practices
- 📱 **Responsive Design** - Mobile-first approach for all generated components
- ♿ **Accessible** - Proper semantic HTML and ARIA attributes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- An Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. **Clone or download the project**
   ```bash
   cd devcanvas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🎯 Usage

1. **Navigate to the Generator**
   - Click "Try Now" or "Start Building Free" from the landing page
   - Or go directly to `/generator`

2. **Select Your Framework**
   - Choose between React, Vue, or HTML output

3. **Upload a Screenshot**
   - Drag and drop an image
   - Click to browse files
   - Or paste from clipboard (Cmd/Ctrl + V)

4. **Generate Code**
   - Click "Generate Code"
   - Wait 5-10 seconds for AI processing

5. **Export Your Component**
   - Copy to clipboard
   - Download as a file
   - Integrate into your project

## 📁 Project Structure

```
devcanvas/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # Claude API integration
│   ├── generator/
│   │   └── page.tsx               # Main generator interface
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── components/                    # Reusable components (empty for now)
├── lib/
│   └── utils.ts                   # Utility functions
├── public/                        # Static assets
├── .env.local.example             # Environment variables template
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🎨 Customization

### Modify the Landing Page

Edit `app/page.tsx` to customize:
- Hero section text and CTAs
- Feature cards
- Stats and metrics
- Color scheme
- Animations

### Adjust AI Prompts

Edit `app/api/generate/route.ts` to fine-tune code generation:
- Modify `PROMPTS` object for each framework
- Add custom requirements
- Change code style preferences
- Add new frameworks

### Update Styling

Edit `app/globals.css` or `tailwind.config.js`:
- Color palette
- Animations
- Typography
- Custom components

## 🔧 Advanced Configuration

### Add More Frameworks

1. Update the `Framework` type in `app/generator/page.tsx`
2. Add new prompt in `app/api/generate/route.ts`
3. Update framework selector UI

### Implement User Authentication

1. Install Clerk or NextAuth.js
2. Protect the generator route
3. Add usage limits per user
4. Track generated components

### Add Database Storage

1. Install Prisma or Drizzle ORM
2. Create component history schema
3. Save generated components
4. Build component library UI

### Monetization

1. Install Stripe
2. Create pricing tiers
3. Implement usage limits
4. Add payment gateway

## 📊 API Routes

### POST /api/generate

Generate code from a screenshot.

**Request Body:**
```json
{
  "image": "data:image/png;base64,...",
  "framework": "react" | "vue" | "html"
}
```

**Response:**
```json
{
  "code": "// Generated component code..."
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## 🎯 How the AI Works

### Prompt Engineering

The API uses carefully crafted prompts for each framework:

**React Prompt:**
- Requests functional components with hooks
- Specifies TypeScript and Tailwind CSS
- Emphasizes responsive design
- Requires accessibility attributes

**Vue Prompt:**
- Requests Composition API with `<script setup>`
- Specifies proper SFC structure
- Same quality requirements as React

**HTML Prompt:**
- Requests semantic HTML5
- Includes Tailwind CDN
- Mobile-first responsive design

### Code Quality

Generated code includes:
- ✅ Semantic HTML elements
- ✅ Proper TypeScript types (React/Vue)
- ✅ Tailwind utility classes (no custom CSS)
- ✅ Responsive design (mobile-first)
- ✅ Accessibility attributes
- ✅ Clean, maintainable structure
- ✅ Helpful comments

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add `ANTHROPIC_API_KEY` environment variable
4. Deploy

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Add environment variables in Netlify dashboard

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Metrics to Track

For your resume, track these impressive metrics:

- **Components Generated**: Total count
- **Accuracy Rate**: % of usable components
- **Users**: Number of unique users
- **GitHub Stars**: Social proof
- **API Response Time**: Performance metric
- **Code Quality Score**: Automated testing

## 💡 Tips for Interviews

When discussing this project:

1. **Explain the Architecture**
   - Next.js App Router
   - Server-side API route for security
   - Claude Vision API integration

2. **Highlight Technical Challenges**
   - Prompt engineering for consistent output
   - Base64 image handling
   - Code parsing and cleanup
   - Performance optimization

3. **Discuss Trade-offs**
   - Why Claude over GPT-4V
   - Why Tailwind over custom CSS
   - Why Next.js over pure React

4. **Show Growth Metrics**
   - User acquisition strategy
   - Conversion rates
   - Viral coefficient

## 🤝 Contributing

This is your personal project for your resume, but you can:
- Open source it on GitHub
- Accept contributions
- Build a community
- Create documentation

## 📄 License

MIT License - Free to use for your portfolio/resume

## 🎓 Learning Resources

Built with:
- [Next.js 14 Docs](https://nextjs.org/docs)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 📞 Support

For issues or questions:
- Check the Claude API docs
- Review Next.js documentation
- Search Stack Overflow
- Open a GitHub issue (if open source)

## 🎯 Roadmap

Future features to add:
- [ ] Component library/history
- [ ] Multi-image upload
- [ ] Live preview of generated components
- [ ] Export to CodeSandbox/StackBlitz
- [ ] Team collaboration features
- [ ] Figma plugin
- [ ] CLI tool
- [ ] VS Code extension

## 🏆 Success Metrics for Resume

Target achievements:
- ✅ 1,000+ components generated
- ✅ 500+ GitHub stars
- ✅ 100+ active users
- ✅ Featured on ProductHunt
- ✅ 90%+ code accuracy
- ✅ Sub-10s generation time
- ✅ $500+ MRR (if monetized)

---

**Made with 💜 by [Saif]**

*Turning screenshots into production-ready code, one pixel at a time.*
