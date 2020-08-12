export const theme = {
  breakpoints: {
    smMax: 'only screen and (max-width: 767px)',
    md: 'only screen and (min-width: 768px)',
    mdMax: 'only screen and (max-width: 1023px)',
    lg: 'only screen and (min-width: 1024px)',
    max: 'only screen and (min-width: 1280px)',
  },
  colors: {
    darkGreen: '#202D25',
    greenBean: '#41796F',
    leafy: '#D5CC7F',
    taupe: '#B0A7A6',
    cloudySkies: '#ABBEBC',
    bgGray: '#FBFBFB',
    lightGray: '#E0E0E0',
    medGray: '#828282',
    linkSource: '#6C6C6C',
    darkGray: '#C4C4C4',
    charcoal: '#404040',
    black: '#1B1B1B',
    white: '#FFFFFF',
  },
  fontSource:
    'https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap',
  fontFamily: 'Almarai, sans-serif',
  fontSize: {
    xs: '16px', // Mobile Body.
    sm: '18px', // Desktop Body, Mobile headers.
    md: '21px', // Desktop.
    mdlg: '27px',
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
    mdLoose: '1.44',
    xLoose: '1.53',
    xxLoose: '2.19',
  },
  boxShadow: {
    xLight: '2px 2px 20px rgba(0, 0, 0, 0.15)',
    light: '0px 2px 6px rgba(0, 0, 0, 0.15)',
    med: '0px 4px 15px rgba(0, 0, 0, 0.1)',
    dark: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    xDark: '5px 5px 30px rgba(0, 0, 0, 0.29)',
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
