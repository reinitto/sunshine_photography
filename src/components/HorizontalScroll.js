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
        >
          <Transformation quality="auto" fetchFormat="auto" />
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
          <ScrollingHorizontally
            pageLock={true}
            reverseScroll={true}
            style={{
              height: `${sideLength * 1.5}px`,
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              margin: "1rem auto",
              width: "70%",
            }}
            // className="scrolling-horizontally"
            //  config        = {{ stiffness: int, damping: int }}
            //  animValues    = { int }
          >
            {list &&
              Menu({ list: [...list, ...list], sideLength, style, footer })}
          </ScrollingHorizontally>
        </CloudinaryContext>
      );
    } else {
      return (
        <CloudinaryContext cloudName="sunshinephoto">
          <div
            className="d-flex scrolling-horizontally"
            style={{
              overflowX: "scroll",
              margin: "1rem auto",
              width: "90%",
            }}
          >
            {list &&
              Menu({ list: [...list, ...list], sideLength, style, footer })}
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
