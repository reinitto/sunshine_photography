import React from "react";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import Spinner from "../Spinner";

const LazyImg = ({ imageSrc }) => {
  return (
    <Image
      publicId={imageSrc}
      style={{
        width: "100%",
        objectFit: "cover",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      secure="true"
    >
      <Transformation quality="auto" fetchFormat="auto" />
    </Image>
  );
};

const SingleImage = ({ img }) => {
  return img ? (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginBottom: "5px",
      }}
    >
      <LazyImg imageSrc={img.src} />
      {img.text ? (
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          {img.text}
        </p>
      ) : null}
    </div>
  ) : null;
};

const Doubles = ({ images }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px",
      }}
      className="side-by-side"
    >
      {images.map((img, i) => {
        return img ? (
          <div key={i} style={{ width: "49%" }}>
            {img.text ? <p>{img.text}</p> : null}
            <LazyImg imageSrc={img.src} />
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
        marginBottom: "5px",
      }}
    >
      {images.map((img, i) => {
        return img ? (
          <div key={i} style={{ width: "32%" }}>
            {img.text ? <p>{img.text}</p> : null}
            <LazyImg imageSrc={img.src} />
          </div>
        ) : null;
      })}
    </div>
  );
};

const TextBlock = ({ title, text }) => {
  return (
    <div className="text-center">
      <h3>{title ? title[0].toUpperCase() + title.slice(1) : null}</h3>
      <p>{text ? text : null}</p>
    </div>
  );
};

export default function ImageGalleryWithoutLighbox({ journalImages, images }) {
  if (journalImages) {
    let gallery = [];
    let newImages = Object.keys(journalImages).map((key) => journalImages[key]);
    let ordered = newImages.sort((a, b) => (a.order > b.order ? 1 : -1));
    for (let i = 0; i < ordered.length; ) {
      if (ordered[i].isTextBlock) {
        gallery.push(
          <TextBlock key={i} title={ordered[i].title} text={ordered[i].text} />
        );
        i++;
        continue;
      }
      if (ordered[i].variation === 1) {
        gallery.push(
          <SingleImage
            key={i}
            img={{
              src: ordered[i].imageUrl,
              text: ordered[i].text,
            }}
          />
        );
        i++;
        continue;
      }
      if (ordered[i].variation === 2) {
        gallery.push(
          <Doubles
            images={[
              {
                src: ordered[i].imageUrl,
                text: ordered[i].text,
              },
              {
                src: ordered[i + 1].imageUrl,
                text: ordered[i + 1].text,
              },
            ]}
          />
        );
        i += 2;
        continue;
      }
      if (ordered[i].variation === 3) {
        gallery.push(
          <Triples
            images={[
              {
                src: ordered[i].imageUrl,
                text: ordered[i].text,
              },
              {
                src: ordered[i + 1].imageUrl,
                text: ordered[i + 1].text,
              },
              {
                src: ordered[i + 2].imageUrl,
                text: ordered[i + 2].text,
              },
            ]}
          />
        );
        i += 3;
        continue;
      }
    }
    return (
      <div
        //disable right click
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <CloudinaryContext cloudName="sunshinephoto">
          {gallery}
        </CloudinaryContext>
      </div>
    );
  } else {
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
                  images[currentImgIndex + 2],
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
        <div
          //disable right click
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          <CloudinaryContext cloudName="sunshinephoto">
            {gallery}
          </CloudinaryContext>
        </div>
      );
    } else {
      return (
        <div>
          <Spinner />
        </div>
      );
    }
  }
}
