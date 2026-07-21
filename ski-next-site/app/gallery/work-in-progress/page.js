import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { QuoteSection } from '../../components/Sections';
import RecentProjects from '../../components/RecentProjects';

export const metadata = {
  title: 'IKEA Installation Work in Progress Gallery',
  description: 'Follow real SKI kitchen, bathroom, laundry, and closet installations as they take shape.',
  alternates: { canonical: '/gallery/work-in-progress' },
};

function projectSequence(slug, count, label, finalReveal = false) {
  return Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');
    const isFinal = finalReveal && index === count - 1;
    return {
      img: `/images/gallery/work-in-progress/${slug}-${number}.jpg`,
      alt: isFinal ? `Completed ${label}` : `${label} installation in progress, view ${index + 1}`,
      caption: isFinal ? `The finished ${label}` : `Installation progress — view ${index + 1}`,
    };
  });
}

const workInProgressSections = [
  {
    title: 'Kitchen Installation — Project One',
    intro: 'Base cabinets are positioned, leveled, and prepared for the next stage of the build.',
    projects: projectSequence('kitchen-project-one', 3, 'kitchen'),
  },
  {
    title: 'Kitchen Installation — Project Two',
    intro: 'A full-room installation advances from cabinet placement to a clean, organized layout.',
    projects: projectSequence('kitchen-project-two', 7, 'kitchen'),
  },
  {
    title: 'Laundry Room Installation',
    intro: 'Purpose-built cabinetry, a generous work surface, and a utility sink transform this hardworking room.',
    projects: projectSequence('laundry-room', 7, 'laundry room', true),
  },
  {
    title: 'Primary Bathroom — Project One',
    intro: 'Carefully fitted vanity components establish the foundation for a polished primary bath.',
    projects: [
      ...projectSequence('primary-bathroom-one', 3, 'primary bathroom'),
      {
        img: '/images/gallery/work-in-progress/primary-bathroom-one-04.png',
        alt: 'Completed primary bathroom with floating vanities and glass shower enclosure',
        caption: 'The finished primary bathroom',
      },
    ],
  },
  {
    title: 'Primary Bathroom — Project Two',
    intro: 'Vanity boxes and drawer components are assembled and aligned for a refined built-in finish.',
    projects: projectSequence('primary-bathroom-two', 3, 'primary bathroom'),
  },
  {
    title: 'Kitchen Installation — Project Three',
    intro: 'Follow this detailed transformation from initial layout and cabinet assembly through the finished kitchen.',
    projects: projectSequence('kitchen-project-three', 25, 'kitchen', true),
  },
  {
    title: 'Primary Closet Installation',
    intro: 'A tailored storage system comes together with careful spacing, alignment, and full-height cabinetry.',
    projects: projectSequence('primary-closet', 2, 'primary closet', true),
  },
];

export default function WorkInProgressGalleryPage() {
  return <main>
    <section className="pageHero">
      <p>Behind the Build</p>
      <h1>Work in Progress</h1>
      <span>Watch real SKI installations advance from carefully organized components to beautifully aligned cabinetry and completed rooms.</span>
    </section>
    <section className="gallerySections">
      <div className="galleryBack"><Link href="/gallery"><ArrowLeft size={17} aria-hidden="true" /> Choose another gallery</Link></div>
      <section className="galleryCategory workInProgressCategory">
        <div className="galleryHeading workInProgressHeading">
          <p className="galleryEyebrow">The Installation Process</p>
          <h2>See the Room Take Shape</h2>
          <p>Our efficient installation process brings each IKEA system together with precision. Follow the progress from the first cabinet placement through the finishing details.</p>
        </div>
        <div className="workInProgressGroups">
          {workInProgressSections.map((section) => <section className="workInProgressGroup" key={section.title}>
            <div className="workInProgressGroupHeading"><h3>{section.title}</h3><p>{section.intro}</p></div>
            <RecentProjects projects={section.projects} />
          </section>)}
        </div>
      </section>
    </section>
    <QuoteSection />
  </main>;
}
