import React from "react";
import { Link } from "react-router-dom";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { useWindowWidth } from "./useWindowWidth";

let swapArrayElements = function (arr, indexA, indexB) {
  let temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

let SingleLink = ({ link, style = {} }) => {
  if (link) {
    let { key, name, thumbnailImage } = link;
    return (
      <Link to={`/services/${key}`} key={key}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            publicId={
              thumbnailImage
                ? thumbnailImage
                : "images/portfolio/couples/placeholder_klk233"
            }
            width="300"
            crop="scale"
            className="p-3 fitted-image"
            style={{
              width: "100%",
              height: "100%",
              ...style,
            }}
          >
            <Transformation quality="auto" fetchFormat="auto" />
          </Image>
          <div>
            <p className="link-overlay-text text-uppercase">
              {name[0].toUpperCase() + name.slice(1)}
            </p>
          </div>
        </div>
      </Link>
    );
  } else {
    return null;
  }
};

let LinkLayout = ({ links, reverse = false }) => {
  if (reverse) {
    return (
      <div className="links-to-gallery-layout">
        <SingleLink link={links[0]} />
        <div className="two-links">
          <SingleLink link={links[1]} />
          <SingleLink link={links[2]} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="links-to-gallery-layout">
        <div className="two-links">
          <SingleLink link={links[0]} />
          <SingleLink link={links[1]} />
        </div>
        <SingleLink link={links[2]} />
      </div>
    );
  }
};

export default function LinksToGallery({ services }) {
  const width = useWindowWidth();
  let arr =
    typeof services === "object"
      ? Object.keys(services).map((key) => {
          return { ...services[key], key };
        })
      : [];
  // swap 0 to 2 and 1 to 3
  if (arr.length >= 3) {
    swapArrayElements(arr, 0, 2);
    swapArrayElements(arr, 1, 3);
  }

  return (
    <div
      className={width < 768 ? "pb-3 mx-auto w-90 " : "container pb-3"}
      style={{
        backgroundColor: "#faf7f6",
      }}
    >
      <h2 className="text-center">Capture Your Life's Journey</h2>
      <CloudinaryContext cloudName="sunshinephoto">
        {width < 769 ? (
          <div className="d-flex flex-wrap">
            {arr.map((link) => (
              <div className="w-50" key={link.key}>
                <SingleLink
                  link={link}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex links-to-gallery">
            <LinkLayout links={arr.slice(0, 3)} />
            <LinkLayout links={arr.slice(3)} reverse={true} />
          </div>
        )}
      </CloudinaryContext>
    </div>
  );
}
