import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`
  ${normalize}

  body {
    background-color: ${(props) => props.theme.bgGray};
    font-family: ${(props) => props.theme.fontFamily.notoSans};
    color: ${(props) => props.theme.colors.darkGreen};
  }

  h1 {
    margin-top: 80px;
    margin-bottom: 70px;
    font-size: ${(props) => props.theme.fontSize.xxl};
  }

  h2 {
    margin-bottom: 30px;
    font-size: ${(props) => props.theme.fontSize.lg};
  }

  h1,
  h2 {
    color: ${(props) => props.theme.colors.greenBean};
    line-height: ${(props) => props.theme.lineHeight.xLoose};
  }

  a {
    text-decoration: none;
  }

  p {
    margin-block-start: 0;
    margin-block-end: 0;
    font-weight: ${(props) => props.theme.fontWeight.normal};
    line-height: 1.6;
  }

  ul,
  ol {
    list-style: none;
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
`;

export default GlobalStyles;
