import React from "react";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import ScrollingHorizontally from "react-scroll-horizontal";
import { CloudinaryContext } from "cloudinary-react";
import { useWindowWidth } from "./useWindowWidth";

export const MenuItem = ({
  text,
  link,
  imageUrl,
  sideLength,
  footer,
  style = {},
}) => {
  let public_id = imageUrl.match(/(images\/.*)/)[1].split(".")[0];
  let width = sideLength > 300 ? 300 : sideLength;
  let height = footer ? width : width * 1.5;
  return (
    <Link
      to={`/journal/${link}`}
      className={`menu-item d-flex flex-column align-items-center justify-content-center`}
    >
      <div
        style={{
          position: "relative",
          width,
          height,
        }}
      >
        <Image
          publicId={public_id}
          width={width}
          height={height}
          crop="scale"
          className="p-3 cover-image"
          secure="true"
          style={{
            background: footer
              ? ""
              : `linear-gradient(
              rgba(147, 173, 207, 0.15), 
              rgba(147, 173, 207, 0.45)
            )`,
          }}
        >
          <Transformation
            quality="auto"
            fetchFormat="auto"
            flags="progressive:semi"
            dpr="auto"
          />
        </Image>
        <p className="link-overlay-text text-uppercase" style={{ ...style }}>
          {text}
        </p>
      </div>
    </Link>
  );
};

// All items component
// Important! add unique key
export const Menu = ({ list, sideLength, footer, style = {} }) =>
  list.map((el, i) => {
    const { title, journalUrl, imageUrl } = el;

    return (
      <MenuItem
        text={footer ? "" : title}
        link={journalUrl}
        key={title + i}
        imageUrl={imageUrl}
        sideLength={sideLength}
        style={style}
        footer={footer}
      />
    );
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

export const HorizontalScroll = ({ list, footer, style = {} }) => {
  let windowWidth = useWindowWidth();
  let sideLength = footer ? Math.max(Math.floor(windowWidth / 10), 125) : 250;

  if (list) {
    if (windowWidth > 768) {
      return (
        <CloudinaryContext cloudName="sunshinephoto">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "relative",
              // background: `linear-gradient(90deg,
              //    rgba(147, 173, 207, 1) 10%,
              //    rgba(255, 255, 255, 1) 25%,
              //    rgba(255, 255, 255, 1) 75%,
              //    rgba(147, 173, 207, 1) 90%)`,
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              margin: "1rem auto",
            }}
          >
            <ScrollingHorizontally
              pageLock={true}
              reverseScroll={true}
              style={{
                height: `${sideLength * 1.5}px`,
                width: "100%",
                // background: `linear-gradient(90deg, rgba(0, 0, 0, 0.55) 10%, rgba(0, 0, 0, 0.10) 25%, rgba(0, 0, 0, 0.10) 75%, rgba(0, 0, 0, 0.55) 90%)`,
              }}
              // className="scrolling-horizontally"
              //  config        = {{ stiffness: int, damping: int }}
              //  animValues    = { int }
            >
              {list &&
                Menu({ list: [...list, ...list], sideLength, style, footer })}
            </ScrollingHorizontally>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                background: `linear-gradient(90deg,
                  rgba(255, 255, 255, 1) 0%, 
                  rgba(255, 255, 255, 0) 100%)`,
                width: "15%",
                height: "100%",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: `linear-gradient(90deg,
                  rgba(255, 255, 255, 0) 0%, 
                  rgba(255, 255, 255, 1) 100%)`,
                width: "15%",
                height: "100%",
              }}
            ></div>
          </div>
        </CloudinaryContext>
      );
    } else {
      return (
        <CloudinaryContext cloudName="sunshinephoto">
          <div className="d-flex">
            <div
              className="d-flex scrolling-horizontally"
              style={{
                overflowX: "scroll",
                margin: "1rem auto",
                width: "90%",
                // background: `linear-gradient(90deg, rgba(0, 0, 0, 0.55) 10%, rgba(0, 0, 0, 0.10) 25%, rgba(0, 0, 0, 0.10) 75%, rgba(0, 0, 0, 0.55) 90%)`,
              }}
            >
              {list &&
                Menu({ list: [...list, ...list], sideLength, style, footer })}
            </div>
          </div>
        </CloudinaryContext>
      );
    }
  } else {
    return (
      <div
        style={{
          height: `${sideLength * 1.5}px`,
        }}
      ></div>
    );
  }
};

export default HorizontalScroll;
