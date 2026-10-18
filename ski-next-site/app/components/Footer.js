import Link from 'next/link';
import { contactDetails, serviceAreas } from '../data';

export default function Footer(){
  return <footer className="footer">
    <div><h3>SKI | Swedish Kitchen Installers</h3><p>We are the &quot;KEA&quot; to unlocking your new kitchen.</p><p className="muted">Serving the Kansas City metro and Lawrence area.</p><div className="footerContact" data-nosnippet><a href={contactDetails.phoneHref}>{contactDetails.phone}</a><a href={contactDetails.emailHref}>{contactDetails.email}</a></div><p className="muted">IKEA<sup className="trademarkMark">&reg;</sup> is a registered trademark of Inter IKEA Systems B.V. SKI (Swedish Kitchen Installers) is an independent company and is not affiliated with, endorsed by, or sponsored by Inter IKEA Systems B.V.</p></div>
    <div><h4>Services</h4><Link href="/services/full-service-kitchen-prep">Full-Service Kitchen Prep</Link><Link href="/services/ikea-kitchen-installation">IKEA Kitchen Installation</Link><Link href="/services/closets-wardrobes">Closets & Wardrobes</Link><Link href="/services/ikea-systems">IKEA Systems</Link><Link href="/services/design-inventory-management">Design & Inventory</Link></div>
    <div><h4>Service Areas</h4>{serviceAreas.slice(0,5).map(a=><Link key={a.slug} href={a.slug}>{a.city}</Link>)}<Link href="/service-areas">View all areas</Link></div>
    <div className="footerTerms" aria-labelledby="footer-terms-title">
      <h4 id="footer-terms-title">Terms &amp; Conditions</h4>
      <div className="footerTermsLinks">
        <a href="/terms-and-conditions/cabinet-installation" >Cabinet Installation</a>
        <a href="/terms-and-conditions/prep-demolition" >Prep &amp; Demolition</a>
      </div>
    </div>
  </footer>
}
