import React, { Fragment } from "react";
import LazyImage from "react-lazy-progressive-image";

// CREATE 4 TYPES OF IMAGE CONTAINERS
//  FULL SIZE IMAGE
//  2 IMAGES SIDE BY SIDE
//  3 IMAGES SIDE BY SIDE

const LazyImg = ({ imageSrc }) => {
  //  create small image and large versions
  let widthSizes = [2500, 1500];
  let sources = [];
  for (let width of widthSizes) {
    sources.push(`${imageSrc}&w=${width}&q=60`);
  }
  return (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginBottom: "5px"
      }}
    >
      <LazyImage placeholder={sources[1]} src={sources[0]}>
        {(src, loading, isVisible) => (
          <img
            className="fitted-image"
            src={src}
            alt="carousel"
            loading="lazy"
          />
        )}
      </LazyImage>
    </div>
  );
};

const SingleImage = ({ img }) => {
  return (
    <div>
      <LazyImg imageSrc={img.src} />
      {img.text ? <p>{img.text}</p> : null}
    </div>
  );
};

const Doubles = ({ images }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px"
      }}
      className="side-by-side"
    >
      {images.map(img => {
        return img ? (
          <div style={{ width: "49%" }}>
            <LazyImg imageSrc={img.src} />
            {img.text ? <p>{img.text}</p> : null}
          </div>
        ) : null;
      })}
    </div>
  );
};
const Triples = ({ images }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px"
      }}
      className="side-by-side"
    >
      {images.map(img => {
        return img ? (
          <div style={{ width: "32%" }}>
            <LazyImg imageSrc={img.src} />
            {img.text ? <p>{img.text}</p> : null}
          </div>
        ) : null;
      })}
    </div>
  );
};

export default function ImageGalleryWithoutLighbox(props) {
  const images = props.images;
  let gallery = [];
  for (let i = 0; i < images.length; ) {
    //  RANDOMLY CHOOSE 1 - 3 IMAGES
    let choice = Math.floor(Math.random() * 3);
    switch (choice) {
      case 0:
        //  ADD SINGLE IMG
        gallery.push(<SingleImage src={images[i]} />);
        i++;
        break;
      case 1:
        // ADD 2 IMAGES
        gallery.push(<Doubles images={[images[i], images[i + 1]]} />);
        i += 2;
        break;
      case 2:
        // ADD 3 images
        gallery.push(
          <Triples images={[images[i], images[i + 1], images[i + 2]]} />
        );
        i += 3;
        break;
    }
  }
  return <div>{gallery}</div>;
}
