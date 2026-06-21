import './globals.css';
import './calculator.css';
import './quote-form.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  metadataBase: new URL('https://swedishkitcheninstallers.com'),
  title: 'SKI | Swedish Kitchen Installers',
  description: 'IKEA kitchen, closet, wardrobe, and home system installation in Kansas City.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'SKI | Swedish Kitchen Installers',
    description: 'IKEA-focused installation serving the Kansas City metro and Lawrence area.',
    url: 'https://swedishkitcheninstallers.com',
    siteName: 'Swedish Kitchen Installers',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
