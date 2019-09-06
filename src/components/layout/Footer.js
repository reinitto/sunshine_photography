import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className='page-footer font-small mdb-color pt-4'>
      <div className='container text-center text-md-left'>
        <div className='row text-center text-md-left mt-3 pb-3'>
          <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
            <h6 className='text-uppercase mb-4 font-weight-bold'>
              Company name
            </h6>
            <p>
              Here you can use rows and columns to organize your footer content.
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
          </div>

          <hr className='w-100 clearfix d-md-none' />

          <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
            <h6 className='text-uppercase mb-4 font-weight-bold'>Products</h6>
            <p>
              <Link to={'/portfolio'}>Landscape Photography</Link>
            </p>
            <p>
              <Link to={'/portfolio'}>Aerial photography</Link>
            </p>
            <p>
              <Link to={'/portfolio'}>Food Photography</Link>
            </p>
            <p>
              <Link to={'/portfolio'}>Nature Photography</Link>
            </p>
          </div>

          <hr className='w-100 clearfix d-md-none' />

          <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mt-3'>
            <h6 className='text-uppercase mb-4 font-weight-bold'>Menu</h6>
            <p>
              <Link to={'/'} className='nav-link'>
                Home
              </Link>
            </p>
            <p>
              <Link to={'/contact'} className='nav-link'>
                Contact
              </Link>
            </p>
            <p>
              <Link to={'/about'} className='nav-link'>
                About
              </Link>
            </p>
            <p>
              <Link to={'/portfolio'} className='nav-link'>
                Portfolio
              </Link>
            </p>
            <p>
              <Link to={'/Pricing'} className='nav-link'>
                Pricing
              </Link>
            </p>
          </div>

          <hr className='w-100 clearfix d-md-none' />

          <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mt-3'>
            <h6 className='text-uppercase mb-4 font-weight-bold'>Contact</h6>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className='mr-3' />
              info@gmail.com
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className='mr-3' /> + 01 234 567
              88
            </p>
            <p>
              <FontAwesomeIcon icon={faHome} className='mr-3' /> Telemark,
              Norway
            </p>
          </div>
        </div>

        <hr />

        <div className='row d-flex align-items-center'>
          <div className='col-md-7 col-lg-8'>
            <p className='text-center text-md-left'>
              © 2019 Copyright:
              <Link href='!#'>
                <strong> thisWebsite.com</strong>
              </Link>
            </p>
          </div>

          <div className='col-md-5 col-lg-4 ml-lg-0'>
            <div className='text-center text-md-right'>
              <ul className='list-unstyled list-inline'>
                <li className='list-inline-item'>
                  <a
                    href='!#'
                    className='btn-floating btn-sm rgba-white-slight mx-1'
                  >
                    <FontAwesomeIcon icon={faFacebook} className='mr-3' />
                  </a>
                </li>
                <li className='list-inline-item'>
                  <a
                    href='!#'
                    className='btn-floating btn-sm rgba-white-slight mx-1'
                  >
                    <FontAwesomeIcon icon={faInstagram} className='mr-3' />
                    <i className='fab fa-linkedin-in'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
