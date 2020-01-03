import React from "react";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

const LazyImg = ({ imageSrc }) => {
  return (
    <Image publicId={imageSrc} className="fitted-image">
      <Transformation quality="auto" fetchFormat="auto" />
    </Image>
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
      <Image
        publicId={img.src}
        style={{
          width: "100%",
          objectFit: "cover",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <Transformation quality="auto" fetchFormat="auto" />
      </Image>

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
    return (
      <div>
        <CloudinaryContext cloudName="sunshinephoto">
          {gallery}
        </CloudinaryContext>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
