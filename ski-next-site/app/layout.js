import './globals.css';
import './calculator.css';
import './quote-form.css';
import './gallery.css';
import './trademark.css';
import './cta-adjustments.css';
import './contact-details.css';
import './area-seo.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  metadataBase: new URL('https://swedishkitcheninstallers.com'),
  title: {
    default: 'IKEA Kitchen & PAX Installers in Kansas City | SKI',
    template: '%s | Swedish Kitchen Installers',
  },
  description: 'Professional IKEA kitchen, cabinet, and PAX wardrobe installation across Kansas City and Lawrence. Upload your plan for a free quote.',
  applicationName: 'Swedish Kitchen Installers',
  category: 'home services',
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/images/ski-favicon.png', type: 'image/png', sizes: '1254x1254' }],
    apple: [{ url: '/images/ski-favicon.png', type: 'image/png', sizes: '1254x1254' }],
  },
  openGraph: {
    title: 'IKEA Kitchen & PAX Installers in Kansas City | SKI',
    description: 'Professional IKEA kitchen, cabinet, and PAX wardrobe installation across Kansas City and Lawrence. Upload your plan for a free quote.',
    siteName: 'Swedish Kitchen Installers',
    type: 'website',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://swedishkitcheninstallers.com/#website',
  url: 'https://swedishkitcheninstallers.com/',
  name: 'Swedish Kitchen Installers',
  alternateName: ['SKI', 'swedishkitcheninstallers.com'],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': 'https://swedishkitcheninstallers.com/#business',
  name: 'Swedish Kitchen Installers',
  alternateName: 'SKI',
  url: 'https://swedishkitcheninstallers.com',
  logo: 'https://swedishkitcheninstallers.com/images/logo.png',
  image: 'https://swedishkitcheninstallers.com/images/homepage-kitchen.jpg',
  email: 'info@ski-kitchens.com',
  telephone: '+1-913-229-4748',
  priceRange: '$$',
  description: 'Professional IKEA kitchen, PAX closet, wardrobe, and home system installation serving the Kansas City metro and Lawrence area.',
  areaServed: [
    'Kansas City, MO', 'Kansas City, KS', 'Overland Park, KS', 'Olathe, KS',
    "Lee's Summit, MO", 'Independence, MO', 'Lawrence, KS',
  ].map((name) => ({ '@type': 'City', name })),
  knowsAbout: [
    'IKEA kitchen installation', 'SEKTION cabinet installation',
    'IKEA PAX wardrobe installation', 'closet system installation',
    'IKEA cabinet assembly', 'IKEA home system installation',
  ],
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c') }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, '\\u003c') }} /><Header />{children}<Footer /></body></html>;
}
