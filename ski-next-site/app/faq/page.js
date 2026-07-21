import { faqs } from '../data';
import { QuoteSection } from '../components/Sections';
export const metadata = { title: 'IKEA Installation FAQs', description: 'Answers about SKI kitchen, closet, wardrobe, cabinet, scheduling, and quote services in the Kansas City area.', alternates: { canonical: '/faq' } };
export default function Page(){return <main><section className="pageHero"><p>Questions</p><h1>Frequently Asked Questions</h1><span>Quick answers about SKI&apos;s IKEA-focused installation process.</span></section><section className="section faqBlock"><div className="faqList">{faqs.map(([q,a])=><details key={q} open={q.includes('only')}><summary>{q}</summary><p>{a}</p></details>)}</div></section><QuoteSection/></main>}
