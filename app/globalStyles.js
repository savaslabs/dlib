import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&display=swap');
  body {
    font-family: 'Almarai', sans-serif;
  }

  ul {
    list-style: none;
    padding-inline-start: 0;
  }
`;

export default GlobalStyles;
