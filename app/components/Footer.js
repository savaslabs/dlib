import React from 'react';
import SiteInfo from './SiteInfo';
import styled from 'styled-components';

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
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.greenBean};
  height: fit-content;
  position: relative;
  width: 100vw;
  z-index: 50;

  @media ${props => props.theme.breakpoints.lg} {
    height: 361px;
  }

  ::before {
    content: '';
    background-color: ${props => props.theme.colors.white};
    height: 130px;
    position: absolute;
    left: 0;
    top: 30px;

    @media ${props => props.theme.breakpoints.md} {
      width: 35%;
      height: 133px;
    }

    @media ${props => props.theme.breakpoints.lg} {
      width: 20%;
      height: 164px;
    }

    @media ${props => props.theme.breakpoints.max} {
      width: 30%;
    }
  }
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.theme.smContainer};

  @media ${props => props.theme.breakpoints.lg} {
    ${props => props.theme.lgContainer};
  }
`;

export default footer;
