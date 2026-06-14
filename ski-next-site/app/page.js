import Image from 'next/image';
import { Award, Star, Clock3, ShieldCheck, UploadCloud, FileText, Wrench, PenTool, Shirt, Grid3X3, ClipboardCheck, ArrowRight, Menu, Check } from 'lucide-react';

const services = [
  { title: 'IKEA Kitchen Installation', text: 'Professional installation of IKEA kitchens done right the first time.', icon: Wrench, img: '/service-kitchen.png' },
  { title: 'Design Services', text: 'Expert design guidance to help you plan the perfect IKEA kitchen.', icon: PenTool, img: '/service-design.png' },
  { title: 'Closets & Wardrobes', text: 'Custom PAX wardrobes, closets, and storage solutions.', icon: Shirt, img: '/service-closet.png' },
  { title: 'IKEA Systems & More', text: 'Office systems, laundry rooms, media centers, and more.', icon: Grid3X3, img: '/service-systems.png' },
  { title: 'Inventory & Project Management', text: 'Inventory management and on-time project coordination.', icon: ClipboardCheck, img: '/service-inventory.png' },
];

const gallery = ['/gallery-1.png','/gallery-2.png','/gallery-3.png','/gallery-4.png','/gallery-5.png','/gallery-6.png','/gallery-7.png','/gallery-8.png'];

const faqs = [
  ['Do you only install IKEA systems?', 'Yes. SKI focuses on IKEA kitchens, closets, wardrobes, and other IKEA systems. This specialization helps us move faster and deliver a more consistent installation experience.'],
  ['What areas do you serve?', 'We serve the Kansas City Metro and Lawrence. Local service-area pages can be added as the business grows.'],
  ['Can I upload my IKEA kitchen plan?', 'Yes. The quote form is designed for customers to upload their IKEA plan, photos, and basic project details.'],
  ['Are you insured?', 'Yes. The site includes professional and insured positioning. Final insurance details can be added once your policy is issued.'],
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="logoWrap" href="#home"><Image src="/ski-logo.png" alt="SKI Swedish Kitchen Installers" width={145} height={95} priority /></a>
        <nav className="navLinks">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#areas">Service Areas</a>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <a href="#quote">Contact</a>
        </nav>
        <a className="navButton" href="#quote">Upload Your Plan</a>
        <button className="mobileMenu" aria-label="Open menu"><Menu /></button>
      </header>

      <section id="home" className="hero">
        <div className="heroCopy">
          <h1>Expert IKEA Kitchen Installation in Kansas City</h1>
          <p className="tagline">We are the “KEA” to unlocking your new kitchen.</p>
          <ul className="heroList">
            <li><Check /> IKEA Kitchen Installation</li>
            <li><Check /> Closets & Wardrobes</li>
            <li><Check /> IKEA Systems & More</li>
            <li><Check /> Design & Inventory Management</li>
            <li><Check /> Fast Turnaround | Insured | Professional</li>
          </ul>
          <a className="goldButton large" href="#quote">Upload Your Kitchen Plan for a Free Quote <UploadCloud size={25}/></a>
        </div>
        <div className="heroImage"><Image src="/hero-kitchen.png" alt="Bright modern IKEA style kitchen" fill priority /></div>
      </section>

      <section className="statsBand">
        <div><Award /><strong>500+</strong><span>Kitchens Installed</span></div>
        <div><Star /><strong>5-Star</strong><span>Customer Rating</span></div>
        <div><Clock3 /><strong>3-5 Day</strong><span>Average Installation</span></div>
        <div><ShieldCheck /><strong>Fully Insured</strong><span>Peace of Mind</span></div>
      </section>

      <section id="services" className="section servicesSection">
        <div className="sectionTitle"><h2>Our Services</h2><p>Specializing in IKEA solutions for every room in your home.</p></div>
        <div className="serviceCards">
          {services.map(({ title, text, icon: Icon, img }) => (
            <article className="serviceCard" key={title}>
              <div className="servicePhoto"><Image src={img} alt="" fill /></div>
              <div className="serviceIcon"><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="section gallerySection">
        <div className="sectionTitle"><h2>Recent Projects</h2><p>Beautiful results. Professional installation.</p></div>
        <div className="galleryGrid">
          {gallery.map((img, i) => <div className="galleryTile" key={img}><Image src={img} alt={`SKI project placeholder ${i + 1}`} fill /></div>)}
        </div>
        <a className="goldButton centered" href="#gallery">View Full Gallery</a>
      </section>

      <section className="processBand">
        <div className="sectionTitle light"><h2>Our Simple Process</h2><p>From your IKEA plan to a kitchen you’ll love.</p></div>
        <div className="processSteps">
          <div><span>1</span><UploadCloud /><h3>Upload Your Plan</h3><p>Upload your IKEA kitchen plan or share your ideas.</p></div>
          <div className="arrow">›</div>
          <div><span>2</span><FileText /><h3>Get Your Quote</h3><p>We review, provide a clear quote and timeline.</p></div>
          <div className="arrow">›</div>
          <div><span>3</span><Wrench /><h3>We Install</h3><p>Sit back while our experts install to perfection.</p></div>
        </div>
        <a className="goldButton processButton" href="#quote">Upload Your Kitchen Plan for a Free Quote <UploadCloud size={22}/></a>
      </section>

      <section id="about" className="section splitInfo">
        <div>
          <p className="eyebrow">Why SKI</p>
          <h2>KC-local IKEA expertise with a process-driven install model.</h2>
          <p>SKI is built around simple communication, fast turnaround, professional installation, and clean project coordination. We focus only on IKEA systems so every quote, inventory review, and install process is designed around the product you already chose.</p>
        </div>
        <div className="infoList">
          <p><strong>IKEA expertise:</strong> Kitchens, PAX wardrobes, closets, storage, and other IKEA systems.</p>
          <p><strong>Fast turnaround:</strong> Offsite planning and inventory review help reduce delays.</p>
          <p><strong>Professional:</strong> Placeholder insurance, phone, and email details can be added before launch.</p>
        </div>
      </section>

      <section id="areas" className="areaStrip">
        <h2>Serving Kansas City Metro & Lawrence</h2>
        <p>Kansas City, Overland Park, Olathe, Lee’s Summit, Lenexa, Shawnee, Lawrence, and nearby communities.</p>
      </section>

      <section className="section testimonials">
        <div className="sectionTitle"><h2>What Customers Will Say</h2><p>Review placeholders until your first SKI projects are complete.</p></div>
        <div className="testimonialGrid">
          <blockquote>“Professional, organized, and the kitchen came together faster than expected.”<cite>Future SKI Customer</cite></blockquote>
          <blockquote>“The upload process made it easy to get a quote and schedule installation.”<cite>Future SKI Customer</cite></blockquote>
          <blockquote>“Great communication and a clean finished IKEA install.”<cite>Future SKI Customer</cite></blockquote>
        </div>
      </section>

      <section id="faq" className="section faqSection">
        <div className="sectionTitle"><h2>FAQ</h2><p>Helpful answers for new customers.</p></div>
        <div className="faqList">{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>

      <section id="quote" className="section quoteSection">
        <div className="quoteCopy">
          <h2>Get Your Free Quote</h2>
          <p>Upload your IKEA plan and we’ll take it from there.</p>
          <div className="quoteSteps"><span>1</span><div><h3>Upload Your Plan</h3><p>Upload your IKEA kitchen plan in PDF or image format.</p></div></div>
          <div className="quoteSteps"><span>2</span><div><h3>We Review & Quote</h3><p>We review your plan and send a clear, no-obligation quote.</p></div></div>
          <div className="quoteSteps"><span>3</span><div><h3>Schedule Installation</h3><p>Once approved, we schedule your installation.</p></div></div>
        </div>
        <form className="quoteForm">
          <h3>Upload Your Kitchen Plan</h3>
          <label className="dropZone"><UploadCloud /><strong>Drag & drop your files here</strong><span>PDF, JPG, PNG up to 25MB</span><input type="file" multiple /></label>
          <input placeholder="Full Name" />
          <input placeholder="Email Address" />
          <input placeholder="Phone Number" />
          <select defaultValue=""><option value="" disabled>Service Area</option><option>Kansas City Metro</option><option>Lawrence</option></select>
          <textarea placeholder="Project Details / Notes" />
          <button type="button">Get My Free Quote</button>
        </form>
      </section>

      <footer>
        <Image src="/ski-logo.png" alt="SKI" width={110} height={80} />
        <p>SKI | Swedish Kitchen Installers</p>
        <p>Phone: [Placeholder] · Email: [Placeholder] · Domain: [Placeholder]</p>
      </footer>
    </main>
  );
}
