import Image from 'next/image';
import { Award, Star, Clock, ShieldCheck, Wrench, Pencil, Shirt, Grid2X2, ClipboardList, UploadCloud, Check } from 'lucide-react';

const services = [
  { title: 'IKEA KITCHEN\nINSTALLATION', text: 'Professional installation of IKEA kitchens done right the first time.', icon: Wrench, img: '/images/kitchen-install.png' },
  { title: 'DESIGN SERVICES', text: 'Expert design guidance to help you plan the perfect IKEA kitchen.', icon: Pencil, img: '/images/design.png' },
  { title: 'CLOSETS & WARDROBES', text: 'Custom PAX wardrobes, closets, and storage solutions.', icon: Shirt, img: '/images/closets.png' },
  { title: 'IKEA SYSTEMS & MORE', text: 'Entertainment centers, office systems, laundry rooms and more.', icon: Grid2X2, img: '/images/systems.png' },
  { title: 'INVENTORY & PROJECT\nMANAGEMENT', text: 'Inventory management and on-time project coordination.', icon: ClipboardList, img: '/images/inventory.png' },
];

const stats = [
  { value: '500+', label: 'Kitchens Installed', icon: Award },
  { value: '5-Star', label: 'Customer Rating', icon: Star },
  { value: '3-5 Day', label: 'Average Installation', icon: Clock },
  { value: 'Fully Insured', label: 'Peace of Mind', icon: ShieldCheck },
];

export default function Home() {
  return (
    <main>
      <Header />
      <section className="hero" id="home">
        <div className="heroText">
          <h1>EXPERT IKEA KITCHEN INSTALLATION IN KANSAS CITY</h1>
          <p className="tagline">We are the “KEA” to unlocking your new kitchen.</p>
          <ul>
            <li><Check size={18}/> IKEA Kitchen Installation</li>
            <li><Check size={18}/> Closets &amp; Wardrobes</li>
            <li><Check size={18}/> IKEA Systems &amp; More</li>
            <li><Check size={18}/> Design &amp; Inventory Management</li>
            <li><Check size={18}/> Fast Turnaround | Insured | Professional</li>
          </ul>
          <a className="cta heroCta" href="#quote">UPLOAD YOUR KITCHEN PLAN<br />FOR A FREE QUOTE <UploadCloud size={26}/></a>
        </div>
        <div className="heroImageWrap">
          <Image src="/images/hero-kitchen.png" alt="Bright white IKEA style kitchen" fill priority className="heroImage" />
        </div>
      </section>
      <Stats />
      <Services />
      <Gallery />
      <Process />
      <Quote />
    </main>
  );
}

function Header(){
  return <header className="siteHeader">
    <a className="brand" href="#home"><Image src="/images/logo.png" alt="SKI Swedish Kitchen Installers" width={240} height={90}/></a>
    <nav>
      <a href="#home">HOME</a><a href="#services">SERVICES</a><a href="#gallery">GALLERY</a><a href="#areas">SERVICE AREAS</a><a href="#about">ABOUT</a><a href="#faq">FAQ</a><a href="#contact">CONTACT</a>
    </nav>
    <a className="topButton" href="#quote">UPLOAD YOUR PLAN</a>
  </header>
}

function Stats(){
  return <section className="statsBand">
    {stats.map(({value,label,icon:Icon})=><div className="stat" key={value}><Icon size={56}/><div><strong>{value}</strong><span>{label}</span></div></div>)}
  </section>
}

function Services(){
  return <section className="section" id="services">
    <h2>OUR SERVICES</h2>
    <p className="sectionSub">Specializing in IKEA solutions for every room in your home.</p>
    <div className="serviceGrid">
      {services.map(({title,text,icon:Icon,img})=><article className="card" key={title}>
        <div className="cardImage"><Image src={img} alt={title.replace('\n',' ')} fill /></div>
        <div className="iconBadge"><Icon size={34}/></div>
        <h3>{title.split('\n').map((t,i)=><span key={i}>{t}{i<title.split('\n').length-1 && <br/>}</span>)}</h3>
        <p>{text}</p>
      </article>)}
    </div>
  </section>
}

function Gallery(){
  const imgs=['kitchen-install.png','design.png','systems.png','inventory.png','kitchen-install.png','closets.png'];
  return <section className="section gallery" id="gallery"><h2>RECENT PROJECTS</h2><p className="sectionSub">Beautiful results. Professional installation.</p><div className="galleryGrid">{imgs.map((img,i)=><div className="galleryTile" key={i}><Image src={`/images/${img}`} alt="SKI project placeholder" fill /></div>)}</div><a className="smallCta" href="#quote">VIEW FULL GALLERY</a></section>
}

function Process(){
  return <section className="process" id="about"><h2>OUR SIMPLE PROCESS</h2><p>From your IKEA plan to a kitchen you'll love.</p><div className="steps"><div><UploadCloud size={42}/><h3>UPLOAD YOUR PLAN</h3><p>Upload your IKEA kitchen plan or share your ideas.</p></div><span>›</span><div><ClipboardList size={42}/><h3>GET YOUR QUOTE</h3><p>We review, provide a clear quote, and timeline.</p></div><span>›</span><div><Wrench size={42}/><h3>WE INSTALL</h3><p>Sit back while our experts install to perfection.</p></div></div><a className="cta processCta" href="#quote">UPLOAD YOUR KITCHEN PLAN FOR A FREE QUOTE</a></section>
}

function Quote(){
  return <section className="quote" id="quote"><div><h2>GET YOUR FREE QUOTE</h2><p>Upload your IKEA plan and we’ll take it from there.</p><ol><li><b>Upload your plan</b><span>PDF, PNG, JPG, or room photos.</span></li><li><b>We review & quote</b><span>You receive a clear, no-obligation quote.</span></li><li><b>Schedule installation</b><span>Once approved, we schedule your installation.</span></li></ol></div><form><h3>UPLOAD YOUR KITCHEN PLAN</h3><label className="uploadBox"><UploadCloud size={50}/><strong>Drag & drop your files here</strong><span>or click to browse</span><input type="file" multiple /></label><input placeholder="Full Name"/><input placeholder="Email Address"/><input placeholder="Phone Number"/><select defaultValue=""><option value="" disabled>Service Area</option><option>Kansas City Metro</option><option>Lawrence</option></select><textarea placeholder="Project Details / Notes" rows="5"/><button type="button">GET MY FREE QUOTE</button></form></section>
}
