const routes = ['', '/about', '/contact', '/faq', '/gallery', '/process', '/quote', '/services', '/service-areas', '/services/ikea-kitchen-installation', '/services/closets-wardrobes', '/services/ikea-systems', '/services/design-inventory-management', '/service-areas/kansas-city', '/service-areas/overland-park', '/service-areas/olathe', '/service-areas/lees-summit', '/service-areas/independence', '/service-areas/lawrence'];

export default function sitemap() {
  return routes.map((route) => ({
    url: `https://swedishkitcheninstallers.com${route}`,
    lastModified: new Date(),
  }));
}
