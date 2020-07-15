import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize}
  @import url('${(props) => props.theme.fontSource}');

  body {
    background-color: ${(props) => props.theme.bgGray};
    font-family: ${(props) => props.theme.fontFamily};
    color: ${(props) => props.theme.colors.darkGreen};
  }

  a {
    text-decoration: none;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;
    font-weight: ${(props) => props.theme.fontWeight.normal};
    line-height: ${(props) => props.theme.lineHeight.xLoose};
  }

  ul, ol {
    list-style: none;
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
`;

export default GlobalStyles;
