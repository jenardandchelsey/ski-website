import Image from 'next/image';
import { QuoteSection } from '../components/Sections';
import RecentProjects from '../components/RecentProjects';

export const metadata = {
  title: 'Gallery | SKI Swedish Kitchen Installers',
  description: 'Realistic IKEA-style inspiration for kitchens, closets, bathrooms, and laundry rooms.',
};

const gallerySections = [
  {
    title: 'Kitchens',
    intro: 'Modular kitchen inspiration across a range of layouts, finishes, and room sizes.',
    images: [
      ['kitchen-01.png', 'Bright white cabinet kitchen with a large island'],
      ['kitchen-02.png', 'Navy and white cabinet kitchen with brass accents'],
      ['kitchen-03.png', 'Light oak galley kitchen with integrated storage'],
      ['kitchen-04.png', 'Sage green kitchen with butcher-block island'],
      ['kitchen-05.png', 'White and walnut compact apartment kitchen'],
      ['kitchen-06.png', 'Charcoal modern kitchen with quartz waterfall island'],
    ],
  },
  {
    title: 'Closets',
    intro: 'Four closet categories, from efficient reach-ins to boutique-style dressing rooms.',
    images: [
      ['closet-reach-in.png', 'Reach-in closet with modular drawers and hanging storage'],
      ['closet-small-walk-in.png', 'Small walk-in closet with light oak cabinetry'],
      ['closet-large-walk-in.png', 'Large walk-in closet with extensive organized storage'],
      ['closet-master-boutique.png', 'Master boutique-style closet with glass doors and island'],
    ],
  },
  {
    title: 'Bathrooms',
    intro: 'Cabinet and vanity inspiration for full bathrooms and compact powder rooms.',
    images: [
      ['bathroom-double-vanity.png', 'Full bathroom with floating double vanity cabinets'],
      ['bathroom-family.png', 'Family bathroom with sage vanity and practical storage'],
      ['bathroom-powder-navy.png', 'Powder room with compact navy floating vanity'],
      ['bathroom-powder-oak.png', 'Powder room with light oak vanity and vessel sink'],
    ],
  },
  {
    title: 'Laundry Rooms',
    intro: 'Storage-focused laundry solutions for full rooms, mudrooms, and compact closets.',
    images: [
      ['laundry-white.png', 'White laundry cabinetry with folding counter and utility sink'],
      ['laundry-compact.png', 'Compact stacked laundry with light oak storage'],
      ['laundry-mudroom.png', 'Navy mudroom laundry with bench and tall cabinetry'],
      ['laundry-sage.png', 'Sage green laundry room with farmhouse utility sink'],
    ],
  },
];

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

export default function GalleryPage() {
  return <main>
    <section className="pageHero"><p>Project Gallery</p><h1>IKEA Installation Inspiration</h1><span>Explore real SKI installations in progress alongside design inspiration for kitchens, closets, bathrooms, and laundry rooms.</span></section>
    <section className="gallerySections">
      <section className="galleryCategory workInProgressCategory">
        <div className="galleryHeading workInProgressHeading">
          <p className="galleryEyebrow">Behind the Build</p>
          <h2>Work in Progress</h2>
          <p>From carefully organized components to beautifully aligned cabinetry, our efficient installation process brings your IKEA system together with precision. As the work unfolds, you can watch the room take shape—and see the home you imagined come to life.</p>
        </div>
        <div className="workInProgressGroups">
          {workInProgressSections.map((section) => <section className="workInProgressGroup" key={section.title}>
            <div className="workInProgressGroupHeading"><h3>{section.title}</h3><p>{section.intro}</p></div>
            <RecentProjects projects={section.projects} />
          </section>)}
        </div>
      </section>
      {gallerySections.map((section) => <section className="galleryCategory" key={section.title}>
        <div className="galleryHeading"><h2>{section.title}</h2><p>{section.intro}</p></div>
        <div className={`projectGalleryGrid ${section.images.length === 6 ? 'six' : 'four'}`}>
          {section.images.map(([file, caption]) => <figure className="projectGalleryCard" key={file}>
            <div className="projectGalleryImage"><Image src={`/images/gallery/${file}`} alt={caption} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div>
            <figcaption>{caption}</figcaption>
          </figure>)}
        </div>
      </section>)}
    </section>
    <QuoteSection />
  </main>;
}
