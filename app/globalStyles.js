import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('${props => props.theme.fontSource}');

  body {
    background-color: ${props => props.theme.bgGray};
    font-family: ${props => props.theme.fontFamily};
  }

  ul, ol {
    list-style: none;
    padding-inline-start: 0;
  }
`;

export default GlobalStyles;
