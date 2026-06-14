import './globals.css';

export const metadata = {
  title: 'SKI | Swedish Kitchen Installers',
  description: 'KC Metro and Lawrence IKEA kitchen, closet, wardrobe, and IKEA systems installation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
