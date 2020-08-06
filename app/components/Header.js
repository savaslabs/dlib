import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SiteInfo from './SiteInfo';
import SubMenu from './SubMenu';
import menu from '../assets/icons/menu.svg';
import caret from '../assets/icons/caret.svg';
import { routes, timelineDescription } from '../utils/constants';
import useWindowSize from '../utils/hooks/useWindowSize';
import styled, { ThemeContext } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Helmet } from 'react-helmet';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';

const header = ({ eventPages }) => {
  const location = useLocation();
  const themeContext = useContext(ThemeContext);
  const windowSize = useWindowSize();
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
      ? setSubMenuState(true)
      : setSubMenuState(false);
  }, [mouseOverSubMenuToggle, mouseOverSubMenu]);

  // Ensure focus lock only is occuring on mobile screenwidths.
  useEffect(() => {
    windowSize.width > themeContext.breakpoints.md && setMobileMenuState(false);
  }, [windowSize.width]);

  const toggleSubMenu = (eventType, isToggle, event) => {
    // SubMenu toggle or other top-level nav item.
    switch (isToggle) {
      case true:
        // Event handling shared by all screen sizes.
        switch (eventType) {
          case 'keydown':
            if (event.which === 13) {
              setMouseOverSubMenuToggle(!subMenuState);
            }
            break;
        }

        // Handle event states for tablet/desktop.
        if (windowSize.width > themeContext.breakpoints.md) {
          switch (eventType) {
            case 'mouseenter':
              setMouseOverSubMenuToggle(true);
              break;
            case 'mouseleave':
              setMouseOverSubMenuToggle(false);
              break;
            case 'focus':
              setMouseOverSubMenuToggle(true);
              break;
          }
        } else {
          // Hanlde event states for mobile.
          switch (eventType) {
            case 'click':
              setMouseOverSubMenuToggle(!subMenuState);
              break;
          }
        }
        break;
      case false:
        if (windowSize.width > themeContext.breakpoints.md) {
          switch (eventType) {
            case 'focus':
            case 'mouseenter':
              setMouseOverSubMenuToggle(false);
              setMouseOverSubMenu(false);
              break;
            case 'keydown':
              if (event.which === 13) {
                setMouseOverSubMenuToggle(false);
                setMouseOverSubMenu(false);
                break;
              }
          }
        }
        break;
    }
  };

  return (
    <>
      <Helmet>
        <html style={mobileMenuState ? 'overflow: hidden;' : null} />
        <body style={mobileMenuState ? themeContext.noScrollBody : null} />
      </Helmet>
      <Header>
        <HeaderContainer>
          <Top>
            <Left>
              <SiteInfo header='true' />
            </Left>
            {(location.pathname === '/timeline' ||
              location.pathname === '/') && (
              <Right>{timelineDescription}</Right>
            )}
          </Top>
          <FocusLock disabled={!mobileMenuState}>
            <Nav>
              <NavContainer state={mobileMenuState}>
                <MobileMenuToggle
                  state={mobileMenuState}
                  onClick={() => setMobileMenuState(!mobileMenuState)}
                >
                  <ScreenReaderText>{`${
                    mobileMenuState ? 'Close' : 'Open'
                  } Menu`}</ScreenReaderText>
                </MobileMenuToggle>
                <Menu state={mobileMenuState} subMenu={subMenuState}>
                  {routes.map((route, index) => {
                    return route.component === 'Featured Events' ? (
                      <SubMenuToggle
                        key={index}
                        state={mobileMenuState}
                        subMenu={subMenuState}
                        onFocus={() => toggleSubMenu('focus', true)}
                        onClick={() => toggleSubMenu('click', true)}
                        onKeyDown={(e) => toggleSubMenu('keydown', true, e)}
                        onMouseEnter={() => toggleSubMenu('mouseenter', true)}
                        onMouseLeave={() => toggleSubMenu('mouseleave', true)}
                        tabIndex='0'
                        aria-controls='menu-subMenu'
                        aria-expanded={subMenuState}
                      >
                        {route.component}
                        <SubMenu
                          setMouseOverSubMenu={setMouseOverSubMenu}
                          setMouseOverSubMenuToggle={setMouseOverSubMenuToggle}
                          mouseOverSubMenu={mouseOverSubMenu}
                          mouseOverSubMenuToggle={mouseOverSubMenuToggle}
                          eventPages={eventPages}
                        />
                      </SubMenuToggle>
                    ) : (
                      <NavLink
                        to={`/${route.route}`}
                        key={index}
                        onFocus={() => toggleSubMenu('focus')}
                        onKeyDown={(e) => toggleSubMenu('keydown', false, e)}
                        onMouseEnter={() => toggleSubMenu('mouseenter')}
                      >
                        <li>{route.component}</li>
                      </NavLink>
                    );
                  })}
                </Menu>
                <SiteNameWrapper state={mobileMenuState}>
                  <SiteName>The Durham Civil Rights Heritage Project</SiteName>
                </SiteNameWrapper>
              </NavContainer>
            </Nav>
          </FocusLock>
        </HeaderContainer>
      </Header>
    </>
  );
};

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
    ${breakpoint('md')`
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
  ${breakpoint('md')`
    flex-direction: column;
    ${(props) => props.theme.lgContainer};
  `}
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint('md')`
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
  ${breakpoint('sm', 'md')`
    padding-top: 30px;
  `}
  ${breakpoint('md')`
    font-size: ${(props) => props.theme.fontSize.md};
    line-height: ${(props) => props.theme.lineHeight.loose};
  `}
`;

const Nav = styled.nav`
  ${breakpoint('sm', 'md')`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  `}
  ${breakpoint('md')`
    z-index: 999;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    ${(props) => props.theme.containerFullWidth};
    background-color: ${(props) => props.theme.colors.bgGray};
  `}
`;

const NavContainer = styled.div`
  ${breakpoint('sm', 'md')`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    ${(props) =>
      props.state &&
      `
      align-items: center;
      width: 100%;
      background: white;
    `}
    ${(props) =>
      props.state ||
      `
      align-items: flex-end;
    `}
  `}
`;

const SiteNameWrapper = styled.div`
  ${(props) => !props.state && `display: none;`}
  width: 100%;
  height: 140px;
  background: ${(props) => props.theme.colors.greenBean};
`;

const SiteName = styled.p`
  max-width: 250px;
  color: ${(props) => props.theme.colors.white};
  font-size: 21px;
  line-height: 1.14;
  letter-spacing: 0.02em;
  padding: 34px 18px;
`;

const MobileMenuToggle = styled.button`
  z-index: 20;
  margin-top: 40px;
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
    right: 10px;
    background: ${(props) => props.theme.colors.charcoal};
  }
  ${breakpoint('sm', 'md')`
    display: flex;
    align-self: flex-end;
  `}

  ${breakpoint('md')`
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
  ${breakpoint('sm', 'md')`
    ${(props) =>
      props.state &&
      `
        width: calc(100vw - 36px);
        display: flex;
        padding-top: 40px;
        flex-direction: column;
        justify-content: start;
        align-items: center;

        a {
          width: 100%;
          text-align: center;
        }
    `}
  `}

  ${breakpoint('md')`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${(props) => props.theme.colors.bgGray};
    ${(props) => props.theme.lgContainer};
  `}

  a:hover li,
  a:focus li {
    font-weight: ${(props) => props.theme.fontWeight.bold};
  }

  a li {
    padding: 20px 0 17px 0;
  }

  a + li {
    padding-top: 20px;

    ${breakpoint('sm', 'md')`
      ${(props) => !props.subMenu && `padding-bottom: 17px;`}
    `}
  }

  li {
    color: ${(props) => props.theme.colors.greenBean};
    line-height: 1.12;
    font-size: 24px;

    ${breakpoint('sm', 'md')`
      border-bottom: 1px solid ${(props) => props.theme.colors.greenBean};
    `}

    ${breakpoint('md')`
      font-size: 16px;
      letter-spacing: 0.02em;
    `};

    ${breakpoint('lg')`
      font-size: 24px;
      line-height: 1.125;
      padding: 20px 0;
    `}
  }
`;

const SubMenuToggle = styled.li`
  position: relative;

  ${breakpoint('sm', 'md')`

    ${(props) =>
      props.state &&
      `
        width: 100%;
        text-align: center;
    `}

    ${(props) =>
      props.state &&
      props.subMenu &&
      `
      :after {
        mask: url(${caret}) no-repeat 50% 50%;
        mask-size: cover;
        align-items: center;
        display: inline-block;
        position: relative;
        width: 13px;
        height: 5px;
        background: black;
        border: solid 2px black;
        left: 10px;
        top: -2px;
      }
    `}

    ${(props) =>
      props.state &&
      !props.subMenu &&
      `
      :after {
        content: '';
        mask: url(${caret}) no-repeat 50% 50%;
        transform: rotate(180deg);
        mask-size: cover;
        align-items: center;
        display: inline-block;
        position: relative;
        width: 13px;
        height: 5px;
        background: black;
        border: solid 2px black;
        left: 10px;
        top: -2px;
      }
    `}
  `}
`;

export default header;
