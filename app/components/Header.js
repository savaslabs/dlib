import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { routes, cleanId } from '../utils/utils';

const Header = ({ eventPages }) => {
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
    <nav>
      <ul>
        {routes.map((route, index) => {
          return route.component === 'Major Events' ? (
            <li key={index}>
              <label htmlFor='events'>{route.component}</label>
              <select id='events' onChange={selectEvent} value={selectedValue}>
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
      </ul>
    </nav>
  );
}

export default Header;
