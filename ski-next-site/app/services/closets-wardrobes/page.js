import ServicePage from '../../components/ServicePage';
import GrowingClosetGallery from '../../components/GrowingClosetGallery';
export const metadata = { title: 'IKEA PAX Closet & Wardrobe Installation', description: 'Professional IKEA PAX wardrobe and closet system assembly and installation throughout Kansas City and Lawrence.', alternates: { canonical: '/services/closets-wardrobes' } };

const stages = [
  {
    label: 'Before',
    title: 'Storage without a system',
    description: 'Children’s clothes and shoes overflow the basic closet and dresser, taking up valuable floor space.',
    image: '/images/reach-in-closet-storyboard-v6/01-before-child-clothes-and-shoes.png',
    alt: 'Child’s bedroom before closet organization, with clothing and shoes overflowing a basic reach-in closet and dresser',
  },
  {
    label: 'Toddler',
    title: 'Make routines easier',
    description: 'Four drawers, pull-out baskets, shelves, and a hamper organize clothing, toys, shoes, and laundry.',
    image: '/images/reach-in-closet-storyboard-v6/02-toddler-organized-fuller.png',
    alt: 'Toddler reach-in closet organized with IKEA drawers, baskets, shelves, hanging space, and a hamper',
  },
  {
    label: 'School Age',
    title: 'More belongings, still organized',
    description: 'Six drawers absorb more folded clothes while baskets and shelves handle school and activity gear.',
    image: '/images/reach-in-closet-storyboard-v6/03-school-age-organized-fuller.png',
    alt: 'School-age child’s reach-in closet with six drawers and organized clothing, shoes, toys, and school gear',
  },
  {
    label: 'Teen',
    title: 'Adapted for a growing wardrobe',
    description: 'Eight drawers and double hanging add realistic capacity for clothing, jeans, shoes, and sports gear.',
    image: '/images/reach-in-closet-storyboard-v6/04-teen-organized-fuller-double-hang.png',
    alt: 'Teen reach-in closet with eight IKEA drawers, double hanging rods, shoes, and sports gear',
  },
];

function GrowingClosetStory(){
  return <section className="growingCloset" aria-labelledby="growing-closet-title">
    <div className="growingClosetHeading">
      <p>A closet that grows with your child</p>
      <h2 id="growing-closet-title">One Closet. Every Stage.</h2>
      <div className="growingClosetIntro">
        Reach-in closets are one of the quickest, most economical ways to cut clutter and reclaim bedroom space. <strong>Recapture valuable floor space and avoid buying bulky furniture</strong> by moving to a closet system that can grow and change with your child. The belongings shown before are not removed—they are organized across hanging space, shelves, baskets, a hamper, and closed drawers. The system can be adapted with minimal cost as your child grows, and it is backed by <strong>IKEA&apos;s 10-year warranty for peace of mind.</strong>
      </div>
    </div>
    <GrowingClosetGallery stages={stages}/>
    <p className="growingClosetClosing">Keep the belongings. Lose the clutter—and give the room back to your child.</p>
    <div className="growingClosetWarranty">
      <strong>Built to change. Backed to last.</strong>
      <span>Adapt the system as your child grows, with minimal-cost updates and IKEA&apos;s 10-year warranty for peace of mind.</span>
    </div>
  </section>;
}

export default function Page(){return <ServicePage title="IKEA Closet & Wardrobe Installation" intro="Custom PAX wardrobes, closet systems, and storage installations with a polished built-in feel." image="/images/services/kids-pax-reach-in.png" bullets={["PAX wardrobe systems","Closet organization solutions","Bedroom and entry storage","Inventory and installation planning"]}><GrowingClosetStory/></ServicePage>}
