import Link from 'next/link';
import { ServicesGrid, QuoteSection } from './Sections';

const areaDetails = {
  'Kansas City': {
    region: 'Kansas City, Missouri and Kansas City, Kansas',
    nearby: 'Brookside, Waldo, the Northland, West Plaza, Downtown, and surrounding Kansas City neighborhoods',
    intro: 'From compact city kitchens to full cabinet layouts, SKI provides organized IKEA installation on both sides of the state line.',
  },
  'Overland Park': {
    region: 'Overland Park, Kansas',
    nearby: 'Leawood, Prairie Village, Mission, Merriam, Lenexa, and nearby Johnson County communities',
    intro: 'SKI helps Overland Park homeowners complete IKEA kitchens and storage projects with careful plan review, assembly, alignment, and finishing details.',
  },
  Olathe: {
    region: 'Olathe, Kansas',
    nearby: 'Gardner, Spring Hill, Lenexa, Overland Park, and surrounding Johnson County communities',
    intro: 'SKI installs IKEA cabinet and storage systems for Olathe homeowners who want a clear, plan-first process from inventory review through installation.',
  },
  "Lee's Summit": {
    region: "Lee's Summit, Missouri",
    nearby: "Blue Springs, Raymore, Greenwood, Lake Lotawana, and nearby eastern Jackson County communities",
    intro: "SKI provides IKEA kitchen, PAX wardrobe, and home-storage installation for Lee's Summit homes with an emphasis on preparation and a polished finish.",
  },
  Independence: {
    region: 'Independence, Missouri',
    nearby: 'Blue Springs, Sugar Creek, Grain Valley, eastern Kansas City, and surrounding Jackson County communities',
    intro: 'SKI gives Independence homeowners a specialized alternative for IKEA kitchen cabinets, closets, wardrobes, and modular home systems.',
  },
  Lawrence: {
    region: 'Lawrence, Kansas',
    nearby: 'Eudora, De Soto, Baldwin City, and surrounding Douglas County communities',
    intro: 'SKI brings specialized IKEA installation to Lawrence for kitchens, PAX wardrobes, closets, laundry storage, and other modular systems.',
  },
};

export default function AreaPage({ city }) {
  const details = areaDetails[city];
  return <main>
    <section className="pageHero"><p>Local IKEA Installation</p><h1>IKEA Kitchen &amp; Cabinet Installation in {city}</h1><span>{details.intro}</span></section>
    <section className="section light areaSeoIntro">
      <p className="eyebrow">Serving {details.region}</p>
      <h2>IKEA INSTALLATION SERVICES IN {city.toUpperCase()}</h2>
      <p className="wideText">Upload your IKEA plan and SKI will help turn SEKTION kitchen cabinets, PAX wardrobes, closets, and home-storage systems into a finished space. Our organized process includes plan review, optional inventory support, cabinet assembly, installation, alignment, panels, fillers, toe kicks, and trim appropriate to the project.</p>
      <Link className="smallCta" href="/quote">UPLOAD YOUR PLAN FOR A FREE QUOTE</Link>
    </section>
    <section className="section areaSearchContent" aria-labelledby="local-service-heading">
      <h2 id="local-service-heading">A SPECIALIZED IKEA INSTALLER NEAR {city.toUpperCase()}</h2>
      <div className="areaSearchGrid">
        <article><h3>Kitchen Cabinet Installation</h3><p>Professional assembly and installation for IKEA SEKTION base, wall, and high cabinets, including layout, leveling, doors, drawers, panels, fillers, and trim.</p></article>
        <article><h3>PAX Closets &amp; Wardrobes</h3><p>Installation of IKEA PAX wardrobes and closet systems for bedrooms, walk-in closets, reach-in closets, and organized storage spaces.</p></article>
        <article><h3>Nearby Communities</h3><p>Our service area includes {details.nearby}. Contact us to confirm availability for your address.</p></article>
      </div>
    </section>
    <ServicesGrid/><QuoteSection/>
  </main>;
}
