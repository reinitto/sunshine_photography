import React, { Component } from 'react';
import AboutSection from '../components/AboutSection';
import ContactForm from '../components/contact/ContactForm';
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
  isAnyPartOfElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    return vertInView && horInView;
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      //Links to gallery
      let linksToGallery = document.querySelectorAll('.link-to-gallery');
      linksToGallery.forEach(link => {
        if (this.isAnyPartOfElementInViewport(link)) {
          if ([...link.classList].includes('come-in')) {
            console.log('class alraedy exists');
          } else {
            link.classList.add('come-in');
          }
        } else {
          console.log('not in view');
          link.classList.remove('come-in');
        }
      });
      //Pricing
      let pricingList = document.querySelectorAll('.pricingList');
      pricingList.forEach(link => {
        if (this.isAnyPartOfElementInViewport(link)) {
          if ([...link.classList].includes('come-in')) {
            console.log('class alraedy exists');
          } else {
            link.classList.add('come-in');
          }
        } else {
          console.log('not in view');
          link.classList.remove('come-in');
        }
      });
      //About Section
      // let aboutSection = document.querySelectorAll('.about-section-home');
      // aboutSection.forEach(link => {
      //   if (this.isAnyPartOfElementInViewport(link)) {
      //     if ([...link.classList].includes('come-in')) {
      //       console.log('class alraedy exists');
      //     } else {
      //       link.classList.add('come-in');
      //     }
      //   } else {
      //     console.log('not in view');
      //     link.classList.remove('come-in');
      //   }
      // });
    });
  }
  render() {
    return (
      <div id='home'>
        <Navbar />
        <IntroCarousel />
        <div className='container'>
          <h2 style={{ textAlign: 'center' }}>Gallery</h2>

          <div
            className={`links-to-gallery`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridGap: '10px'
            }}
          >
            <Link to='/gallery#baby'>
              <div
                className='link-to-baby-gallery link-to-gallery'
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
                className='link-to-family-gallery link-to-gallery'
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
                className='link-to-portrait-gallery link-to-gallery'
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
                className='link-to-event-gallery link-to-gallery'
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
          <h2 style={{ textAlign: 'center' }}>Pricing</h2>
          <Pricing />
          <Pricing title='Digital Photos' items={digitalPhotos} />
        </div>
        <div
          style={{
            backgroundImage: `url('http://images.unsplash.com/photo-1526402978125-f1d6df91cbac?ixlib=rb-1.2.1&auto=format&fit=crop&w=2500&q=60')`,
            /* Create the parallax scrolling effect */
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          <div
            className='container'
            style={{
              color: 'white'
            }}
          >
            <AboutSection />
          </div>
        </div>
        <div className='container'>
          <ContactForm />
        </div>
      </div>
    );
  }
}
