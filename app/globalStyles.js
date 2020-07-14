import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('${(props) => props.theme.fontSource}');

  body {
    background-color: ${(props) => props.theme.bgGray};
    font-family: ${(props) => props.theme.fontFamily};
    color: ${(props) => props.theme.colors.darkGreen};
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;
    font-weight: ${(props) => props.theme.fontWeight.normal};
    line-height: ${(props) => props.theme.lineHeight.extraLoose};
  }

  ul, ol {
    list-style: none;
    padding-inline-start: 0;
  }
`;

export default GlobalStyles;
