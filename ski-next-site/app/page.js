import Image from 'next/image';
import { CheckCircle, Upload, CalendarCheck, Hammer, MapPin, Star, ShieldCheck, Clock3, PackageCheck } from 'lucide-react';

const services = [
  ['IKEA Kitchen Installation', 'Professional installation for IKEA kitchen systems, cabinets, panels, trim, drawers, doors, and finishing details.'],
  ['IKEA Design Support', 'Practical design support to help your IKEA plans become installation-ready before work begins.'],
  ['Closets & Wardrobes', 'Installation for IKEA closets, wardrobes, storage systems, and customized organization setups.'],
  ['Inventory Management', 'We help review, organize, and verify IKEA components so missing pieces do not slow your project down.'],
  ['Other IKEA Systems', 'Assembly and installation support for additional IKEA systems throughout your home or investment property.'],
  ['Project Coordination', 'A simple process from plan upload to quote, scheduling, installation, and final walkthrough.'],
];

const faqs = [
  ['Do you only install IKEA products?', 'Yes. SKI focuses on IKEA kitchens, closets, wardrobes, and other IKEA systems so we can deliver consistent, specialized service.'],
  ['What areas do you serve?', 'We serve the Kansas City metro area and Lawrence.'],
  ['Can I upload my IKEA kitchen plan?', 'Yes. The quote form is built around uploading your IKEA kitchen plan so we can review the scope and provide a free quote.'],
  ['Are you insured?', 'Insurance details will be added once the company registration and insurance setup are complete.'],
  ['Do you provide design services?', 'Yes. We provide design support focused on IKEA systems and installation readiness.'],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a href="#home" className="brand">
          <Image src="/ski-logo.png" alt="SKI Swedish Kitchen Installers logo" width={154} height={120} priority />
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#gallery">Gallery</a>
          <a href="#areas">Areas</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="nav-cta" href="#quote">Upload Plan</a>
      </header>

      <section id="home" className="hero">
        <div className="hero-copy">
          <p className="eyebrow">KC Metro & Lawrence IKEA Installation Specialists</p>
          <h1>We are the “KEA” to unlocking your new kitchen.</h1>
          <p className="hero-text">Simple, trustworthy installation for IKEA kitchens, closets, wardrobes, and home systems. Upload your IKEA plan and we’ll help turn the boxes into a finished space.</p>
          <div className="hero-actions">
            <a className="primary-btn" href="#quote">Upload Your Kitchen Plan for a Free Quote</a>
            <a className="secondary-btn" href="#services">View Services</a>
          </div>
          <div className="trust-row">
            <span><ShieldCheck size={18}/> Insured/professional installation</span>
            <span><Clock3 size={18}/> Fast turnaround</span>
            <span><MapPin size={18}/> Local KC service</span>
          </div>
        </div>
        <div className="hero-card">
          <div className="mock-kitchen">
            <div className="cabinet top"></div><div className="cabinet top small"></div><div className="cabinet top"></div>
            <div className="counter"></div>
            <div className="cabinet base"></div><div className="cabinet base wide"></div>
          </div>
          <div className="quote-chip"><Star size={18}/> IKEA expertise without the guesswork</div>
        </div>
      </section>

      <section className="stats">
        <div><strong>100%</strong><span>IKEA-focused</span></div>
        <div><strong>2</strong><span>Service regions</span></div>
        <div><strong>Fast</strong><span>Quote process</span></div>
        <div><strong>Local</strong><span>KC owned</span></div>
      </section>

      <section id="services" className="section">
        <p className="eyebrow">What We Install</p>
        <h2>IKEA installation services built around your project.</h2>
        <div className="cards">
          {services.map(([title, text]) => (
            <article className="card" key={title}>
              <CheckCircle />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="process" className="section split-section">
        <div>
          <p className="eyebrow">Simple Process</p>
          <h2>From IKEA plan to finished installation.</h2>
          <p>SKI keeps the process clear so you know what is happening before, during, and after installation.</p>
        </div>
        <div className="steps">
          <div><Upload/><h3>1. Upload Your Plan</h3><p>Send your IKEA kitchen, closet, wardrobe, or system plan through the quote form.</p></div>
          <div><PackageCheck/><h3>2. Inventory Review</h3><p>We review your project scope and help identify inventory needs before scheduling.</p></div>
          <div><CalendarCheck/><h3>3. Schedule Installation</h3><p>Once approved, we schedule your installation and prepare for the job.</p></div>
          <div><Hammer/><h3>4. Install & Walkthrough</h3><p>We complete the installation and review the finished work with you.</p></div>
        </div>
      </section>

      <section id="gallery" className="section gallery-section">
        <p className="eyebrow">Project Gallery</p>
        <h2>Gallery placeholders ready for your first projects.</h2>
        <div className="gallery">
          {['Kitchen Install', 'Closet System', 'Wardrobe Build', 'Storage System', 'Finish Details', 'Before & After'].map((item) => (
            <div className="gallery-tile" key={item}><span>{item}</span></div>
          ))}
        </div>
      </section>

      <section className="section testimonials">
        <p className="eyebrow">Reviews</p>
        <h2>Testimonials will appear here as your customer base grows.</h2>
        <div className="testimonial-grid">
          <blockquote>“Placeholder customer review for a clean, professional IKEA kitchen installation.”<cite>Future SKI Customer</cite></blockquote>
          <blockquote>“Placeholder review highlighting communication, speed, and attention to detail.”<cite>Future SKI Customer</cite></blockquote>
          <blockquote>“Placeholder review for closet, wardrobe, or IKEA storage system installation.”<cite>Future SKI Customer</cite></blockquote>
        </div>
      </section>

      <section id="areas" className="section area-band">
        <MapPin />
        <div>
          <p className="eyebrow">Service Area</p>
          <h2>Kansas City Metro and Lawrence</h2>
          <p>Serving homeowners, landlords, flippers, and property owners across the KC metro and Lawrence area.</p>
        </div>
      </section>

      <section id="faq" className="section faq">
        <p className="eyebrow">FAQ</p>
        <h2>Common questions.</h2>
        {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
      </section>

      <section id="quote" className="section quote-section">
        <div>
          <p className="eyebrow">Free Quote</p>
          <h2>Upload your kitchen plan for a free quote.</h2>
          <p>Contact details are placeholders until your domain, registration, phone, and email are finalized.</p>
        </div>
        <form className="quote-form">
          <input placeholder="Full name" />
          <input placeholder="Email address - placeholder" />
          <input placeholder="Phone number - placeholder" />
          <select defaultValue="">
            <option value="" disabled>Project type</option>
            <option>IKEA Kitchen Installation</option>
            <option>IKEA Design Support</option>
            <option>Closet / Wardrobe</option>
            <option>Other IKEA System</option>
            <option>Inventory Review / Management</option>
          </select>
          <input type="file" aria-label="Upload IKEA plan" />
          <textarea placeholder="Tell us about your project"></textarea>
          <button type="button">Submit Quote Request</button>
        </form>
      </section>

      <footer>
        <Image src="/ski-logo.png" alt="SKI logo" width={115} height={90} />
        <p>SKI — Swedish Kitchen Installers</p>
        <p>Phone: [Placeholder] · Email: [Placeholder] · Domain: [Placeholder]</p>
      </footer>
    </main>
  );
}
