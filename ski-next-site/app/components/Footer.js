import Link from 'next/link';
import { serviceAreas } from '../data';

export default function Footer(){
  return <footer className="footer">
    <div><h3>SKI | Swedish Kitchen Installers</h3><p>We are the “KEA” to unlocking your new kitchen.</p><p className="muted">Phone, email, business hours, insurance details, and domain information can be added once finalized.</p></div>
    <div><h4>Services</h4><Link href="/services/ikea-kitchen-installation">IKEA Kitchen Installation</Link><Link href="/services/closets-wardrobes">Closets & Wardrobes</Link><Link href="/services/ikea-systems">IKEA Systems</Link><Link href="/services/design-inventory-management">Design & Inventory</Link></div>
    <div><h4>Service Areas</h4>{serviceAreas.slice(0,5).map(a=><Link key={a.slug} href={a.slug}>{a.city}</Link>)}<Link href="/service-areas">View all areas</Link></div>
  </footer>
}
