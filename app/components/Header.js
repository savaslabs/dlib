import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { routes, cleanId } from '../utils/utils';
import styled from 'styled-components';

const Header = styled.header`
  position: relative;
  margin-top: 74px;
  ::before {
    content: '';
    background-color: #41796f;
    height: 164px;
    position: absolute;
    left: 0;
    top: 0;
    width: 25%;
    z-index: -1;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 115px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const SiteName = styled.div`
  max-width: 248px;
  color: white;
  font-weight: 700;
  line-height: 1.31;
  letter-spacing: 0.02em;
  font-size: 31px;
  padding-top: 20px;
`;

const CollectionInfo = styled.div`
  padding-top: 22px;
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #41796f;
  p {
    padding: none;
  }
  a {
    text-decoration: underline;
  }
`;

const Right = styled.p`
  display: flex;
  max-width: 735px;
`;

const Bottom = styled.nav`
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  background-color: #fbfbfb;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 25px;
  padding-bottom: 25px;
  a {
    text-decoration: none;
    color: #41796f;
    font-size: 24px;
    letter-spacing: 0.02em;
    line-height: 1.125;
  }
`;

const header = ({ eventPages }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const history = useHistory();
  const location = useLocation();

  const selectEvent = e => {
    const selectedEvent = e.target.value;
    const newPath = selectedEvent ? `/${cleanId(selectedEvent)}` : location.pathname;

    setSelectedValue(selectedEvent);

    // Route to major event pages on select.
    Object.assign(location, {
      pathname: newPath,
    });

    history.push(newPath);
  }

  useEffect(() => {
    // Revert selected major event if user re-routes.
    if (location.pathname !== `/${cleanId(selectedValue)}`) {
      setSelectedValue('');
    }
  }, [location.pathname, selectedValue]);

  return (
    <Header>
      <div className='container'>
        <Top>
          <Left>
            <SiteName>The Durham Civil Rights Heritage Project</SiteName>
            <CollectionInfo>
              <p>
                Part of the <a>North Carolina Collection</a>
              </p>
              <p>
                Part of the <a>Durham County Library</a>
              </p>
            </CollectionInfo>
          </Left>
          <Right>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
            consectetur adipiscing elit ut. Viverra aliquet eget sit amet tellus
            cras adipiscing enim. Faucibus in ornare quam viverra orci sagittis
            eu. Mollis nunc sed id semper. A cras semper auctor neque vitae
            tempus quam pellentesque.
          </Right>
        </Top>
        <Bottom>
          <Menu className='container'>
            {routes.map((route, index) => {
              return route.component === 'Major Events' ? (
                <li key={index}>
                  <label htmlFor='events'>{route.component}</label>
                  <select
                    id='events'
                    onChange={selectEvent}
                    value={selectedValue}
                  >
                    <option value=''>{route.component}</option>
                    {eventPages &&
                      eventPages.map((page, i) => {
                        return (
                          <option value={page.name} key={i}>
                            {page.name}
                          </option>
                        );
                      })}
                  </select>
                </li>
              ) : (
                <NavLink to={`/${route.route}`} key={index}>
                  <li>{route.component}</li>
                </NavLink>
              );
            })}
          </Menu>
        </Bottom>
      </div>
    </Header>
  );
}

export default header;
