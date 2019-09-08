import React, { Component } from 'react';
import About from '../components/AboutSection';
import Pricing from '../components/pricing/PricingList';
import IntroCarousel from '../components/IntroCarousel';
import Navbar from '../components/layout/Navbar';
import { Link } from 'react-router-dom';

let digitalPhotos = [
  {
    name: '5',
    price: '1500 NOK'
  },
  {
    name: '10',
    price: '2500 NOK'
  },
  {
    name: '20',
    price: '4000 NOK'
  },
  {
    name: '30',
    price: '5000 NOK'
  }
];

export default class Home extends Component {
  render() {
    return (
      <div id='home'>
        <Navbar />
        <IntroCarousel />
        <div className='container'>
          <div
            className='links-to-gallery'
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridGap: '10px'
            }}
          >
            <Link to='/gallery#baby'>
              <div
                className='link-to-baby-gallery'
                onMouseOver={() => {
                  console.log('Over');
                }}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1546015720-b8b30df5aa27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80')`,
                  backgroundRepeat: 'no-repeat',
                  height: `300px`,
                  fontSize: '2.5rem',
                  display: 'flex',
                  color: 'white',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              ></div>
            </Link>
            <Link to='/gallery#family'>
              <div
                className='link-to-family-gallery'
                onMouseOver={() => {
                  console.log('Over');
                }}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80')`,
                  backgroundRepeat: 'no-repeat',
                  height: `300px`,
                  fontSize: '2.5rem',
                  textDecoration: 'none',
                  display: 'flex',
                  color: 'white',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              ></div>
            </Link>
            <Link to='/gallery#portrait'>
              <div
                className='link-to-portrait-gallery'
                onMouseOver={() => {
                  console.log('Over');
                }}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80')`,
                  backgroundRepeat: 'no-repeat',
                  height: `300px`,
                  fontSize: '2.5rem',
                  textDecoration: 'none',
                  display: 'flex',
                  color: 'white',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              ></div>
            </Link>
            <Link to='/gallery#event'>
              <div
                className='link-to-event-gallery'
                onMouseOver={() => {
                  console.log('Over');
                }}
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80')`,
                  backgroundRepeat: 'no-repeat',
                  height: `300px`,
                  fontSize: '2.5rem',
                  textDecoration: 'none',
                  display: 'flex',
                  color: 'white',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              ></div>
            </Link>
          </div>
          <Pricing />
          <Pricing title='Digital Photos' items={digitalPhotos} />
          <About />
        </div>
      </div>
    );
  }
}
