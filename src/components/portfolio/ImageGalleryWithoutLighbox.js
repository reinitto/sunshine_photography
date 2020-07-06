import React from "react";
import { CloudinaryContext } from "cloudinary-react";
import Spinner from "../Spinner";
import { ProgressiveCloudinaryImage } from "../ProgressiveCloudinaryImage";

const SingleImage = ({ img, altText = "" }) => {
  return (
    <div>
      <div
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginBottom: "5px",
          height: "auto",
          // maxHeight: "85vh",
          // overflow: "hidden",
        }}
      >
        {img && (
          <ProgressiveCloudinaryImage
            publicId={img && img.src}
            altText={altText || img.text || ""}
          />
        )}
      </div>
      {img && img.text && (
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
            fontSize: "16px",
          }}
        >
          {img.text}
        </p>
      )}
    </div>
  );
};

const Doubles = ({ images, altText = "" }) => {
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
          <div key={img.src} style={{ width: "49%" }}>
            {img.text ? <p>{img.text}</p> : null}
            <ProgressiveCloudinaryImage
              publicId={img.src}
              altText={altText || img.text || ""}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};
const Triples = ({ images, altText = "" }) => {
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
          <div key={img.src} style={{ width: "32%" }}>
            {img.text ? <p>{img.text}</p> : null}
            <ProgressiveCloudinaryImage
              publicId={img.src}
              altText={altText || img.text || ""}
            />
          </div>
        ) : null;
      })}
    </div>
  );
};

const TextBlock = ({ title, text, language }) => {
  return (
    <div className="mx-auto w-75">
      <h3>{title ? title[0].toUpperCase() + title.slice(1) : null}</h3>
      <p className="text-left">{text ? text : null}</p>
    </div>
  );
};

export default function ImageGalleryWithoutLighbox({
  journalImages,
  images,
  language,
  name = "",
}) {
  if (journalImages) {
    let gallery = [];
    let newImages = Object.keys(journalImages).map((key) => journalImages[key]);
    let ordered = newImages.sort((a, b) => (a.order > b.order ? 1 : -1));
    for (let i = 0; i < ordered.length; ) {
      if (ordered[i].isTextBlock) {
        gallery.push(
          <TextBlock
            key={i}
            title={
              typeof ordered[i].title[language] != undefined
                ? ordered[i].title[language]
                : ""
            }
            text={
              ordered[i].text[language] ||
              ordered[i].text["eng"] ||
              ordered[i].text["us"]
            }
          />
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
              text:
                ordered[i].text[language] ||
                ordered[i].text["eng"] ||
                ordered[i].text["us"],
            }}
            altText={name || ""}
          />
        );
        i++;
        continue;
      }
      if (ordered[i].variation === 2) {
        gallery.push(
          <Doubles
            key={i}
            altText={name || ""}
            images={[
              {
                src: ordered[i].imageUrl,
                text:
                  ordered[i].text[language] ||
                  ordered[i].text["eng"] ||
                  ordered[i].text["us"],
              },
              {
                src: ordered[i + 1].imageUrl,
                text:
                  ordered[i + 1].text[language] ||
                  ordered[i + 1].text["eng"] ||
                  ordered[i + 1].text["us"],
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
            key={i}
            altText={name || ""}
            images={[
              {
                src: ordered[i].imageUrl,
                text:
                  ordered[i].text[language] ||
                  ordered[i].text["eng"] ||
                  ordered[i].text["us"],
              },
              {
                src: ordered[i + 1].imageUrl,
                text:
                  ordered[i + 1].text[language] ||
                  ordered[i + 1].text["eng"] ||
                  ordered[i + 1].text["us"],
              },
              {
                src: ordered[i + 2].imageUrl,
                text:
                  ordered[i + 2].text[language] ||
                  ordered[i + 2].text["eng"] ||
                  ordered[i + 2].text["us"],
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
        style={{
          width: "85%",
          margin: "auto",
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
      let imagesLeft = images.length;
      let imgPerRow = [1, 2, 1, 3];
      let rows = 0;
      while (imagesLeft > 0) {
        if (imagesLeft === 1) {
          rows++;
          imagesLeft -= 1;
        } else if (imagesLeft === 2) {
          rows += 1;
          imagesLeft -= 2;
        } else {
          let choice = imgPerRow[rows % imgPerRow.length];
          imagesLeft -= choice;
          rows++;
        }
      }
      let currentImgIndex = 0;
      for (let row = 0; row < rows; row++) {
        let choice = imgPerRow[row % imgPerRow.length];
        //  if only 1 image left in array, use it as full size
        if (images.length - currentImgIndex === 1) {
          choice = 1;
        }
        if (images.length - currentImgIndex === 2) {
          choice = 2;
        }
        switch (choice) {
          case 1:
            //  ADD SINGLE IMG
            gallery.push(
              <SingleImage
                key={row}
                img={{
                  src:
                    images[currentImgIndex].image ||
                    images[currentImgIndex].src,
                  text:
                    images[currentImgIndex].text[language] ||
                    images[currentImgIndex].text["eng"] ||
                    images[currentImgIndex].text["us"],
                }}
                altText={`${name[language]} example photo` || ""}
              />
            );
            currentImgIndex++;
            break;
          case 2:
            // ADD 2 IMAGES
            gallery.push(
              <Doubles
                key={row}
                images={[
                  {
                    src:
                      images[currentImgIndex].image ||
                      images[currentImgIndex].src,
                    text:
                      images[currentImgIndex].text[language] ||
                      images[currentImgIndex].text["eng"] ||
                      images[currentImgIndex].text["us"],
                  },
                  {
                    src:
                      images[currentImgIndex + 1].image ||
                      images[currentImgIndex + 1].src,
                    text:
                      images[currentImgIndex + 1].text[language] ||
                      images[currentImgIndex + 1].text["eng"] ||
                      images[currentImgIndex + 1].text["us"],
                  },
                ]}
                altText={`${name[language]} example photo` || ""}
              />
            );
            currentImgIndex += 2;
            break;
          case 3:
            // ADD 3 images
            gallery.push(
              <Triples
                key={row}
                images={[
                  {
                    src:
                      images[currentImgIndex].image ||
                      images[currentImgIndex].src,
                    text:
                      images[currentImgIndex].text[language] ||
                      images[currentImgIndex].text["eng"] ||
                      images[currentImgIndex].text["us"],
                  },
                  {
                    src:
                      images[currentImgIndex + 1].image ||
                      images[currentImgIndex + 1].src,
                    text:
                      images[currentImgIndex + 1].text[language] ||
                      images[currentImgIndex + 1].text["eng"] ||
                      images[currentImgIndex + 1].text["us"],
                  },
                  {
                    src:
                      images[currentImgIndex + 2].image ||
                      images[currentImgIndex + 2].src,
                    text:
                      images[currentImgIndex + 2].text[language] ||
                      images[currentImgIndex + 2].text["eng"] ||
                      images[currentImgIndex + 2].text["us"],
                  },
                ]}
                altText={`${name[language]} example photo` || ""}
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
          style={{
            width: "85%",
            margin: "auto",
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
