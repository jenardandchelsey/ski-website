import { ChevronDown, CloudUpload, Check, Star, Clock, ShieldCheck, Award, Wrench, Pencil, Hanger, Grid2X2, ClipboardList } from 'lucide-react';

const services = [
  { title: 'IKEA KITCHEN INSTALLATION', text: 'Professional installation of IKEA kitchens done right the first time.', icon: Wrench, img: 'kitchen-a' },
  { title: 'DESIGN SERVICES', text: 'Expert design guidance to help you plan the perfect IKEA kitchen.', icon: Pencil, img: 'kitchen-b' },
  { title: 'CLOSETS & WARDROBES', text: 'Custom PAX wardrobes, closets, and storage solutions.', icon: Hanger, img: 'closet' },
  { title: 'IKEA SYSTEMS & MORE', text: 'Entertainment centers, office systems, laundry rooms and more.', icon: Grid2X2, img: 'kitchen-c' },
  { title: 'INVENTORY & PROJECT MANAGEMENT', text: 'Inventory management and on-time project coordination.', icon: ClipboardList, img: 'kitchen-d' },
];

const stats = [
  { value: '500+', label: 'Kitchens Installed', icon: Award },
  { value: '5-Star', label: 'Customer Rating', icon: Star },
  { value: '3-5 Day', label: 'Average Installation', icon: Clock },
  { value: 'Fully Insured', label: 'Peace of Mind', icon: ShieldCheck },
];

function MiniKitchen({ variant = 'main' }) {
  return <div className={`photo ${variant}`} aria-hidden="true">
    <div className="window"></div><div className="pendant p1"></div><div className="pendant p2"></div>
    <div className="cab upper u1"></div><div className="cab upper u2"></div><div className="cab tall"></div>
    <div className="counter"></div><div className="island"></div><div className="stool s1"></div><div className="stool s2"></div>
  </div>
}

export default function Home() {
  return <main>
    <header className="topbar">
      <div className="logo"><div className="roof">⌂</div><span>SKI</span><small>SWEDISH KITCHEN INSTALLERS</small></div>
      <nav>
        <a>HOME</a><a>SERVICES <ChevronDown size={14}/></a><a>GALLERY</a><a>SERVICE AREAS</a><a>ABOUT</a><a>FAQ</a><a>CONTACT</a>
      </nav>
      <a className="btn small">UPLOAD YOUR PLAN</a>
    </header>

    <section className="hero">
      <div className="hero-copy">
        <h1>EXPERT IKEA KITCHEN<br/>INSTALLATION IN<br/>KANSAS CITY</h1>
        <p className="tagline">We are the “KEA” to unlocking your new kitchen.</p>
        <ul>
          <li><Check size={18}/> IKEA Kitchen Installation</li>
          <li><Check size={18}/> Closets &amp; Wardrobes</li>
          <li><Check size={18}/> IKEA Systems &amp; More</li>
          <li><Check size={18}/> Design &amp; Inventory Management</li>
          <li><Check size={18}/> Fast Turnaround | Insured | Professional</li>
        </ul>
        <a className="btn hero-btn">UPLOAD YOUR KITCHEN PLAN<br/>FOR A FREE QUOTE <CloudUpload size={24}/></a>
      </div>
      <div className="hero-image"><MiniKitchen /></div>
    </section>

    <section className="stats">
      {stats.map((s,i)=>{ const Icon=s.icon; return <div className="stat" key={s.value}><Icon size={52}/><div><b>{s.value}</b><span>{s.label}</span></div></div> })}
    </section>

    <section className="services" id="services">
      <h2>OUR SERVICES</h2>
      <p>Specializing in IKEA solutions for every room in your home.</p>
      <div className="service-grid">
        {services.map((svc)=>{ const Icon=svc.icon; return <article className="card" key={svc.title}>
          <MiniKitchen variant={svc.img}/>
          <div className="icon"><Icon size={32}/></div>
          <h3>{svc.title}</h3><p>{svc.text}</p>
        </article> })}
      </div>
    </section>

    <section className="gallery" id="gallery">
      <h2>RECENT PROJECTS</h2>
      <p>Beautiful results. Professional installation.</p>
      <div className="gallery-grid">{Array.from({length:8}).map((_,i)=><MiniKitchen key={i} variant={i%3===0?'kitchen-b':i%3===1?'kitchen-c':'kitchen-d'} />)}</div>
      <a className="btn gallery-btn">VIEW FULL GALLERY</a>
    </section>
  </main>
}
