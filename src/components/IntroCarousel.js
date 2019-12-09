import React from "react";
import LazyImage from "react-lazy-progressive-image";

export default function IntroCarousel({ photos }) {
  let carouselItems = photos.map((photo, i) => {
    // ADD ACTIVE CLASS TO FIRST IMAGE
    //  http://images.unsplash.com/photo-1513326238704-b2cd281a3d53?ixlib=rb-1.2.1&auto=format&fit=crop"
    //  add &w=1500&q=60

    if (i === 0) {
      let srcs =
        typeof photo.src === "string"
          ? `url(${photo.src})`
          : photo.src.map(src => {
              let widthSizes = [2000, 200];
              let sources = [];
              for (let width of widthSizes) {
                sources.push(`url(${src}&w=${width}&q=60)`);
              }
              return sources;
            });
      return (
        <div
          key={i}
          className="carousel-item fitted-image active"
          style={{
            backgroundImage: srcs,
            /* Create the parallax scrolling effect */
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        ></div>
      );
    } else {
      let srcs =
        typeof photo.src === "string"
          ? `url(${photo.src})`
          : photo.src.map(src => {
              let widthSizes = [2000, 200];
              let sources = [];
              for (let width of widthSizes) {
                sources.push(`${src}&w=${width}&q=60`);
              }
              return sources;
            });
      return (
        // <div
        //   key={i}
        //   className="carousel-item fitted-image"
        //   style={{
        //     backgroundImage: srcs,
        //     /* Create the parallax scrolling effect */
        //     backgroundAttachment: "fixed",
        //     backgroundPosition: "center",
        //     backgroundRepeat: "no-repeat",
        //     backgroundSize: "cover"
        //   }}
        // ></div>
        <div
          key={i}
          className="carousel-item "
          style={{
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
          }}
        >
          <LazyImage placeholder={srcs[0][1]} src={srcs[0][0]}>
            {(src, loading, isVisible) => (
              <img className="fitted-image" src={src} alt="carousel" />
            )}
          </LazyImage>
        </div>

        // <div key={i} className="carousel-item ">
        //   <img className="fitted-image" src={srcs[0]} alt="Second " />
        // </div>
      );
    }
  });
  return (
    <div className="carousel slide" data-ride="carousel" data-interval="3500">
      <div className="carousel-inner">{carouselItems}</div>
    </div>
  );
}

IntroCarousel.defaultProps = {
  photos: [
    {
      src: [
        "http://images.unsplash.com/photo-1513326238704-b2cd281a3d53?ixlib=rb-1.2.1&auto=format&fit=crop"
      ]
    },
    {
      src: [
        "http://images.unsplash.com/photo-1503049555010-f8616ee8f0f3?ixlib=rb-1.2.1&auto=format&fit=crop"
      ]
    },
    {
      src: [
        "http://images.unsplash.com/photo-1510525009512-ad7fc13eefab?ixlib=rb-1.2.1&auto=format&fit=crop"
      ]
    },
    {
      src: [
        "http://images.unsplash.com/photo-1526402978125-f1d6df91cbac?ixlib=rb-1.2.1&auto=format&fit=crop"
      ]
    },
    {
      src: [
        "http://images.unsplash.com/photo-1537646692914-61d73c4d6bad?ixlib=rb-1.2.1&auto=format&fit=crop"
      ]
    },
    {
      src: [
        "http://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?ixlib=rb-1.2.1&auto=format&fit=crop"
      ]
    },
    {
      src: [
        "http://images.unsplash.com/photo-1464241353125-b30586718640?ixlib=rb-1.2.1&auto=format&fit=crop"
      ]
    },
    {
      src: [
        "http://images.unsplash.com/photo-1534260933201-688b892637f1?ixlib=rb-1.2.1&auto=format&fit=crop"
      ]
    },
    {
      src: [
        "http://images.unsplash.com/photo-1529663991015-c3d2056835c5?ixlib=rb-1.2.1&auto=format&fit=crop"
      ]
    }
  ]
};
