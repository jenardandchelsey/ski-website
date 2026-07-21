import { QuoteSection } from '../components/Sections';
export const metadata = { title: 'Upload Your IKEA Plan for a Free Quote', description: 'Upload your IKEA kitchen, closet, or wardrobe plan and project files for a free installation quote from SKI.', alternates: { canonical: '/quote' } };
export default function Page(){return <main><section className="pageHero"><p>Free Quote</p><h1>Upload Your Kitchen Plan</h1><span>Send your IKEA plan, photos, or project notes and SKI will review next steps.</span></section><QuoteSection/></main>}
