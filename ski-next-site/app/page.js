import Image from 'next/image';
import Link from 'next/link';
import { UploadCloud, Check } from 'lucide-react';
import { Stats, ServicesGrid, GalleryPreview, ProcessSection, QuoteSection, AreasPreview, FAQPreview, WhySKI } from './components/Sections';

export default function Home() {
  return <main>
    <section className="hero" id="home">
      <div className="heroText">
        <h1>EXPERT IKEA KITCHEN<br />INSTALLATION IN<br />KANSAS CITY</h1>
        <p className="tagline">We are the “KEA” to unlocking your new kitchen.</p>
        <ul><li><Check size={18}/> IKEA Kitchen Installation</li><li><Check size={18}/> Closets &amp; Wardrobes</li><li><Check size={18}/> IKEA Systems &amp; More</li><li><Check size={18}/> Design &amp; Inventory Management</li><li><Check size={18}/> Organized | Local | Professional</li></ul>
        <Link className="cta heroCta" href="/quote">UPLOAD YOUR KITCHEN PLAN<br />FOR A FREE QUOTE <UploadCloud size={26}/></Link>
      </div>
      <div className="heroImageWrap"><Image src="/images/hero-kitchen.png" alt="Bright white IKEA style kitchen" fill priority className="heroImage" /></div>
    </section>
    <Stats /><ServicesGrid /><WhySKI /><GalleryPreview /><ProcessSection /><AreasPreview /><FAQPreview /><QuoteSection />
  </main>;
}
