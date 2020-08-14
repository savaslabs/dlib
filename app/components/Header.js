import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SiteInfo from './SiteInfo';
import SubMenu from './SubMenu';
import menuOpen from '../assets/icons/menu--open.svg';
import menuClose from '../assets/icons/menu--close.svg';
import { routes, timelineDescription } from '../utils/constants';
import useWindowSize from '../utils/hooks/useWindowSize';
import styled, { ThemeContext } from 'styled-components';
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
    mouseOverSubMenuToggle || mouseOverSubMenu ? setSubMenuState(true) : setSubMenuState(false);
  }, [mouseOverSubMenuToggle, mouseOverSubMenu]);

  // Ensure focus lock only is occuring on mobile screenwidths.
  useEffect(() => {
    windowSize.width >= 768 && setMobileMenuState(false);
  }, [windowSize.width]);

  // Handle user interaction with nav items, submenu toggle, and submenu.
  const toggleSubMenu = (eventType, isToggle, event) => {
    switch (isToggle) {
      case true:
        // Event handling shared by all screen sizes for subMenu toggle.
        switch (eventType) {
          case 'keydown':
            if (event.which === 13) {
              setMouseOverSubMenuToggle(!subMenuState);
            }
            break;
        }

        // Tablet/desktop event handling for subMenu toggle.
        if (windowSize.width >= 768) {
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
          // Mobile event handling for subMenu toggle.
          switch (eventType) {
            case 'click':
              setMouseOverSubMenuToggle(!subMenuState);
              break;
          }
        }
        break;
      case false:
        // Tablet/desktop event handling for top level nav items.
        if (windowSize.width >= 768) {
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
        } else {
          // Mobile event handling for top level nav items.
          switch (eventType) {
            case 'focus':
              setMobileMenuState(false);
              break;
            case 'keydown':
              if (event.which === 13) {
                setMobileMenuState(false);
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
              <SiteInfo header="true" />
            </Left>
            {(location.pathname === '/timeline' || location.pathname === '/') && (
              <Right>{timelineDescription}</Right>
            )}
          </Top>
          <FocusLock disabled={!mobileMenuState}>
            <Nav state={mobileMenuState}>
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
                        onKeyDown={e => toggleSubMenu('keydown', true, e)}
                        onMouseEnter={() => toggleSubMenu('mouseenter', true)}
                        onMouseLeave={() => toggleSubMenu('mouseleave', true)}
                        tabIndex="0"
                        aria-controls="menu-subMenu"
                        aria-expanded={subMenuState}
                      >
                        {route.component}
                        <SubMenu
                          setMobileMenuState={setMobileMenuState}
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
                        onFocus={() => toggleSubMenu('focus', false)}
                        onKeyDown={e => toggleSubMenu('keydown', false, e)}
                        onMouseEnter={() => toggleSubMenu('mouseenter', false)}
                      >
                        <li>{route.component}</li>
                      </NavLink>
                    );
                  })}
                </Menu>
                <SiteNameWrapper state={mobileMenuState}>
                  <SiteName>
                    The Durham
                    <br />
                    Civil Rights
                    <br />
                    Heritage Project
                  </SiteName>
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
  background: ${props => props.theme.colors.white};
  z-index: 100;
  padding-top: 74px;

  ::before {
    content: '';
    background-color: ${props => props.theme.colors.greenBean};
    height: 130px;
    position: absolute;
    margin-top: 74px;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;

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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  ${props => props.theme.smContainer};

  @media ${props => props.theme.breakpoints.md} {
    flex-direction: column;
    ${props => props.theme.lgContainer};
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;

  @media ${props => props.theme.breakpoints.md} {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 115px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.p`
  display: flex;
  letter-spacing: 0.02em;
  font-size: ${props => props.theme.fontSize.sm};
  line-height: ${props => props.theme.lineHeight.xLoose};

  @media ${props => props.theme.breakpoints.smMax} {
    padding-top: 30px;
  }

  @media ${props => props.theme.breakpoints.md} {
    max-width: 425px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    padding-left: 30px;
    flex: 1;
    max-width: 735px;
    font-size: ${props => props.theme.fontSize.md};
    line-height: ${props => props.theme.lineHeight.loose};
  }
`;

const Nav = styled.nav`
  @media ${props => props.theme.breakpoints.smMax} {
    display: block;
    ${props => props.state && `position: fixed;`}
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }

  @media ${props => props.theme.breakpoints.md} {
    z-index: 999;
    ${props => props.theme.containerFullWidth};
    background-color: ${props => props.theme.colors.bgGray};
    box-shadow: ${props => props.theme.boxShadow.med};
  }
`;

const NavContainer = styled.div`
  @media ${props => props.theme.breakpoints.smMax} {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    ${props =>
      props.state &&
      `
      align-items: center;
      background: white;
    `}
    ${props =>
      props.state ||
      `
      align-items: flex-end;
    `}
  }
`;

const SiteNameWrapper = styled.div`
  ${props => !props.state && `display: none;`}
  width: 100%;
  height: 140px;
  background: ${props => props.theme.colors.greenBean};
  margin-top: auto;
`;

const SiteName = styled.p`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSize.md};
  line-height: ${props => props.theme.lineHeight.snug};
  letter-spacing: 0.02em;
  padding: 34px 18px;
`;

const MobileMenuToggle = styled.button`
  z-index: 20;
  margin-top: 30px;
  background: ${props => props.theme.colors.white};

  /* stylelint-disable-next-line declaration-property-value-blacklist */
  border: none;

  @media ${props => props.theme.breakpoints.smMax} {
    display: flex;
    align-self: flex-end;
  }

  @media ${props => props.theme.breakpoints.md} {
    display: none;
  }

  &:before {
    content: '';
    ${props => !props.state && `mask: url('./app/assets/icons/menu--open.svg') no-repeat 50% 50%;`}
    ${props =>
      props.state &&
      `mask: url('./app/assets/icons/menu--close.svg') no-repeat 50% 50%;`}
    mask-size: cover;
    align-items: center;
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    right: 10px;
    background: ${props => props.theme.colors.charcoal};
  }
`;

const ScreenReaderText = styled.span`
  ${props => props.theme.srOnly};
`;

const Menu = styled.ul`
  display: ${props => (props.state ? 'flex' : 'none')};
  justify-content: flex-end;
  flex-direction: column;
  z-index: 100;
  background: ${props => props.theme.colors.white};
  ${props => props.theme.smContainer};

  @media ${props => props.theme.breakpoints.smMax} {
    ${props =>
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
  }

  @media ${props => props.theme.breakpoints.md} {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${props => props.theme.colors.bgGray};
    ${props => props.theme.lgContainer};
  }

  a:hover li,
  a:focus li {
    font-weight: ${props => props.theme.fontWeight.bold};
  }

  a li {
    padding: 20px 0 17px 0;
  }

  a + li {
    padding-top: 20px;

    @media ${props => props.theme.breakpoints.smMax} {
      ${props => !props.subMenu && `padding-bottom: 17px;`}
    }
  }

  li {
    color: ${props => props.theme.colors.greenBean};
    line-height: ${props => props.theme.lineHeight.tight};
    font-size: ${props => props.theme.fontSize.lg};

    @media ${props => props.theme.breakpoints.smMax} {
      border-bottom: 1px solid ${props => props.theme.colors.greenBean};
    }

    @media ${props => props.theme.breakpoints.md} {
      font-size: ${props => props.theme.fontSize.xs};
      letter-spacing: 0.02em;
    }

    @media ${props => props.theme.breakpoints.lg} {
      font-size: ${props => props.theme.fontSize.lg};
      padding: 20px 0;
    }
  }
`;

const SubMenuToggle = styled.li`
  position: relative;

  @media ${props => props.theme.breakpoints.smMax} {
    ${props =>
      props.state &&
      `
        width: 100%;
        text-align: center;

        &:after {
          content: '';
          mask: url('./app/assets/icons/caret.svg') no-repeat 50% 50%;
          mask-size: cover;
          align-items: center;
          display: inline-block;
          position: relative;
          width: 13px;
          height: 5px;
          background: ${props.theme.colors.greenBean};
          border: solid 2px ${props.theme.colors.greenBean};
        }
    `}

    ${props =>
      props.state && !props.subMenu
        ? `
      &:after {
        transform: rotate(180deg);
        left: 10px;
        top: -2px;
      }
    `
        : `
      &:after {
        left: 110px;
        top: -718px;
      }
    `}
  }

  &:hover {
    font-weight: ${props => props.theme.fontWeight.bold};
  }
`;

export default header;
