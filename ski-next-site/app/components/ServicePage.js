import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { ProcessSection, QuoteSection } from './Sections';
export default function ServicePage({title,intro,image,bullets}){return <main><section className="splitPage"><div><p className="eyebrow">SKI Services</p><h1>{title}</h1><p>{intro}</p><ul className="checkList">{bullets.map(b=><li key={b}><Check size={18}/>{b}</li>)}</ul><Link className="cta" href="/quote">Upload Your Plan for a Free Quote</Link></div><div className="splitImage"><Image src={image} alt={title} fill /></div></section><ProcessSection/><QuoteSection/></main>}
