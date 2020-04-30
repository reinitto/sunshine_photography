import React from "react";
import { Link } from "react-router-dom";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { useWindowWidth } from "./useWindowWidth";

let swapArrayElements = function (arr, indexA, indexB) {
  let temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

let SingleLink = ({ link, dimensions = { w: 450, h: "auto" }, style = {} }) => {
  let { w, h } = dimensions;
  let imageWidth = w > 300 ? 450 : 300;
  if (link) {
    let { key, name, thumbnailImage } = link;
    return (
      <Link to={`/services/${key}`} key={key}>
        <div
          style={{
            position: "relative",
            width: `${w}px`,
            height: `${h}px`,
          }}
        >
          <Image
            publicId={
              thumbnailImage
                ? thumbnailImage
                : "images/portfolio/couples/placeholder_klk233"
            }
            width={imageWidth}
            // height={h}
            crop="fill"
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
    return (
      <div
        style={{
          width: `${w}px`,
          height: `${h}px`,
        }}
      ></div>
    );
  }
};

let LinkLayout = ({ links, largeWH, smallImageWH, reverse = false }) => {
  if (reverse) {
    return (
      <div className="links-to-gallery-layout">
        <SingleLink link={links[0]} dimensions={largeWH} />
        <div className="two-links">
          <SingleLink link={links[1]} dimensions={smallImageWH} />
          <SingleLink link={links[2]} dimensions={smallImageWH} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="links-to-gallery-layout">
        <div className="two-links">
          <SingleLink link={links[0]} dimensions={smallImageWH} />
          <SingleLink link={links[1]} dimensions={smallImageWH} />
        </div>
        <SingleLink link={links[2]} dimensions={largeWH} />
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

  let scrollWidth = document.body.scrollWidth;
  var actualInnerWidth = Math.ceil(scrollWidth * 0.9);
  if (width > 768) {
    actualInnerWidth = 690;
  }
  if (width > 992) {
    actualInnerWidth = 930;
  }
  if (width > 1200) {
    actualInnerWidth = 1110;
  }
  let bigImageWH = Math.floor(actualInnerWidth / 2);
  let smallImageWidth = Math.floor(bigImageWH / 2);
  let smallImageHeight = Math.ceil(1.4 * smallImageWidth);
  return (
    <div
      className={width <= 768 ? "pb-3 mx-auto w-90 " : "container pb-3"}
      style={{
        backgroundColor: "#faf7f6",
      }}
    >
      <h2 className="text-center">Capture Your Life's Journey</h2>
      <CloudinaryContext cloudName="sunshinephoto">
        {width <= 768 ? (
          <div
            className="d-flex flex-wrap"
            style={{
              height:
                width <= 768
                  ? Math.floor(bigImageWH * 1.4) * 3
                  : bigImageWH + smallImageHeight,
            }}
          >
            {arr.map((link) => (
              <div className="w-50" key={link.key}>
                <SingleLink
                  link={link}
                  style={{
                    width: "100%",
                  }}
                  dimensions={{
                    w: bigImageWH,
                    h: Math.floor(bigImageWH * 1.4),
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex links-to-gallery">
            <LinkLayout
              links={arr.slice(0, 3)}
              largeWH={{ w: bigImageWH, h: bigImageWH }}
              smallImageWH={{ w: smallImageWidth, h: smallImageHeight }}
            />
            <LinkLayout
              links={arr.slice(3)}
              reverse={true}
              largeWH={{ w: bigImageWH, h: bigImageWH }}
              smallImageWH={{ w: smallImageWidth, h: smallImageHeight }}
            />
          </div>
        )}
      </CloudinaryContext>
    </div>
  );
}
