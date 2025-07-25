# Marrakech Reviews

A modern, responsive website that aggregates reviews from Google, Airbnb, and TripAdvisor for restaurants, riads, activities, and attractions in Marrakech, Morocco.

## 🌟 Features

- **Review Aggregation**: Focuses on TripAdvisor reviews
- **Modern Design**: Inspired by Marrakech's warm colors with a contemporary twist
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Subtle motion effects using Framer Motion
- **SEO Optimized**: Complete meta tags, structured data, and social sharing
- **Performance Focused**: Built with Vite for fast loading and optimal performance

## 🎨 Design System

### Color Palette
- **Primary**: Warm ochre/terracotta (`oklch(0.55 0.15 35)`)
- **Secondary**: Deep red/brown (`oklch(0.35 0.12 15)`)
- **Accent**: Mint green (`oklch(0.65 0.12 160)`)

### Typography
- Clean, modern sans-serif fonts for optimal readability
- Hierarchical text sizing for clear information architecture

## 🚀 Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom color scheme
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready configuration

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd marrakech-reviews
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🌐 Deployment to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. Push your code to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect the framework and deploy

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to configure your deployment

### Environment Variables (if needed)
If you plan to integrate with actual APIs, add these to your Vercel project:
- `VITE_GOOGLE_PLACES_API_KEY`
- `VITE_TRIPADVISOR_API_KEY`
- `VITE_AIRBNB_API_KEY`

## 📁 Project Structure

```
marrakech-reviews/
├── public/
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AnimatedSection.jsx
│   │   ├── AnimatedCounter.jsx
│   │   ├── Header.jsx
│   │   ├── HeroAnimated.jsx
│   │   ├── Categories.jsx
│   │   ├── FeaturedPlaces.jsx
│   │   ├── ReviewOfTheDay.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vercel.json
├── package.json
└── README.md
```

## 🔧 Customization

### Adding New Sections
1. Create a new component in `src/components/`
2. Import and add it to `App.jsx`
3. Wrap with `AnimatedSection` for smooth animations

### Modifying Colors
Update the CSS custom properties in `src/App.css`:
```css
:root {
  --primary: oklch(0.55 0.15 35); /* Your primary color */
  --secondary: oklch(0.35 0.12 15); /* Your secondary color */
  --accent: oklch(0.65 0.12 160); /* Your accent color */
}
```

### API Integration
To connect with real APIs:
1. Create API service files in `src/services/`
2. Add environment variables for API keys
3. Update components to fetch real data
4. Implement error handling and loading states

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance

- Lazy loading for images
- Code splitting with Vite
- Optimized animations with Framer Motion
- Minimal bundle size with tree shaking

## 🔍 SEO Features

- Complete meta tags for social sharing
- Structured data (JSON-LD)
- Semantic HTML structure
- Optimized images with alt text
- Clean URLs and navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by the beautiful city of Marrakech
- Built with modern web technologies
- Designed for optimal user experience
- Ready for production deployment

---

**Note**: This is a demo website. For production use with real review data, you'll need to implement proper API integrations and handle rate limiting, caching, and data privacy considerations according to each platform's terms of service.

