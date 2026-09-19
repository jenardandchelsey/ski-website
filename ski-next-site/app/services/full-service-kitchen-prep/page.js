import Image from 'next/image';
import Link from 'next/link';
import { ProcessSection, QuoteSection } from '../../components/Sections';

export const metadata = {
  title: 'Full-Service Kitchen Prep in Kansas City',
  description: 'Kitchen demolition, plumbing and electrical rough-ins, wall repair, mudding, and painting to make your space IKEA ready.',
  alternates: { canonical: '/services/full-service-kitchen-prep' },
};

const stages = [
  {
    title: 'Demolition & Clear-Out',
    image: '/images/services/full-service-kitchen-prep/01-demolition.jpg',
    alt: 'Kitchen demolition in progress with cabinets removed',
    text: 'We coordinate removal of existing cabinets and affected finishes, protect the surrounding home, and clear the room for the work ahead.',
  },
  {
    title: 'Rough-Ins, Repairs & Finishing',
    image: '/images/services/full-service-kitchen-prep/02-rough-in-repairs.jpg',
    alt: 'Kitchen wall repair with plumbing and electrical adjustments underway',
    text: 'Plumbing and electrical locations are adjusted to the approved plan, followed by wall repair, taping, mudding, and preparation for paint.',
  },
  {
    title: 'Painted & IKEA Ready',
    image: '/images/services/full-service-kitchen-prep/03-install-ready.jpg',
    alt: 'Freshly painted kitchen space ready for cabinet installation',
    text: 'The prepared space is finished, cleaned, and checked against the installation plan so your IKEA kitchen installation can begin.',
  },
];

export default function Page() {
  return <main>
    <section className="pageHero prepHero">
      <p>Demo • Rough-In • Site Prep</p>
      <h1>Full-Service Kitchen Prep</h1>
      <span>One coordinated path from the existing kitchen to a clean, finished space that is ready for your IKEA installation.</span>
    </section>
    <section className="prepStages">
      <div className="prepStagesIntro">
        <h2>From Demo to IKEA Ready</h2>
        <p>SKI coordinates the preparation work around your approved kitchen plan, with a clearly documented scope and project-ready handoff.</p>
      </div>
      <div className="prepStageGrid">
        {stages.map((stage, index) => <article className="prepStage" key={stage.title}>
          <div className="prepStageImage"><Image src={stage.image} alt={stage.alt} fill sizes="(max-width: 900px) 42vw, 33vw" /></div>
          <div className="prepStageBody"><span className="prepStageNumber">{index + 1}</span><h3>{stage.title}</h3><p>{stage.text}</p></div>
        </article>)}
      </div>
    </section>
    <div className="prepCta"><Link className="cta" href="/quote">Request a Kitchen Prep Estimate</Link></div>
    <ProcessSection />
    <QuoteSection />
  </main>;
}
