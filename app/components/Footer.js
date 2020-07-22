import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const footer = () => {
  return (
    <Footer>
      <FooterContainer>
        <SiteName to={`/`}>The Durham Civil Rights Heritage Project</SiteName>
        <CollectionInfo>
          <p>
            Part of the <a href='#'>North Carolina Collection</a>
            <br />
            of the{' '}
            <a href='#'>Durham County Library</a>
          </p>
        </CollectionInfo>
      </FooterContainer>
    </Footer>
  );
}

const Footer = styled.footer`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.greenBean};
  height: 200px;
  position: relative;
  width: 100vw;
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

const SiteName = styled(NavLink)`
  z-index: 1;
  margin-top: 30px;
  color: ${(props) => props.theme.colors.greenBean};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: ${(props) => props.theme.lineHeight.snug};
  letter-spacing: 0.02em;
  font-size: ${(props) => props.theme.fontSize.md};
  padding-top: 70px;
  max-width: 250px;
  ${breakpoint('lg')`
    font-size: 31px;
    line-height: 1.31;
    background-color: ${(props) => props.theme.colors.white};
    padding: 20px 60px 24px 0;
  `}
`;

const CollectionInfo = styled.div`
  padding-top: 50px;
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSize.sm};
  p a {
    text-decoration: underline;
    color: inherit;
  }

  ${breakpoint('lg')`
    padding-top: 22px;
    font-size: ${(props) => props.theme.fontSize.md};
  `}
`;

export default footer;
