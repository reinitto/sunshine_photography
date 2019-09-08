import React from 'react';

export default function IntroCarousel({ photos }) {
  let carouselItems = photos.map((photo, i) => {
    if (i === 0) {
      return (
        <div
          key={i}
          className='carousel-item fitted-image active'
          style={{
            backgroundImage: `url(${photo.src})`,
            /* Create the parallax scrolling effect */
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        ></div>
      );
    } else {
      return (
        <div
          key={i}
          className='carousel-item fitted-image'
          style={{
            backgroundImage: `url(${photo.src})`,
            /* Create the parallax scrolling effect */
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        ></div>
      );
    }
  });
  return (
    <div className='carousel slide' data-ride='carousel' data-interval='3500'>
      <div className='carousel-inner'>{carouselItems}</div>
    </div>
  );
}

IntroCarousel.defaultProps = {
  photos: [
    {
      src:
        'http://images.unsplash.com/photo-1513326238704-b2cd281a3d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
    },
    {
      src:
        'http://images.unsplash.com/photo-1503049555010-f8616ee8f0f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
    },
    {
      src:
        'http://images.unsplash.com/photo-1510525009512-ad7fc13eefab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
    },
    {
      src:
        'http://images.unsplash.com/photo-1526402978125-f1d6df91cbac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
    },
    {
      src:
        'http://images.unsplash.com/photo-1537646692914-61d73c4d6bad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1500&q=60'
    },
    {
      src:
        'http://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
    },
    {
      src:
        'http://images.unsplash.com/photo-1464241353125-b30586718640?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
    },
    {
      src:
        'http://images.unsplash.com/photo-1534260933201-688b892637f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
    },
    {
      src:
        'http://images.unsplash.com/photo-1529663991015-c3d2056835c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60'
    }
  ]
};
