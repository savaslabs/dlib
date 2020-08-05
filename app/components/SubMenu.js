import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { cleanId, cleanMenuNames } from '../utils/constants';
import useWindowSize from '../utils/hooks/useWindowSize';
import styled, { ThemeContext } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const subMenu = ({ setMouseOverSubMenu,
  setMouseOverSubMenuToggle,
  mouseOverSubMenu,
  mouseOverSubMenuToggle,
  eventPages }) => {
  const themeContext = useContext(ThemeContext);
  const windowSize = useWindowSize();

  const toggleSubMenu = eventType => {
    if (windowSize.width > themeContext.breakpoints.md) {
      // Tablet and desktop event handling.
      switch(eventType) {
        case 'focus':
          setMouseOverSubMenuToggle(true);
          break;
        case 'mouseenter':
          setMouseOverSubMenu(true);
        case 'mouseout':
          setMouseOverSubMenu(false);
          break;
      }
    }
  };

  return (
    <SubMenu
      id='menu-subMenu'
      onFocus={() => toggleSubMenu('focus')}
      onMouseEnter={() => toggleSubMenu('mouseenter')}
      onMouseLeave={() => toggleSubMenu('mouseleave')}
      hidden={mouseOverSubMenu || mouseOverSubMenuToggle ? false : true}
    >
      {eventPages &&
        eventPages.map((page, i) => {
          return (
            <NavLink to={`/events/${cleanId(page.name)}`} key={i}>
              <li>{cleanMenuNames(page)}</li>
            </NavLink>
          );
        })}
    </SubMenu>
  );
};

const SubMenu = styled.ul`
  ${breakpoint('sm', 'md')`
    width: 100vw;
    margin: 17px -18px 0 -18px;
    background: ${(props) => props.theme.colors.greenBean};
  `}

  ${breakpoint('md')`
    position: absolute;
    top: 53px;
    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.15);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 300%;
    background: ${(props) => props.theme.colors.bgGray};
  `}

  ${breakpoint('lg')`
    width: 400%;
    top: 65px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  `}

  a {
    li {
      font-size: ${(props) => props.theme.fontSize.xs};
      font-weight: ${(props) => props.theme.fontWeight.normal};
      padding: 20px 0;
      margin: 0 18px;
      border-bottom: 0.5px solid;

      ${breakpoint('sm', 'md')`
        color: ${(props) => props.theme.colors.white};
      `}
    }

    &:hover li,
    &:focus li {
      font-weight: ${(props) => props.theme.fontWeight.bold};
    }

    ${breakpoint('md', 'lg')`
      &:last-child li {
        border-bottom: none;
      }
    `}

    ${breakpoint('lg')`
      &:last-child li,
      &:nth-last-child(2) li {
        border-bottom: none;
      }
    `}
  }
`;

export default subMenu;
