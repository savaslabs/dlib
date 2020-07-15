import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const footer = () => {
  return (
    <Footer>
      <FooterContainer>
        <SiteName>The Durham Civil Rights Heritage Project</SiteName>
        <CollectionInfo>
          <p>
            Part of the <a>North Carolina Collection</a> of the{' '}
            <a>Durham County Library</a>
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
  width: 100vw;
  ${breakpoint('lg')`
    height: 361px;
  `}
`;

const FooterContainer = styled.div`
  ${props => props.theme.lgContainer};
`;

const SiteName = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-weight: 700;
  line-height: ${(props) => props.theme.lineHeight.snug};
  letter-spacing: 0.02em;
  font-size: ${(props) => props.theme.fontSize.md};
  padding-top: 47px;
  max-width: 248px;
  ${breakpoint('lg')`
    font-size: 31px;
    line-height: 1.31;
  `}
`;

const CollectionInfo = styled.div`
  padding-top: 22px;
  p a {
    text-decoration: underline;
  }
`;

export default footer;
