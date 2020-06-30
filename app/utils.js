export const cleanId = (name) => {
  return name
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/:/g, '')
    .substring(0, 50);
};

export const routes = [
  { component: 'Timeline', route: 'timeline', },
  { component: 'Major Events', route: 'events', },
  { component: 'Photo Gallery', route: 'gallery' },
  { component: 'Oral Histories', route: 'oral_histories' },
  { component: 'About', route: 'aboute' },
];
