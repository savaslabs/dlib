import React from 'react';
import { NavLink } from 'react-router-dom';
import { cleanId, cleanMenuNames } from '../utils/constants';
import styled from 'styled-components';

const subMenu = ({
  subMenuState,
  closeMenus,
  eventPages,
}) => {

  return (
    <SubMenu
      id="menu-subMenu"
      hidden={!subMenuState}
    >
      {eventPages &&
        eventPages.map((page, i) => {
          return (
            <SubmenuItem key={i}>
              <NavLink
                to={`/events/${cleanId(page.name)}`}
                onClick={e => closeMenus(e, 'click')}
                onKeyDown={e => e.key === 'Enter' && closeMenus(e, 'keyboard')}
              >
                {cleanMenuNames(page)}
              </NavLink>
            </SubmenuItem>
          );
        })}
    </SubMenu>
  );
};

const SubMenu = styled.ul`
  @media ${props => props.theme.breakpoints.smMax} {
    width: 100vw;
    margin: 17px -18px 0 -18px;
    background: ${props => props.theme.colors.greenBean};
  }

  @media ${props => props.theme.breakpoints.md} {
    position: absolute;
    top: 53px;
    box-shadow: ${props => props.theme.boxShadow.xLight};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 300%;
    background: ${props => props.theme.colors.bgGray};
  }

  @media ${props => props.theme.breakpoints.lg} {
    width: 400%;
    top: 65px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SubmenuItem = styled.li`
  font-size: ${props => props.theme.fontSize.xs};
  font-weight: ${props => props.theme.fontWeight.regular};
  padding: 20px 0;
  margin: 0 18px;
  border-bottom: 0.5px solid ${props => props.theme.colors.white};

  @media ${props => props.theme.breakpoints.md} {
    border-bottom-color: ${props => props.theme.colors.greenBean};
  }

  a {
    @media ${props => props.theme.breakpoints.smMax} {
      color: ${props => props.theme.colors.white} !important;
    }
  }

  &:hover a,
  &:focus a {
    font-weight: ${props => props.theme.fontWeight.bold};

    @media ${props => props.theme.breakpoints.md} {
      font-weight: ${props => props.theme.fontWeight.semiBold};
    }
  }

  &:last-child {
    /* stylelint-disable-next-line declaration-property-value-blacklist */
    border-bottom: none;
  }

  &:last-child,
  &:nth-last-child(2) {
    @media ${props => props.theme.breakpoints.lg} {
      /* stylelint-disable-next-line declaration-property-value-blacklist */
      border-bottom: none;
    }
  }
`;


export default subMenu;
