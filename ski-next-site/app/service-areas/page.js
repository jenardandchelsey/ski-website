import Link from 'next/link';
import { serviceAreas } from '../data';
import { QuoteSection } from '../components/Sections';
export const metadata = { title: 'IKEA Installation Service Areas', description: 'Local IKEA kitchen, cabinet, PAX closet, and wardrobe installation across the Kansas City metro and Lawrence.', alternates: { canonical: '/service-areas' } };
export default function Page(){return <main><section className="pageHero"><p>KC Metro + Lawrence</p><h1>Service Areas</h1><span>Local IKEA kitchen, closet, wardrobe, and home system installation service.</span></section><section className="section"><div className="areaGrid large">{serviceAreas.map(a=><Link href={a.slug} key={a.slug}>{a.city}</Link>)}</div></section><QuoteSection/></main>}
