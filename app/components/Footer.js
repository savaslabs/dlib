import React from 'react';
import CollectionInfo from './CollectionInfo';
import { libraryInfo, lastUpdated } from '../utils/constants';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const footer = () => {
  return (
    <Footer id="footer">
      <FooterContainer>
        <SiteName to={`/`}>The Durham Civil Rights Heritage Project</SiteName>
        <CollectionInfo footer />
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
        <Updated>{lastUpdated}</Updated>
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
  border-top: 10px solid ${props => props.theme.colors.cloudySkies};
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${props => props.theme.smContainer};

  @media ${props => props.theme.breakpoints.md} {
    ${props => props.theme.mdContainer};
  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props => props.theme.lgContainer};
  }
`;

const SiteName = styled(NavLink)``;

const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media ${props => props.theme.breakpoints.lg} {
    flex-direction: row;
  }
`;

const Updated = styled.div``;

export default footer;
