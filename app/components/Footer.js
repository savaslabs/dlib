import React from 'react';
import CollectionInfo from './CollectionInfo';
import { libraryInfo, lastUpdated, siteAttribution } from '../utils/constants';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Markdown from 'react-markdown';

const footer = ({ menu, mobileMenuState })=> {
  return (
    <Footer id="footer" menu={menu} mobileMenuState={mobileMenuState}>
      <FooterContainer menu={menu}>
        <SiteName to={`/`}>The Durham Civil Rights Heritage Project</SiteName>
        <CollectionInfo footer />
        {!menu && (
          <>
            <AddressInfo>
              {libraryInfo.map((info, idx) => {
                return info.hasOwnProperty('url') ? (
                  <a key={idx} href={info.url}>
                    {info.text}{' '}
                  </a>
                ) : (
                  <p key={idx}>{info}</p>
                );
              })}
            </AddressInfo>
            <AdditionalInfo>
              <p>{lastUpdated}</p>
              <SiteAttribution source={siteAttribution}>{siteAttribution}</SiteAttribution>
            </AdditionalInfo>
          </>
        )}
      </FooterContainer>
    </Footer>
  );
};

const Footer = styled.footer`
  ${props => props.menu && !props.mobileMenuState && `display: none;`}
  ${props => props.menu && `margin-top: auto;`}
  height: fit-content;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.greenBean};
  position: relative;
  width: 100vw;
  z-index: 50;
  border-top: 10px solid ${props => props.theme.colors.cloudySkies};
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.theme.smContainer};
  padding-top: 33px;
  ${props => !props.menu && `padding-bottom: 50px`};

  @media ${props => props.theme.breakpoints.md} {
    ${props => props.theme.mdContainer};
    padding-top: 44px;
    padding-bottom: 56px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props => props.theme.lgContainer};
    padding-top: 64px;
    padding-bottom: 72px;
  }
`;

const SiteName = styled(NavLink)`
  font-size: 21px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  padding-bottom: 8px;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fontFamily.muli};
  font-weight: ${props => props.theme.fontWeight.black};
  line-height: ${props => props.theme.lineHeight.normal};

  @media ${props => props.theme.breakpoints.md} {
    padding-bottom: 14px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    font-size: 28px;
    padding-bottom: 11px;
  }
`;

const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media ${props => props.theme.breakpoints.lg} {
    flex-direction: row;
    align-items: center;

    & > * {
      margin-right: 20px;
    }
  }

  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const AdditionalInfo = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;

  @media ${props => props.theme.breakpoints.md} {
    padding-top: 26px;
    flex-direction: row;
    justify-content: space-between;
  }

  @media ${props => props.theme.breakpoints.lg} {
    padding-top: 72px;
  }
`;

const SiteAttribution = styled(Markdown)`
  @media ${props => props.theme.breakpoints.smMax} {
    padding-top: 30px;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }
`;



export default footer;
