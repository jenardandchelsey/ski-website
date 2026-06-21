import Image from 'next/image';
import { QuoteSection } from '../components/Sections';

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

export default function GalleryPage(){
  return <main>
    <section className="pageHero"><p>Project Gallery</p><h1>IKEA-Style Installation Inspiration</h1><span>Explore realistic design inspiration for kitchens, closets, bathrooms, and laundry rooms. Generated inspiration images will be replaced with SKI project photography as installations are completed.</span></section>
    <section className="gallerySections">
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
    <QuoteSection/>
  </main>
}
