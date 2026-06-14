import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'SKI | Swedish Kitchen Installers',
  description: 'IKEA kitchen, closet, wardrobe, and home system installation in Kansas City.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><Header />{children}<Footer /></body></html>;
}
