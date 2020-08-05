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
    linkSource: '#6C6C6C',
    darkGray: '#C4C4C4',
    charcoal: '#404040',
    white: '#FFFFFF',
  },
  fontSource:
    'https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap',
  fontFamily: 'Almarai, sans-serif',
  fontSize: {
    xs: '16px', // Mobile Body.
    sm: '18px', // Desktop Body, Mobile headers.
    md: '21px', // Desktop.
    lg: '24px', // Desktop Menu.
    xl: '31px', // Desktop Header Text.
    xxl: '36px', // Desktop h1.
  },
  fontWeight: {
    normal: '400',
    bold: '700',
  },
  lineHeight: {
    tight: '1.125',
    snug: '1.14',
    loose: '1.31',
    xLoose: '1.53',
    xxLoose: '2.19',
  },
  smContainer: `padding: 0 18px;
    margin: 0 auto;
  `,
  lgContainer: `padding: 0 18px;
    max-width: 1163px;
    margin: 0 auto;
  `,
  containerFullWidth: `margin: 0 calc(50% - 50vw);`,
  srOnly: `position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;`,
  notSrOnly: `position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;`,
  noScrollBody: `overflow: auto;
    height: 100%;`
};
