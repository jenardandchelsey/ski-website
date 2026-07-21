const routes = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/services/ikea-kitchen-installation', priority: .9, changeFrequency: 'monthly' },
  { path: '/services/closets-wardrobes', priority: .9, changeFrequency: 'monthly' },
  { path: '/services/ikea-systems', priority: .8, changeFrequency: 'monthly' },
  { path: '/services/design-inventory-management', priority: .8, changeFrequency: 'monthly' },
  { path: '/services', priority: .8, changeFrequency: 'monthly' },
  { path: '/service-areas', priority: .8, changeFrequency: 'monthly' },
  { path: '/service-areas/kansas-city', priority: .8, changeFrequency: 'monthly' },
  { path: '/service-areas/overland-park', priority: .8, changeFrequency: 'monthly' },
  { path: '/service-areas/olathe', priority: .8, changeFrequency: 'monthly' },
  { path: '/service-areas/lees-summit', priority: .8, changeFrequency: 'monthly' },
  { path: '/service-areas/independence', priority: .8, changeFrequency: 'monthly' },
  { path: '/service-areas/lawrence', priority: .8, changeFrequency: 'monthly' },
  { path: '/quote', priority: .8, changeFrequency: 'monthly' },
  { path: '/gallery', priority: .7, changeFrequency: 'monthly' },
  { path: '/gallery/work-in-progress', priority: .7, changeFrequency: 'monthly' },
  { path: '/gallery/inspiration', priority: .6, changeFrequency: 'monthly' },
  { path: '/about', priority: .6, changeFrequency: 'yearly' },
  { path: '/contact', priority: .6, changeFrequency: 'yearly' },
  { path: '/faq', priority: .6, changeFrequency: 'monthly' },
  { path: '/process', priority: .6, changeFrequency: 'yearly' },
];

export default function sitemap() {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `https://swedishkitcheninstallers.com${path}`,
    lastModified: new Date('2026-07-20'),
    changeFrequency,
    priority,
  }));
}
