import Image from 'next/image';
import Link from 'next/link';
import { stats, services, processSteps, faqs, serviceAreas, differentiators } from '../data';
import QuoteForm from './QuoteForm';

export function Stats(){return <section className="statsBand">{stats.map(({value,label,icon:Icon})=><div className="stat" key={value}><Icon size={56}/><div><strong>{value}</strong><span>{label}</span></div></div>)}</section>}

export function ServicesGrid(){return <section className="section" id="services"><h2>OUR SERVICES</h2><p className="sectionSub">Specializing in IKEA solutions for every room in your home.</p><div className="serviceGrid">{services.map(({slug,shortTitle,text,icon:Icon,img})=><Link className="card" href={slug} key={slug}><div className="cardImage"><Image src={img} alt={shortTitle.replace('\n',' ')} fill /></div><div className="iconBadge"><Icon size={34}/></div><h3>{shortTitle.split('\n').map((t,i)=><span key={i}>{t}{i<shortTitle.split('\n').length-1 && <br/>}</span>)}</h3><p>{text}</p></Link>)}</div></section>}

export function GalleryPreview(){const imgs=['kitchen-install.png','design.png','systems.png','inventory.png','kitchen-install.png','closets.png'];return <section className="section gallery"><h2>RECENT PROJECTS</h2><p className="sectionSub">Beautiful results. Professional installation.</p><div className="galleryGrid">{imgs.map((img,i)=><div className="galleryTile" key={i}><Image src={`/images/${img}`} alt="SKI project placeholder" fill /></div>)}</div><Link className="smallCta" href="/gallery">VIEW FULL GALLERY</Link></section>}

export function ProcessSection(){return <section className="process"><h2>OUR SIMPLE PROCESS</h2><p>From your IKEA plan to a kitchen you'll love.</p><div className="steps">{processSteps.map(({title,text,icon:Icon},i)=><span className="stepWrap" key={title}><div><Icon size={42}/><h3>{title.toUpperCase()}</h3><p>{text}</p></div>{i<processSteps.length-1 && <b>›</b>}</span>)}</div><Link className="cta processCta" href="/quote">UPLOAD YOUR KITCHEN PLAN FOR A FREE QUOTE</Link></section>}

export function QuoteSection(){return <section className="quote"><div><h2>GET YOUR FREE QUOTE</h2><p>Upload your IKEA plan and we’ll take it from there.</p><ol><li><b>Upload your plan</b><span>PDF, PNG, JPG, or room photos.</span></li><li><b>We review & quote</b><span>You receive a clear, no-obligation quote.</span></li><li><b>Schedule installation</b><span>Once approved, we schedule your installation.</span></li></ol></div><QuoteForm /></section>}

export function FAQPreview(){return <section className="section faqBlock"><h2>FAQ</h2><div className="faqList">{faqs.slice(0,4).map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div><Link className="smallCta" href="/faq">VIEW ALL FAQS</Link></section>}

export function AreasPreview(){return <section className="section light"><h2>SERVICE AREAS</h2><p className="sectionSub">Serving the Kansas City metro and Lawrence area.</p><div className="areaGrid">{serviceAreas.map(a=><Link href={a.slug} key={a.slug}>{a.city}</Link>)}</div></section>}

export function WhySKI(){return <section className="section light"><h2>WHY CHOOSE SKI?</h2><div className="whyGrid">{differentiators.map(({title,text,icon:Icon})=><article key={title}><Icon size={40}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>}
