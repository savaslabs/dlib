import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import CollectionInfo from './CollectionInfo';
import SubMenu from './SubMenu';
import Footer from './Footer';
import { routes, timelineDescription, siteURL, pathToImages } from '../utils/constants';
import useWindowSize from '../utils/hooks/useWindowSize';
import { LightboxContext } from '../utils/lightboxContext';
import styled, { ThemeContext } from 'styled-components';
import { Helmet } from 'react-helmet';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';

const header = ({ eventPages, skipRef }) => {
  const location = useLocation();
  const themeContext = useContext(ThemeContext);
  const windowSize = useWindowSize();
  const { isLightboxOpen } = useContext(LightboxContext);
  // Whether or not mobile menu is open.
  const [mobileMenuState, setMobileMenuState] = useState(false);
  // Whether or not submenu is open.
  const [subMenuState, setSubMenuState] = useState(false);
  const [preventScroll, setPreventScroll] = useState(false);

  // Ensure focus lock only is occuring on mobile screenwidths.
  useEffect(() => {
    windowSize.width >= 768 && setMobileMenuState(false);
  }, [windowSize.width]);

  const toggleSubMenu = e => {
    setSubMenuState(!subMenuState);
  };

  // If submenu nav links are clicked, close menus.
  const closeMenus = (e, type) => {
    setMobileMenuState(false);
    setSubMenuState(false);
    if (type === 'keyboard') skipRef.current.focus();
  };

  useEffect(() => {
    isLightboxOpen || mobileMenuState ? setPreventScroll(true) : setPreventScroll(false);
  }, [isLightboxOpen, mobileMenuState]);

  return (
    <>
      <Helmet>
        <html style={preventScroll ? 'overflow: hidden;' : null} />
        <body style={preventScroll ? themeContext.noScrollBody : null} />
      </Helmet>
      <Header>
        <HeaderContainer>
          <Top>
            <SiteInfo>
              <SiteName to={`/`}>The Durham Civil Rights Heritage Project</SiteName>
              <CollectionInfo header />
            </SiteInfo>
          </Top>
          {location.pathname === '/' && (
            <Bottom>
              <Desc>
                <p>Introduction</p>
                <p>{timelineDescription}</p>
              </Desc>
            </Bottom>
          )}
          <FocusLock disabled={!mobileMenuState}>
            <Nav state={mobileMenuState}>
              <NavContainer state={mobileMenuState}>
                <MobileMenuToggle
                  state={mobileMenuState}
                  onClick={() => setMobileMenuState(!mobileMenuState)}
                >
                  <ScreenReaderText>{`${mobileMenuState ? 'Close' : 'Open'}`}</ScreenReaderText>Menu
                </MobileMenuToggle>
                <Menu state={mobileMenuState} subMenu={subMenuState}>
                  {routes.map((route, index) => {
                    return route.component === 'Featured Events' ? (
                      <SubMenuToggle
                        key={index}
                        tabIndex="0"
                        state={mobileMenuState}
                        subMenu={subMenuState}
                        onClick={toggleSubMenu}
                        onKeyDown={e => e.which === 13 && toggleSubMenu(e)}
                        aria-controls="menu-subMenu"
                        aria-expanded={subMenuState}
                      >
                        {route.component}
                        <SubMenu
                          subMenuState={subMenuState}
                          closeMenus={closeMenus}
                          eventPages={eventPages}
                        />
                      </SubMenuToggle>
                    ) : (
                      <MenuItem key={index}>
                        <NavLink
                          to={route.route === 'timeline' ? `/` : `/${route.route}`}
                          onClick={e => closeMenus(e, 'click')}
                          onKeyDown={e => e.key === 'Enter' && closeMenus(e, 'keyboard')}
                        >
                          {route.component}
                        </NavLink>
                      </MenuItem>
                    );
                  })}
                </Menu>
                <Footer menu={true} mobileMenuState={mobileMenuState} />
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
  border-top: 10px solid ${props => props.theme.colors.greenBean};
  z-index: 100;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  background: ${props => props.theme.colors.cloudySkies} url(${pathToImages}header-hero@1x.png);
  background-size: auto 100%;
  background-position: center;
  background-repeat: repeat-x;

  /* Retina-specific image, Safari */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background: ${props => props.theme.colors.cloudySkies} url (${pathToImages}header-hero@2x.png);
  }
`;

const SiteInfo = styled.div`
  ${props => props.theme.smContainer};
  padding-top: 47px;
  position: relative;

  @media ${props => props.theme.breakpoints.smMax} {
    padding-left: 50px;
    margin-left: 42px;
    max-width: 300px;
  }

  @media ${props => props.theme.breakpoints.md} {
    ${props => props.theme.mdContainer};
    padding-top: 238px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props => props.theme.lgContainer};
    padding-top: 238px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 5px;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);
    left: 0;

    @media ${props => props.theme.breakpoints.md} {
      left: 55px;
    }

    @media ${props => props.theme.breakpoints.lg} {
      left: 70px;
    }
  }
`;

const SiteName = styled.p`
  position: relative;
  color: ${props => props.theme.colors.greenBean};
  font-weight: ${props => props.theme.fontWeight.black};
  letter-spacing: -0.01em;
  text-transform: uppercase;
  font-family: ${props => props.theme.fontFamily.muli};
  font-size: ${props => props.theme.fontSize.md};
  line-height: ${props => props.theme.lineHeight.normal};

  @media ${props => props.theme.breakpoints.md} {
    font-size: ${props => props.theme.fontSize.xxl};
    padding-left: 110px;
  }

  @media ${props => props.theme.breakpoints.lg} {
    padding-left: 142px;
    font-size: ${props => props.theme.fontSize.xxxl};
  }

  &:before {
    content: '';
    position: absolute;
    width: 61px;
    height: 61px;
    left: -78px;
    border-radius: 50%;
    background: ${props => props.theme.colors.greenBean};

    @media ${props => props.theme.breakpoints.md} {
      width: 78px;
      height: 78px;
      left: 0px;
    }

    @media ${props => props.theme.breakpoints.lg} {
      width: 107.84px;
      height: 107.84px;
    }
  }

  &:after {
    content: url(${siteURL}/app/assets/icons/stars.svg);
    position: absolute;

    @media ${props => props.theme.breakpoints.smMax} {
      transform: scale(0.75);
      left: -67px;
      top: -5px;
    }

    @media ${props => props.theme.breakpoints.md} {
      left: 25px;
      top: 0;
    }

    @media ${props => props.theme.breakpoints.lg} {
      transform: scale(1.25);
      left: 50px;
      top: 10px;
    }
  }
`;

const Bottom = styled.div`
  background: ${props => props.theme.colors.white};
`;

const Desc = styled.div`
  ${props => props.theme.smContainer};
  padding-top: 21px;
  padding-bottom: 45px;
  position: relative;

  @media ${props => props.theme.breakpoints.md} {
    ${props => props.theme.mdContainer};
    padding: 39px 20px 52px 20px;

    p {
      padding-left: 110px;
      width: 70%;
    }

    &::before {
      content: '';
      position: absolute;
      width: 5px;
      top: 0;
      bottom: 0;
      background: #ededed;
      left: 55px;
    }
  }

  @media ${props => props.theme.breakpoints.lg} {
    ${props => props.theme.lgContainer};
    padding: 45px 18px 64px 18px;

    p {
      padding-left: 142px;
    }

    &::before {
      left: 70px;
    }
  }

  > p:first-child {
    text-transform: uppercase;
    line-height: 1.6;
    font-size: 18px;
    padding-bottom: 5px;
    color: ${props => props.theme.colors.greenBean};
    font-family: ${props => props.theme.fontFamily.muli};
    font-weight: ${props => props.theme.fontWeight.extraBold};
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
    box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.15);
  }
`;

const NavContainer = styled.div`
  @media ${props => props.theme.breakpoints.smMax} {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    ${props =>
      props.state &&
      `
      align-items: center;
      background: white;
      height: 100%;
      border-top: 10px solid #41796F;
    `}
    ${props =>
      props.state ||
      `
      align-items: flex-end;
    `}
  }
`;

const MobileMenuToggle = styled.button`
  z-index: 20;
  color: ${props => props.theme.colors.white};
  background: ${props => props.theme.colors.greenBean};
  font-weight: ${props => props.theme.fontWeight.bold};
  line-height: ${props => props.theme.lineHeight.normal};
  font-family: ${props => props.theme.fontFamily.muli};
  border-radius: 0 0 6px 6px;
  padding: 10px 12px;
  margin-top: -10px;
  margin-right: 20px;
  text-transform: uppercase;

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
    ${props =>
      !props.state &&
      `mask: url(${siteURL}/app/assets/icons/menu--open.svg) no-repeat 50% 50%;`}
    ${props => props.state && `mask: url(${siteURL}/app/assets/icons/menu--close.svg) no-repeat 50% 50%;`}
    mask-size: cover;
    align-items: center;
    display: inline-block;
    width: 20px;
    height: 15px;
    margin-right: 10px;
    background: ${props => props.theme.colors.white};
  }
`;

const ScreenReaderText = styled.span`
  ${props => props.theme.srOnly};
`;

const MenuItem = styled.li`
  color: ${props => props.theme.colors.greenBean};
  line-height: ${props => props.theme.lineHeight.tight};
  font-size: ${props => props.theme.fontSize.lg};

  @media ${props => props.theme.breakpoints.smMax} {
    border-bottom: 1px solid ${props => props.theme.colors.greenBean};
    padding: 20px 0 17px 0;
    width: 100%;
    text-align: center;

    &:last-child {
      /* stylelint-disable-next-line declaration-property-value-blacklist */
      border-bottom: none;
    }
  }

  @media ${props => props.theme.breakpoints.md} {
    font-size: ${props => props.theme.fontSize.xs};
    font-weight: ${props => props.theme.fontWeight.semiBold};
    letter-spacing: 0.02em;
  }

  @media ${props => props.theme.breakpoints.lg} {
    font-size: ${props => props.theme.fontSize.lg};
    padding: 20px 0;
  }

  a {
    color: ${props => props.theme.colors.greenBean};

    &:hover,
    &:focus {
      text-shadow: 0 0 0.4px ${props => props.theme.colors.greenBean},
        0 0 0.4px ${props => props.theme.colors.greenBean};
    }
  }
`;

const SubMenuToggle = styled(MenuItem)`
  position: relative;
  padding-top: 20px;

  @media ${props => props.theme.breakpoints.smMax} {
    ${props => !props.subMenu && `padding-bottom: 17px;`}
    ${props =>
      props.state &&
      `
        width: 100%;
        text-align: center;

        &:after {
          content: '';
          mask: url(${siteURL}/app/assets/icons/caret.svg) no-repeat 50% 50%;
          mask-size: cover;
          align-items: center;
          display: inline-block;
          position: absolute;
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
        top: 50%;
        margin-left: 9px;
      }
    `
        : `
      &:after {
        top: 30px;
        margin-left: 100px;
      }
    `}

    &:hover,
    &:focus {
      font-weight: ${props => props.theme.fontWeight.bold};
    }
  }

  @media ${props => props.theme.breakpoints.md} {
    &:hover,
    &:focus {
      text-shadow: 0 0 0.4px ${props => props.theme.colors.greenBean},
        0 0 0.4px ${props => props.theme.colors.greenBean};

      a {
        text-shadow: none;
      }
    }
  }

  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

const Menu = styled.ul`
  display: ${props => (props.state ? 'flex' : 'none')};
  justify-content: flex-end;
  flex-direction: column;
  z-index: 100;
  font-family: ${props => props.theme.fontFamily.muli};
  background: ${props => props.theme.colors.white};
  ${props => props.theme.smContainer};

  @media ${props => props.theme.breakpoints.smMax} {
    ${props =>
      props.state &&
      `
        width: calc(100vw - 36px);
        display: flex;
        margin-top: 40px;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    `}
  }

  @media ${props => props.theme.breakpoints.md} {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${props => props.theme.colors.bgGray};
    ${props => props.theme.mdContainer};
  }

  @media ${props => props.theme.breakpoints.lg} {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${props => props.theme.colors.bgGray};
    ${props => props.theme.lgContainer};
  }
`;

export default header;
