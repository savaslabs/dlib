import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { routes, cleanId, timelineDescription } from '../utils/constants';
import menu from 'react-svg-loader!../assets/menu.svg';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const header = ({ eventPages }) => {
  const location = useLocation();
  // Whether or not mobile menu is open.
  const [mobileMenuState, setMobileMenuState] = useState(false);
  // Whether or not user is hovering over expandable menu item.
  const [mouseOverMenuExpandToggle, setMouseOverMenuExpandToggle] = useState(false);
  // Whether or not user is hovering over expanded menu.
  const [mouseOverExpandableMenu, setMouseOverExpandableMenu] = useState(false);
  return (
    <Header>
      <HeaderContainer>
        <Top>
          <Left>
            <SiteName>The Durham Civil Rights Heritage Project</SiteName>
            <CollectionInfo>
              <p>
                Part of the <a>North Carolina Collection</a> of the{' '}
                <a>Durham County Library</a>
              </p>
            </CollectionInfo>
          </Left>
          {(location.pathname === '/timeline' ||
            location.pathname === '/') && (
              <Right>
                {timelineDescription}
              </Right>
            )}
        </Top>
        <Bottom>
          <MobileMenuToggle
            onClick={() => setMobileMenuState(!mobileMenuState)}
          >
            <ScreenReaderText>{`${
              mobileMenuState ? 'Close' : 'Open'
            } Menu`}</ScreenReaderText>
          </MobileMenuToggle>
          <Menu state={mobileMenuState}>
            {routes.map((route, index) => {
              return route.component === 'Featured Events' ? (
                <ExpandToggle
                  key={index}
                  onKeyDown={() => setMouseOverMenuExpandToggle(true)}
                  onMouseEnter={() => setMouseOverMenuExpandToggle(true)}
                  onMouseLeave={() => setMouseOverMenuExpandToggle(false)}
                  tabIndex='0'
                >
                  {route.component}
                  <Expandable
                    onMouseEnter={() => setMouseOverExpandableMenu(true)}
                    onMouseLeave={() => setMouseOverExpandableMenu(false)}
                    hidden={
                      mouseOverExpandableMenu || mouseOverMenuExpandToggle
                        ? false
                        : true
                    }
                  >
                    {eventPages &&
                      eventPages.map((page, i) => {
                        return (
                          <NavLink to={`/events/${cleanId(page.name)}`} key={i}>
                            <li>{page.name}</li>
                          </NavLink>
                        );
                      })}
                  </Expandable>
                </ExpandToggle>
              ) : (
                <NavLink to={`/${route.route}`} key={index}>
                  <li>{route.component}</li>
                </NavLink>
              );
            })}
          </Menu>
        </Bottom>
      </HeaderContainer>
    </Header>
  );
}

const Header = styled.header`
  position: relative;
  margin-top: 74px;
  ::before {
    content: '';
    background-color: ${(props) => props.theme.colors.greenBean};
    height: 130px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;
    ${breakpoint('lg')`
      width: 25%;
      height: 164px;
    `}
    ${breakpoint('max')`
      width: 35%;
    `}
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  ${(props) => props.theme.smContainer};
  ${breakpoint('lg')`
    flex-direction: column;
    ${(props) => props.theme.lgContainer};
  `}
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('lg')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 115px;
  `}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const SiteName = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-weight: 700;
  line-height: ${(props) => props.theme.lineHeight.snug};
  letter-spacing: 0.02em;
  font-size: ${(props) => props.theme.fontSize.md};
  padding-top: 20px;
  max-width: 248px;
  ${breakpoint('lg')`
    font-size: 31px;
    line-height: 1.31;
  `}
`;

const CollectionInfo = styled.div`
  padding-top: 22px;
  color: ${(props) => props.theme.colors.greenBean};
  p a {
    text-decoration: underline;
  }
`;

const Right = styled.p`
  display: flex;
  max-width: 735px;
  font-size: ${(props) => props.theme.fontSize.sm};
  line-height: ${(props) => props.theme.lineHeight.extraLoose};
  ${breakpoint('lg')`
    font-size: ${(props) => props.theme.fontSize.md};
    line-height: ${(props) => props.theme.lineHeight.loose};
  `}
`;

const Bottom = styled.nav`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 100;
  ${(props) => props.theme.containerFullWidth};
  background-color: ${(props) => props.theme.colors.bgGray};
`;

const MobileMenuToggle = styled.button`
  position: relative;
  &:before {
    content: url(${menu});
    position: absolute;
    top: 15px;
  }
  ${breakpoint('lg')`
    display: none;
  `}
`;

const ScreenReaderText = styled.span`
  ${(props) => props.theme.srOnly};
`;

const Menu = styled.ul`
  display: ${(props) => (props.state ? 'flex' : 'none')};
  ${breakpoint('lg')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 25px;
    ${(props) => props.theme.lgContainer};
    li, a {
      text-decoration: none;
      color: #41796f;
      font-size: 24px;
      letter-spacing: 0.02em;
      line-height: 1.125;
    }
  `}
`;

const ExpandToggle = styled.li`
  position: relative;
`;

const Expandable = styled.ul`
  position: absolute;
  top: 41px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: -1;
  width: 150%;
  background: ${(props) => props.theme.colors.bgGray};

  a li {
    font-size: 16px;
    font-weight: 500;
    padding: 20px;
    border-bottom: 1px solid;
  }
`;

export default header;
