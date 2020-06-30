import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../utils';

const Header = () => {
  return (
    <nav>
      <ul>
        {routes.map((route, index) => {
          return (
            <Link to={`/${route.route}`}>
              <li>{route.component}</li>
            </Link>
          )
        })}
      </ul>
    </nav>
  );
}

export default Header;
