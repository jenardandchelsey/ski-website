import Image from 'next/image';
import Link from 'next/link';

export default function Header(){
  return <header className="siteHeader">
    <Link className="brand" href="/"><Image src="/images/logo.png" alt="SKI Swedish Kitchen Installers" width={280} height={105} priority /></Link>
    <nav>
      <Link href="/services">SERVICES</Link><Link href="/process">PROCESS</Link><Link href="/gallery">GALLERY</Link><Link href="/service-areas">AREAS</Link><Link href="/about">ABOUT</Link><Link href="/faq">FAQ</Link><Link href="/contact">CONTACT</Link>
    </nav>
    <Link className="topButton" href="/quote">UPLOAD PLAN</Link>
  </header>
}
