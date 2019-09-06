import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <ul className='navbar-nav mr-auto'>
        <li>
          <Link to={'/'} className='nav-link'>
            Home
          </Link>
        </li>
        <li>
          <Link to={'/contact'} className='nav-link'>
            Contact
          </Link>
        </li>
        <li>
          <Link to={'/about'} className='nav-link'>
            About
          </Link>
        </li>
        <li>
          <Link to={'/portfolio'} className='nav-link'>
            Portfolio
          </Link>
        </li>
        <li>
          <Link to={'/pricing'} className='nav-link'>
            Pricing
          </Link>
        </li>
      </ul>
    </nav>
  );
}
