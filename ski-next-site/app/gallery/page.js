import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { QuoteSection } from '../components/Sections';

export const metadata = {
  title: 'IKEA Installation & Inspiration Gallery',
  description: 'Choose between real SKI installations in progress and IKEA system design inspiration.',
  alternates: { canonical: '/gallery' },
};

const galleryChoices = [
  {
    href: '/gallery/work-in-progress',
    image: '/images/gallery/work-in-progress/kitchen-project-three-08.jpg',
    eyebrow: 'Behind the Build',
    title: 'Work in Progress',
    description: 'Follow real SKI installations from cabinet layout and assembly through alignment, finishing details, and completed rooms.',
    alt: 'SKI kitchen cabinetry installation in progress',
  },
  {
    href: '/gallery/inspiration',
    image: '/images/gallery/kitchen-02.png',
    eyebrow: 'Ideas for Your Home',
    title: 'Inspiration',
    description: 'Explore kitchens, closets, bathrooms, and laundry rooms designed to show what IKEA systems can become in your space.',
    alt: 'Navy and white kitchen design inspiration',
  },
];

export default function GalleryPage() {
  return <main>
    <section className="pageHero">
      <p>Project Gallery</p>
      <h1>Choose Your Gallery</h1>
      <span>See how our installations come together, or explore ideas for the room you are planning next.</span>
    </section>
    <section className="galleryChooser">
      <div className="galleryChooserGrid">
        {galleryChoices.map((choice) => <Link className="galleryChoiceCard" href={choice.href} key={choice.href}>
          <div className="galleryChoiceImage">
            <Image src={choice.image} alt={choice.alt} fill sizes="(max-width: 760px) 100vw, 50vw" priority />
          </div>
          <div className="galleryChoiceContent">
            <p>{choice.eyebrow}</p>
            <h2>{choice.title}</h2>
            <span>{choice.description}</span>
            <strong>View {choice.title} <ArrowRight size={19} aria-hidden="true" /></strong>
          </div>
        </Link>)}
      </div>
    </section>
    <QuoteSection />
  </main>;
}
