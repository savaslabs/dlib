import React from 'react';
import SiteInfo from './SiteInfo';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const footer = () => {
  return (
    <Footer id="footer">
      <FooterContainer>
        <SiteInfo footer="true" />
      </FooterContainer>
    </Footer>
  );
};

const Footer = styled.footer`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.greenBean};
  height: 200px;
  position: relative;
  width: 100vw;
  z-index: 50;
  ${breakpoint('lg')`
    height: 361px;
  `}

  ::before {
    content: '';
    background-color: ${(props) => props.theme.colors.white};
    height: 130px;
    position: absolute;
    left: 0;
    top: 30px;
    width: 100%;
    ${breakpoint('lg')`
      width: 20%;
      height: 164px;
    `}
    ${breakpoint('max')`
      width: 30%;
    `}
  }
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => props.theme.smContainer};
  ${breakpoint('lg')`
    ${(props) => props.theme.lgContainer};
  `}
`;


export default footer;
