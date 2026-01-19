export const defaultSEO = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Portfolio - Modern Web Developer',
  description: 'Professional portfolio showcasing modern web development projects, skills, and experience.',
  keywords: 'portfolio, web developer, react, next.js, javascript, frontend, fullstack',
  author: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourportfolio.com',
    siteName: 'Portfolio',
    title: 'Portfolio - Modern Web Developer',
    description: 'Professional portfolio showcasing modern web development projects, skills, and experience.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio - Modern Web Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Modern Web Developer',
    description: 'Professional portfolio showcasing modern web development projects, skills, and experience.',
    images: ['/images/og-image.jpg'],
  },
};

export const generatePageSEO = (pageData) => ({
  ...defaultSEO,
  title: `${pageData.title} | Portfolio`,
  description: pageData.description,
  openGraph: {
    ...defaultSEO.openGraph,
    title: `${pageData.title} | Portfolio`,
    description: pageData.description,
  },
  twitter: {
    ...defaultSEO.twitter,
    title: `${pageData.title} | Portfolio`,
    description: pageData.description,
  },
});



