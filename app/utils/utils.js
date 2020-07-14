export const cleanId = name => {
  return name
    .toLowerCase()
    .replace(/ /g, '_')
    .replace(/:/g, '')
    .substring(0, 50);
};

export const routes = [
  { component: 'Timeline', route: 'timeline', },
  { component: 'Featured Events' },
  { component: 'Photo Gallery', route: 'gallery' },
  { component: 'Oral Histories', route: 'oral_histories' },
  { component: 'About This Project', route: 'about' },
];

export const timelineScopes = [
  { title: 'National Civil Rights', scope: 'national' },
  { title: 'Durham Civil Rights', scope: 'durham' },
];

export const theme = {
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    max: 1280,
  },
  colors: {
    darkGreen: '#202D25',
    greenBean: '#41796F',
    leafy: '#D5CC7F',
    taupe: '#B0A7A6',
    cloudySkies: '#ABBEBC',
    bgGray: '#FBFBFB',
    lightGray: '#E0E0E0',
    darkGray: '#C4C4C4',
    white: '#FFFFFF',
  },
  fontSource: 'https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap',
  fontFamily: 'Almarai, sans-serif',
  fontSize: {
    xs: '16px', // Mobile Body.
    sm: '18px', // Desktop Body, Mobile headers.
    md: '21px', // Desktop.
    lg: '24px', // Desktop Menu.
    xl: '31px', // Desktop Header Text.
  },
  lineHeight: {
    tight: '1.125',
    snug: '1.14',
    loose: '1.31',
  },
  smContainer:
  `padding: 0 18px;
    margin-left: auto;
    margin-right: auto;
  `,
  lgContainer:
  `padding: 0 18px;
    max-width: 1163px;
    margin-left: auto;
    margin-right: auto;
  `,
  containerFullWidth:
  `margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  `,
  srOnly:
  `position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;`,
  notSrOnly:
  `position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;`,
};
