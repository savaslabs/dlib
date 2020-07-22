import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SiteInfo from './SiteInfo';
import menu from '../assets/icons/menu.svg';
import { routes, cleanId, timelineDescription } from '../utils/constants';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import PropTypes from 'prop-types';

const header = ({ eventPages }) => {
  const location = useLocation();
  // Whether or not mobile menu is open.
  const [mobileMenuState, setMobileMenuState] = useState(false);
  // Whether or not submenu is open.
   const [subMenuState, setSubMenuState] = useState(false);
  // Whether or not user is hovering over submenu toggle.
  const [mouseOverSubMenuToggle, setMouseOverSubMenuToggle] = useState(false);
  // Whether or not user is hovering over submenu.
  const [mouseOverSubMenu, setMouseOverSubMenu] = useState(false);

  useEffect(() => {
    mouseOverSubMenuToggle || mouseOverSubMenu
    ? setSubMenuState(true) : setSubMenuState(false);
  }, [mouseOverSubMenuToggle, mouseOverSubMenu])
  return (
    <Header>
      <HeaderContainer>
        <Top>
          <Left>
            <SiteInfo header />
          </Left>
          {(location.pathname === '/timeline' || location.pathname === '/') && (
            <Right>{timelineDescription}</Right>
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
                <SubMenuToggle
                  key={index}
                  onFocus={() => setMouseOverSubMenuToggle(true)}
                  onKeyDown={() => setMouseOverSubMenuToggle(true)}
                  onMouseEnter={() => setMouseOverSubMenuToggle(true)}
                  onMouseLeave={() => setMouseOverSubMenuToggle(false)}
                  tabIndex='0'
                  aria-controls="menu-subMenu"
                  aria-expanded={subMenuState}
                >
                  {route.component}
                  <SubMenu
                    id="menu-subMenu"
                    onFocus={() => setMouseOverSubMenuToggle(true)}
                    onMouseEnter={() => setMouseOverSubMenu(true)}
                    onMouseLeave={() => setMouseOverSubMenu(false)}
                    hidden={
                      mouseOverSubMenu || mouseOverSubMenuToggle ? false : true
                    }
                  >
                    {eventPages &&
                      eventPages.map((page, i) => {
                        return (
                          <NavLink to={`/events/${cleanId(page.name)}`} key={i}>
                            <li>{page.name.split(',')[0]}</li>
                          </NavLink>
                        );
                      })}
                  </SubMenu>
                </SubMenuToggle>
              ) : (
                <NavLink
                  to={`/${route.route}`}
                  key={index}
                  onFocus={() => {
                    setMouseOverSubMenuToggle(false),
                      setMouseOverSubMenu(false);
                  }}
                  onKeyDown={() => {
                    setMouseOverSubMenuToggle(false),
                      setMouseOverSubMenu(false);
                  }}
                  onMouseEnter={() => {
                    setMouseOverSubMenuToggle(false),
                      setMouseOverSubMenu(false);
                  }}
                >
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

header.propTypes = {
  eventPages: PropTypes.array.isRequired,
};

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
      width: 20%;
      height: 164px;
    `}
    ${breakpoint('max')`
      width: 30%;
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
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 115px;
  `}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.p`
  display: flex;
  max-width: 735px;
  letter-spacing: 0.02em;
  font-size: ${(props) => props.theme.fontSize.sm};
  line-height: ${(props) => props.theme.lineHeight.xLoose};
  ${breakpoint('sm', 'lg')`
    padding-top: 30px;
  `}
  ${breakpoint('lg')`
    font-size: ${(props) => props.theme.fontSize.md};
    line-height: ${(props) => props.theme.lineHeight.loose};
  `}
`;

const Bottom = styled.nav`
  margin-left: auto;
  ${breakpoint('sm', 'lg')`
    position: relative;
    margin-top: -50px;
  `}
  ${breakpoint('lg')`
    z-index: 100;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    ${(props) => props.theme.containerFullWidth};
    background-color: ${(props) => props.theme.colors.bgGray};
  `}
`;

const MobileMenuToggle = styled.button`
  background: white;
  border: none;
  &:before {
    content: '';
    mask: url(${menu}) no-repeat 50% 50%;
    mask-size: cover;
    align-items: center;
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    background: ${(props) => props.theme.colors.charcoal};
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
  justify-content: flex-end;
  flex-direction: column;
  z-index: 100;
  background: ${(props) => props.theme.colors.white};
  ${(props) => props.theme.smContainer};
  ${breakpoint('sm', 'lg')`
    top: 0;
    right: 0;
    position: absolute;
  `}
  ${breakpoint('lg')`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${(props) => props.theme.colors.bgGray};
    ${(props) => props.theme.lgContainer};
  `}
  li {
    ${breakpoint('lg')`
    color: ${(props) => props.theme.colors.greenBean};
    font-size: 24px;
    letter-spacing: 0.02em;
    line-height: 1.125;
    padding: 20px 0;
  `}
  }
`;

const SubMenuToggle = styled.li`
  position: relative;
`;

const SubMenu = styled.ul`
  position: absolute;
  top: 65px;
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: -1;
  width: 400%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background: ${(props) => props.theme.colors.bgGray};

  a {
    li {
      font-size: ${(props) => props.theme.fontSize.xs};
      font-weight: ${(props) => props.theme.fontWeight.normal};
      padding: 20px 0;
      margin: 0 18px;
      border-bottom: 0.5px solid;
    }

    &:hover li,
    &:focus li {
      font-weight: ${(props) => props.theme.fontWeight.bold};
    }

    &:last-child li,
    &:nth-last-child(2) li {
      border-bottom: none;
    }
  }
`;

export default header;
