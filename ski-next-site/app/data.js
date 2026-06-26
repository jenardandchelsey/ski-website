import { Award, Star, Clock, ShieldCheck, Wrench, Pencil, Shirt, Grid2X2, ClipboardList, UploadCloud, CheckCircle, MapPin } from 'lucide-react';

export const stats = [
  { value: 'IKEA', label: 'Focused Installation', icon: Award },
  { value: 'Local', label: 'Kansas City Service', icon: Star },
  { value: 'Plan-First', label: 'Organized Projects', icon: Clock },
  { value: 'Clear', label: 'Installation Process', icon: ShieldCheck },
];

const serviceDefinitions = [
  { slug: '/services/ikea-kitchen-installation', title: 'IKEA Kitchen Installation', shortTitle: 'IKEA KITCHEN\nINSTALLATION', text: 'Professional installation of IKEA kitchens done right the first time.', icon: Wrench, img: '/images/kitchen-install.png', keywords: ['SEKTION cabinets', 'kitchen islands', 'pantries', 'panels and trim'] },
  { slug: '/services/design-inventory-management', title: 'Design Assistance', shortTitle: 'DESIGN SERVICES', text: 'Plan review, design assistance, and project coordination.', icon: Pencil, img: '/images/design.png', keywords: ['IKEA plan review', 'box inventory', 'missing part checks', 'project scheduling'] },
  { slug: '/services/closets-wardrobes', title: 'Closets & Wardrobes', shortTitle: 'CLOSETS & WARDROBES', text: 'Custom PAX wardrobes, closets, and storage solutions.', icon: Shirt, img: '/images/closets.png', keywords: ['PAX wardrobes', 'closet systems', 'storage solutions', 'built-in look'] },
  { slug: '/services/ikea-systems', title: 'IKEA Systems & More', shortTitle: 'IKEA SYSTEMS & MORE', text: 'Entertainment centers, office systems, laundry rooms and more.', icon: Grid2X2, img: '/images/systems.png', keywords: ['BESTÅ systems', 'home office', 'laundry storage', 'media centers'] },
  { slug: '/process', title: 'Inventory & Project Management', shortTitle: 'INVENTORY & PROJECT\nMANAGEMENT', text: 'Inventory management and on-time project coordination.', icon: ClipboardList, img: '/images/inventory.png', keywords: ['project management', 'assembly coordination', 'delivery planning', 'installation scheduling'] },
];

const serviceImages = {
  '/services/ikea-kitchen-installation': '/images/services/white-kitchen.jpg',
  '/services/design-inventory-management': '/images/services/closet-measuring-landscape.png',
  '/services/closets-wardrobes': '/images/services/kids-pax-reach-in.png',
  '/services/ikea-systems': '/images/services/powder-room-landscape.png',
  '/process': '/images/services/pallet-inventory-landscape.png',
};

export const services = serviceDefinitions.map(service => ({
  ...service,
  img: serviceImages[service.slug] || service.img,
}));

export const serviceAreas = [
  { city: 'Kansas City', slug: '/service-areas/kansas-city' },
  { city: 'Overland Park', slug: '/service-areas/overland-park' },
  { city: 'Olathe', slug: '/service-areas/olathe' },
  { city: "Lee's Summit", slug: '/service-areas/lees-summit' },
  { city: 'Independence', slug: '/service-areas/independence' },
  { city: 'Lawrence', slug: '/service-areas/lawrence' },
];

export const faqs = [
  ['Do you only install IKEA systems?', 'Yes. SKI is focused on IKEA kitchens, closets, wardrobes, and IKEA home systems so our process stays specialized and efficient.'],
  ['What services do you provide?', 'We provide inventory services, cabinet and closet assembly, and installation for cabinet and closet systems. We can also create small custom supplemental fillers, especially for closets, to help optimize challenging spaces. We do not provide demolition, painting, electrical work, plumbing work, moving services, or countertop installation, but we can connect you with trusted vendors who can coordinate with us on your project.'],
  ['Do I need to have my IKEA plan before requesting a quote?', 'A plan helps us quote faster, but you can also upload photos, measurements, or notes and we can guide you through next steps.'],
  ['Do you serve Lawrence?', 'Yes. SKI serves the Kansas City metro and Lawrence area.'],
  ['Can you inventory my IKEA order?', 'Yes. Inventory and project management are part of our process. We can help identify missing or damaged items before installation day.'],
  ['Are you insured?', 'The site is prepared to display insurance information once your company registration and insurance details are finalized.'],
];

export const processSteps = [
  { title: 'Upload Your Plan', text: 'Send your IKEA kitchen, closet, wardrobe, or home system plan.', icon: UploadCloud },
  { title: 'Inventory & Quote', text: 'We review your plan, coordinate inventory, and provide a clear quote.', icon: ClipboardList },
  { title: 'Professional Installation', text: 'Our installer arrives prepared, organized, and focused on a clean finish.', icon: Wrench },
];

export const differentiators = [
  { title: 'IKEA expertise', text: 'A focused IKEA installation model instead of general handyman work.', icon: CheckCircle },
  { title: 'Fast turnaround', text: 'Built around plan upload, inventory review, and efficient installation scheduling.', icon: Clock },
  { title: 'Local KC service', text: 'Serving homeowners across the Kansas City metro and Lawrence.', icon: MapPin },
];
