import Image from 'next/image';
import { Award, Star, Clock3, ShieldCheck, UploadCloud, ClipboardList, Wrench, PenTool, PanelsTopLeft, Shirt, Grid3X3, PackageCheck, ArrowRight, Menu } from 'lucide-react';

const services = [
  { title: 'IKEA KITCHEN INSTALLATION', text: 'Professional installation of IKEA kitchens done right the first time.', icon: Wrench, image: '/kitchen-1.jpg' },
  { title: 'DESIGN SERVICES', text: 'Expert design guidance to help you plan the perfect IKEA kitchen.', icon: PenTool, image: '/kitchen-2.jpg' },
  { title: 'CLOSETS & WARDROBES', text: 'Custom PAX wardrobes, closets, and storage solutions.', icon: Shirt, image: '/kitchen-3.jpg' },
  { title: 'IKEA SYSTEMS & MORE', text: 'Entertainment centers, office systems, laundry rooms and more.', icon: Grid3X3, image: '/kitchen-4.jpg' },
  { title: 'INVENTORY & PROJECT MANAGEMENT', text: 'Inventory management and on-time project coordination.', icon: PackageCheck, image: '/kitchen-5.jpg' }
];

const gallery = Array.from({ length: 10 }, (_, i) => `/gallery-${i + 1}.jpg`);

function Header() {
  return (
    <header className="header">
      <a className="brand" href="#top"><Image src="/ski-logo.png" alt="SKI Swedish Kitchen Installers" width={122} height={104} priority /></a>
      <nav className="nav">
        <a href="#top">HOME</a>
        <a href="#services">SERVICES</a>
        <a href="#gallery">GALLERY</a>
        <a href="#areas">SERVICE AREAS</a>
        <a href="#about">ABOUT</a>
        <a href="#faq">FAQ</a>
        <a href="#quote">CONTACT</a>
      </nav>
      <a className="btn navbtn" href="#quote">UPLOAD YOUR PLAN</a>
      <button className="mobile-menu"><Menu size={30} /></button>
    </header>
  );
}

function Stat({ icon: Icon, big, small }) {
  return <div className="stat"><Icon className="statIcon" size={50}/><div><b>{big}</b><span>{small}</span></div></div>
}

export default function Home() {
  return (
    <main id="top">
      <Header />
      <section className="hero">
        <div className="heroText">
          <h1>EXPERT IKEA KITCHEN INSTALLATION IN KANSAS CITY</h1>
          <p className="tagline">We are the “KEA” to unlocking your new kitchen.</p>
          <ul>
            <li>IKEA Kitchen Installation</li>
            <li>Closets & Wardrobes</li>
            <li>IKEA Systems & More</li>
            <li>Design & Inventory Management</li>
            <li>Fast Turnaround | Insured | Professional</li>
          </ul>
          <a href="#quote" className="btn heroBtn">UPLOAD YOUR KITCHEN PLAN<br/>FOR A FREE QUOTE <UploadCloud size={24}/></a>
        </div>
        <div className="heroImage"><Image src="/hero-kitchen.jpg" alt="Bright modern IKEA kitchen" fill priority /></div>
      </section>

      <section className="stats">
        <Stat icon={Award} big="500+" small="Kitchens Installed" />
        <Stat icon={Star} big="5-Star" small="Customer Rating" />
        <Stat icon={Clock3} big="3-5 Day" small="Average Installation" />
        <Stat icon={ShieldCheck} big="Fully Insured" small="Peace of Mind" />
      </section>

      <section id="services" className="section servicesSection">
        <h2>OUR SERVICES</h2>
        <p className="sub">Specializing in IKEA solutions for every room in your home.</p>
        <div className="cards">
          {services.map(({title,text,icon: Icon,image}) => <article className="card" key={title}>
            <div className="cardImg"><Image src={image} alt={title} fill /></div>
            <div className="circle"><Icon size={26}/></div>
            <h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
      </section>

      <section id="gallery" className="section gallerySection">
        <h2>RECENT PROJECTS</h2>
        <p className="sub">Beautiful results. Professional installation.</p>
        <div className="galleryGrid">{gallery.map((src,i) => <div className="thumb" key={src}><Image src={src} alt={`SKI project ${i+1}`} fill /></div>)}</div>
        <a href="#gallery" className="btn smallBtn">VIEW FULL GALLERY</a>
      </section>

      <section className="process">
        <h2>OUR SIMPLE PROCESS</h2>
        <p>From your IKEA plan to a kitchen you’ll love.</p>
        <div className="steps">
          <div className="step"><span>1</span><div className="stepIcon"><UploadCloud size={42}/></div><h3>UPLOAD YOUR PLAN</h3><p>Upload your IKEA kitchen plan or share your ideas.</p></div>
          <div className="arrow">›</div>
          <div className="step"><span>2</span><div className="stepIcon"><ClipboardList size={42}/></div><h3>GET YOUR QUOTE</h3><p>We review, provide a clear quote and timeline.</p></div>
          <div className="arrow">›</div>
          <div className="step"><span>3</span><div className="stepIcon"><Wrench size={42}/></div><h3>WE INSTALL</h3><p>Sit back while our experts install to perfection.</p></div>
        </div>
        <a href="#quote" className="btn processBtn">UPLOAD YOUR KITCHEN PLAN FOR A FREE QUOTE <UploadCloud size={22}/></a>
      </section>

      <section className="split" id="quote">
        <div className="quoteInfo"><h2>GET YOUR FREE QUOTE</h2><p>Upload your IKEA plan and we’ll take it from there.</p>
          {['UPLOAD YOUR PLAN','WE REVIEW & QUOTE','SCHEDULE INSTALLATION'].map((t,i)=><div className="quoteStep" key={t}><b>{i+1}</b><div><h3>{t}</h3><p>{i===0?'Upload your IKEA kitchen plan in PDF or image format.':i===1?'We review your plan and send a clear, no-obligation quote.':'Once approved, we schedule your installation.'}</p></div></div>)}
        </div>
        <form className="quoteForm"><h3>UPLOAD YOUR KITCHEN PLAN</h3><div className="drop"><UploadCloud size={48}/><b>Drag & drop your files here</b><span>or click to browse<br/>(PDF, JPG, PNG up to 25MB)</span></div><input placeholder="Full Name"/><input placeholder="Email Address"/><input placeholder="Phone Number"/><select><option>Kansas City Metro</option><option>Lawrence</option></select><textarea placeholder="Project Details / Notes"/><button className="btn formBtn">GET MY FREE QUOTE</button></form>
      </section>

      <section id="faq" className="section faq"><h2>FREQUENTLY ASKED QUESTIONS</h2><details open><summary>Do you only install IKEA products?</summary><p>Yes. SKI specializes in IKEA kitchens, closets, wardrobes, and IKEA systems.</p></details><details><summary>Do I need to have my IKEA plan ready?</summary><p>A plan is ideal, but we can help with design guidance and inventory management.</p></details><details><summary>Are you insured?</summary><p>Insurance details will be added once the company setup is complete.</p></details></section>
    </main>
  );
}
