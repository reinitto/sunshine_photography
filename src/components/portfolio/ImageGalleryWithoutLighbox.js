import React from "react";
import LazyImage from "react-lazy-progressive-image";

// CREATE 4 TYPES OF IMAGE CONTAINERS
//  FULL SIZE IMAGE
//  2 IMAGES SIDE BY SIDE
//  3 IMAGES SIDE BY SIDE

const LazyImg = ({ imageSrc }) => {
  //  create small image and large versions
  let widthSizes = [1500, 500];
  let sources = [];
  widthSizes.forEach(size => sources.push(`${imageSrc}&w=${size}&q=60`));
  return (
    <div
    // style={{
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    //   marginBottom: "5px"
    // }}
    >
      <LazyImage placeholder={sources[1]} src={sources[0]}>
        {(src, loading, isVisible) => (
          <img
            className="fitted-image"
            src={src}
            alt="carousel"
            loading="lazy"
            // style={{
            //   transition: `all 0.25s ease`,
            //   opacity: loading ? 0.2 : 1
            // }}
          />
        )}
      </LazyImage>
    </div>
  );
};

const SingleImage = ({ img }) => {
  return img ? (
    <div
      key={img.src}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginBottom: "5px"
      }}
    >
      <img
        style={{
          width: "100%",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        src={img.src}
        alt="single"
        loading="lazy"
      />
      {/* {<LazyImg imageSrc={img.src} />} */}
      {img.text ? <p>{img.text}</p> : null}
    </div>
  ) : null;
};

const Doubles = ({ images }) => {
  return (
    <div
      key={images[0]}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px"
      }}
      className="side-by-side"
    >
      {images.map((img, i) => {
        return img ? (
          <div key={i} style={{ width: "49%" }}>
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
      key={images[0]}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px"
      }}
    >
      {images.map((img, i) => {
        return img ? (
          <div key={i} style={{ width: "32%" }}>
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
  if (images) {
    // CHOOSE IMAGES IN ORGER 1,2,1,3
    let imgPerRow = [1, 2, 1, 3];
    let currentImgIndex = 0;
    for (let i = 0; i < images.length; i++) {
      //  if only 1 image left in array, use it as full size
      let choice = imgPerRow[i % imgPerRow.length];
      if (images.length - currentImgIndex === 1) {
        choice = 1;
      }
      if (images.length - currentImgIndex === 2) {
        choice = 2;
      }
      if (images.length - currentImgIndex === 3) {
        choice = 3;
      }
      switch (choice) {
        case 1:
          //  ADD SINGLE IMG
          gallery.push(<SingleImage key={i} img={images[currentImgIndex]} />);
          currentImgIndex++;
          break;
        case 2:
          // ADD 2 IMAGES
          gallery.push(
            <Doubles
              key={i}
              images={[images[currentImgIndex], images[currentImgIndex + 1]]}
            />
          );
          currentImgIndex += 2;
          break;
        case 3:
          // ADD 3 images
          gallery.push(
            <Triples
              key={i}
              images={[
                images[currentImgIndex],
                images[currentImgIndex + 1],
                images[currentImgIndex + 2]
              ]}
            />
          );
          currentImgIndex += 3;
          break;
        default:
          break;
      }
    }
    return <div>{gallery}</div>;
  } else {
    return <div>Loading...</div>;
  }
}
