# The One Percent That Matters

A cutting-edge Next.js application showcasing advanced parallax scrolling effects, premium UI/UX design, and industry-leading performance optimizations.

## 🚀 Features

- **Advanced Parallax Scrolling**: GPU-optimized parallax effects with spring physics
- **Premium UI/UX**: Modern design with smooth animations and interactions
- **Performance Optimized**: Industry-leading performance with advanced optimizations
- **Responsive Design**: Fully responsive across all devices
- **TypeScript**: Full TypeScript support for better development experience
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first CSS framework

## 🛠️ Tech Stack

- **Framework**: Next.js 14.0.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-one-percent-that-matters
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

### Option 2: Deploy via GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

### Option 3: Deploy via Vercel Dashboard

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Upload to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Create new project
   - Upload the `.next` folder and `package.json`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run analyze` - Analyze bundle size
- `npm run clean` - Clean build artifacts

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ComparisonSplit.tsx
│   ├── FinalCTA.tsx
│   ├── HeroSection.tsx
│   ├── ParallaxContainer.tsx
│   ├── PerformanceMonitor.tsx
│   ├── ProblemSection.tsx
│   ├── ShuftiDifference.tsx
│   └── WhitepaperPreview.tsx
├── hooks/              # Custom React hooks
│   ├── useAdvancedParallax.ts
│   └── useScrollOptimization.ts
├── lib/                # Utility functions
│   └── utils.ts
├── pages/              # Next.js pages
│   ├── _app.tsx
│   └── index.tsx
└── styles/             # Global styles
    └── globals.css
```

## ⚡ Performance Optimizations

- **GPU Acceleration**: All animations use GPU-accelerated transforms
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: WebP and AVIF format support
- **Bundle Optimization**: Optimized webpack configuration
- **Caching**: Strategic caching headers for static assets
- **Minification**: SWC minification for faster builds

## 🔒 Security Features

- **Security Headers**: XSS protection, frame options, content type options
- **CSP**: Content Security Policy for SVG images
- **Permissions Policy**: Restricted camera, microphone, and geolocation access

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🌐 Environment Variables

No environment variables are required for basic functionality. If you need to configure Firebase or other services, create a `.env.local` file:

```env
# Firebase Configuration (if needed)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For any issues or questions, please contact the development team.

---

**Built with ❤️ using Next.js and Vercel** 