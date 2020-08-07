export const cleanId = (name) => {
  return name
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/-/g, '_')
    .replace(/:/g, '')
    .replace(/,/g, '')
    .replace(/–/g, '_')
    .substring(0, 50);
};

// Helper function to replace parentheses and spaces in JSON keys.
export const cleanJSON = (obj) => {
  Object.keys(obj).forEach((key) => {
    const replaced = key
      .replace(/\s/g, '_')
      .replace(/["'()]/g, '')
      .toLowerCase();
    if (key !== replaced) {
      obj[replaced] = obj[key];
      delete obj[key];
    }
  });
  return obj;
};

export const cleanMenuNames = (page) => {
  let pageName = page.name.split(',');
  pageName =
    pageName.length > 2 ? `${pageName[0]}, ${pageName[1]}` : pageName[0];
  return pageName;
};

// Helper function to structure photo gallery and event page image captions.
export const prepareCaptions = (item) => {
  return `${item.caption} ${item.attribution}. ${item.citation}.`;
};

export const routes = [
  { component: 'Timeline', route: 'timeline' },
  { component: 'Featured Events' },
  { component: 'Photo Gallery', route: 'gallery' },
  { component: 'Oral Histories', route: 'oral_histories' },
  { component: 'About this Project', route: 'about' },
];

export const timelineScopes = [
  { title: 'National Civil Rights', scope: 'national' },
  { title: 'Durham Civil Rights', scope: 'durham' },
];

export const timelineDescription = `The Durham Civil Rights Heritage Project (DCRHP) was founded to document the history of the Civil Rights Movement in Durham, North Carolina. The project began in 2003 and participants from numerous local heritage and professional organizations contributed. Photographs and oral histories were collected from local citizens. In 2020, the online exhibit was updated to reflect the continuing history of civil rights in Durham.`;
