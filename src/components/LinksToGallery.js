import React from "react";
import { Link } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";
import { ProgressiveCloudinaryImage } from "./ProgressiveCloudinaryImage";
import { useWindowOuterWidth } from "./useWindowOuterWidth";
import { useWindowInnerWidth } from "./useWindowInnerWidth";

let swapArrayElements = function (arr, indexA, indexB) {
  let temp = arr[indexA];
  arr[indexA] = arr[indexB];
  arr[indexB] = temp;
};

let SingleLink = ({
  link,
  dimensions,
  language,
  style = {},
  textStyle = {},
}) => {
  let { w, h } = dimensions;
  if (link) {
    let { key, name, thumbnailImage: publicId } = link;
    let serviceName = name[language] ? name[language] : name["us"];
    return (
      <Link to={`services/${key}`} key={key}>
        <div
          style={{
            position: "relative",
            width: `${w}px`,
            height: `${h}px`,
            background: `linear-gradient(
              rgba(147, 173, 207, 0.15), 
              rgba(147, 173, 207, 0.45)
              )`,
            padding: "1rem",
          }}
        >
          <ProgressiveCloudinaryImage
            publicId={publicId}
            altText={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              ...style,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              width: `${w - 32}px`,
              height: `${h - 32}px`,
              background: `rgba(0, 0, 0, 0.20)`,
            }}
          >
            <p className="link-overlay-text text-uppercase" style={textStyle}>
              {serviceName[0].toUpperCase() + serviceName.slice(1)}
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

let LinkLayout = ({
  links,
  largeWH,
  smallImageWH,
  language,
  reverse = false,
}) => {
  if (reverse) {
    return (
      <div className="links-to-gallery-layout">
        <SingleLink
          language={language}
          link={links[0]}
          dimensions={largeWH}
          textStyle={{ fontSize: "24px" }}
        />
        <div className="two-links">
          <SingleLink
            link={links[1]}
            dimensions={smallImageWH}
            language={language}
          />
          <SingleLink
            link={links[2]}
            dimensions={smallImageWH}
            language={language}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="links-to-gallery-layout">
        <div className="two-links">
          <SingleLink
            link={links[0]}
            dimensions={smallImageWH}
            language={language}
          />
          <SingleLink
            link={links[1]}
            dimensions={smallImageWH}
            language={language}
          />
        </div>
        <SingleLink
          link={links[2]}
          dimensions={largeWH}
          textStyle={{ fontSize: "24px" }}
          language={language}
        />
      </div>
    );
  }
};

export default function LinksToGallery({
  services,
  title,
  subtitle,
  language,
}) {
  let width = Math.min(useWindowOuterWidth(), useWindowInnerWidth());

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
  let bigDimensions = { w: bigImageWH, h: Math.floor(bigImageWH * 0.8) };
  let smallImageWidth = Math.ceil(bigImageWH / 2);
  let smallImageHeight = Math.ceil(1.25 * smallImageWidth);

  return (
    <div className={width <= 768 ? "pb-3 mx-auto" : "container pb-3"}>
      <h2 className="text-center">
        {title ? title : "Every Picture Has A Story To Tell"}
      </h2>
      <h2 className="text-center">
        {subtitle ? subtitle : "Let's Start Yours"}
      </h2>
      <CloudinaryContext cloudName="sunshinephoto">
        {width <= 768 ? (
          <div
            className="d-flex flex-wrap"
            style={{
              // height: Math.floor(bigImageWH * 1.25) * 3,
              justifyContent: "center",
            }}
          >
            {arr.map((link) => (
              // <div
              //   key={link.key}
              //   style={{
              //     width: "45%",
              //   }}
              // >
              <SingleLink
                key={link.key}
                link={link}
                style={{
                  width: "100%",
                }}
                dimensions={{
                  w: bigImageWH,
                  h: bigImageWH * 1.25,
                }}
                language={language}
              />
              // </div>
            ))}
          </div>
        ) : (
          <div className="d-flex links-to-gallery">
            <LinkLayout
              links={arr.slice(0, 3)}
              largeWH={bigDimensions}
              smallImageWH={{ w: smallImageWidth, h: smallImageHeight }}
              language={language}
            />
            <LinkLayout
              links={arr.slice(3)}
              reverse={true}
              largeWH={bigDimensions}
              smallImageWH={{ w: smallImageWidth, h: smallImageHeight }}
              language={language}
            />
          </div>
        )}
      </CloudinaryContext>
    </div>
  );
}
