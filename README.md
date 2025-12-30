# Modern Portfolio Website

A stunning, modern portfolio website built with Next.js 15, featuring advanced animations, responsive design, and live email functionality.

## 🚀 Features

- **Modern Design**: Beautiful, responsive design with Tailwind CSS and DaisyUI
- **Advanced Animations**: Smooth animations with Framer Motion and GSAP
- **Live Email Integration**: Contact form with live email sending capabilities
- **SEO Optimized**: Built-in SEO optimization and meta tags
- **Performance Optimized**: Fast loading with Next.js 15 and optimized images
- **Dark Mode Support**: Automatic dark/light mode switching
- **Mobile First**: Fully responsive design for all devices

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Animations**: Framer Motion + GSAP + ScrollTrigger
- **Icons**: Heroicons
- **Email**: EmailJS + Nodemailer
- **Fonts**: Inter + Poppins (Google Fonts)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_EMAIL=your-contact-email@gmail.com

# EmailJS Configuration (Alternative)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Getting Started

1. **Development Server**:
```bash
npm run dev
```

2. **Build for Production**:
```bash
npm run build
```

3. **Start Production Server**:
```bash
npm start
```

## 📧 Email Configuration

### Option 1: Using API Route (Recommended)
1. Set up your email credentials in `.env.local`
2. The contact form will use the `/api/send-email` route
3. Configure your email service (Gmail, Outlook, etc.)

### Option 2: Using EmailJS
1. Create an EmailJS account
2. Set up your service and template
3. Add your EmailJS credentials to `.env.local`
4. The form will automatically use EmailJS

## 🎨 Customization

### Colors and Themes
Edit `tailwind.config.js` to customize:
- Primary colors
- Accent colors
- Dark/light themes
- Custom animations

### Content
Update the following files with your information:
- `src/app/page.js` - Homepage content
- `src/app/about/page.js` - About page content
- `src/app/projects/page.js` - Projects and portfolio
- `src/app/contact/page.js` - Contact information

### Images
Add your images to the `public/images/` directory:
- `project1.jpg` - Project screenshots
- `project2.jpg`
- `project3.jpg`
- etc.

## 📱 Pages

- **Home** (`/`) - Hero section, skills, featured projects
- **About** (`/about`) - Personal story, timeline, values
- **Projects** (`/projects`) - Portfolio with filtering and search
- **Contact** (`/contact`) - Contact form with live email

## 🎭 Animations

The website includes various animations:
- **Page Transitions**: Smooth page-to-page transitions
- **Scroll Animations**: Elements animate as they come into view
- **Hover Effects**: Interactive hover animations
- **Loading Animations**: Smooth loading states
- **GSAP Timeline**: Complex animation sequences

## 🔧 Performance

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic code splitting
- **Lazy Loading**: Images and components load on demand
- **Bundle Analysis**: Optimized bundle size

## 📈 SEO Features

- **Meta Tags**: Dynamic meta tags for each page
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Rich snippets for search engines
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Configure environment variables

### Other Platforms
The project can be deployed to any platform that supports Node.js:
- Railway
- DigitalOcean
- AWS
- Google Cloud

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you have any questions or need help:
1. Check the documentation
2. Open an issue on GitHub
3. Contact me through the website

## 🔄 Updates

Stay updated with the latest features:
- Follow the repository
- Watch for releases
- Check the changelog

---

Built with ❤️ using Next.js, Tailwind CSS, and modern web technologies.