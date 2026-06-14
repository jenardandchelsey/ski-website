import './globals.css';

export const metadata = {
  title: 'SKI | Swedish Kitchen Installers',
  description: 'Professional IKEA kitchen installation in Kansas City.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
