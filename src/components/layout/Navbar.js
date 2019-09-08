import React, { Component } from 'react';
import Logo from '../../logo/Photo-logo.svg';
import LogoHorizontalNoBorder from '../../logo/Photo-logo-horizontal-no-border.svg';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  state = {
    scrollTop: 0,
    windowWidth: null
  };
  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleWidth);
    this.handleWidth();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleWidth = () => {
    let width = document.documentElement.clientWidth;
    this.setState({
      windowWidth: width
    });
  };

  handleScroll = () => {
    var scrollTop =
      window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
    this.setState({
      scrollTop
    });
  };
  render() {
    let { scrollTop } = this.state;
    return (
      <nav
        style={{
          zIndex: 100
        }}
        className={`navbar navbar-expand-xl fixed-top
         ${
           window.location.pathname === '/' && scrollTop > 0
             ? 'bg-white border-bottom border-secondary'
             : ''
         }
         ${
           window.location.pathname !== '/' && scrollTop > 0
             ? 'bg-white border-bottom border-secondary'
             : ''
         }
         ${
           window.location.pathname === '/' && scrollTop === 0
             ? 'bg-transparent'
             : ''
         }`}
      >
        <Link
          className='navbar-brand'
          to='/'
          style={{
            height: '60px',
            marginBottom: '1rem',
            margin: this.state.windowWidth < 1024 ? 'auto' : 'initial'
          }}
        >
          <img
            src={LogoHorizontalNoBorder}
            style={{
              width: this.state.windowWidth < 1024 ? '80vw' : 'initial'
            }}
            alt=''
          />
        </Link>
        <button
          style={{
            margin: 'auto',
            marginTop: '1rem'
          }}
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#collapsibleNavbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='collapsibleNavbar'>
          <ul className='navbar-nav ml-auto'>
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
            <li
              className='nav-item dropdown'
              onMouseOver={() => console.log('Over')}
              onMouseEnter={() => {
                document.querySelector('.dropdown-menu').classList.add('show');
              }}
              onMouseLeave={() => {
                console.log('mouse left');
                document
                  .querySelector('.dropdown-menu')
                  .classList.remove('show');
              }}
            >
              <Link
                className='nav-link dropdown-toggle'
                to='#'
                id='navbarDropdownMenuLink'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Gallery
              </Link>
              <div
                className='dropdown-menu mt-0 border-top-0 pt-0'
                aria-labelledby='navbarDropdownMenuLink'
                onMouseLeave={() => {
                  console.log('mouse left');
                  document
                    .querySelector('.dropdown-menu')
                    .classList.remove('show');
                }}
              >
                <Link className='dropdown-item' to='/gallery#baby'>
                  Baby
                </Link>
                <Link className='dropdown-item' to='/gallery#family'>
                  Family
                </Link>
                <Link className='dropdown-item' to='/gallery#portrait'>
                  Portrait
                </Link>
                <Link className='dropdown-item' to='/gallery#event'>
                  Event
                </Link>
              </div>
            </li>

            <li>
              <Link to={'/pricing'} className='nav-link'>
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
