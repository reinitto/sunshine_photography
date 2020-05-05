import React from "react";
import { Link } from "react-router-dom";
import ScrollingHorizontally from "react-scroll-horizontal";
import { CloudinaryContext } from "cloudinary-react";
import { ProgressiveCloudinaryImage } from "./ProgressiveCloudinaryImage";
import { useWindowWidth } from "./useWindowWidth";

export const MenuItem = ({
  text,
  link,
  imageUrl,
  width,
  height,
  style = {},
}) => {
  let public_id = imageUrl.match(/(images\/.*)/)[1].split(".")[0];

  return (
    <Link
      to={`/journal/${link}`}
      className={`menu-item d-flex flex-column align-items-center justify-content-center p-3`}
      style={{
        background: `linear-gradient(
          rgba(147, 173, 207, 0.15), 
          rgba(147, 173, 207, 0.45)
        )`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <ProgressiveCloudinaryImage
          publicId={public_id}
          style={{ objectFit: "cover", height: "100%" }}
        />
        <p className="link-overlay-text text-uppercase" style={{ ...style }}>
          {text}
        </p>
      </div>
    </Link>
  );
};

// All items component
// Important! add unique key
export const Menu = ({ list, sideLength, footer, style = {} }) => {
  let width = sideLength > 300 ? 300 : sideLength;
  let height = width * 1.25;

  return list.map((el, i) => {
    const { title, journalUrl, imageUrl } = el;

    return (
      <MenuItem
        text={footer ? "" : title}
        link={journalUrl}
        key={title + i}
        imageUrl={imageUrl}
        width={width}
        height={height}
        style={style}
        footer={footer}
      />
    );
  });
};

// const Arrow = ({ text, className }) => {
//   return <div className={className}>{text}</div>;
// };

// export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
// export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

export const HorizontalScroll = ({ list = [], footer, style = {} }) => {
  let windowWidth = useWindowWidth();
  let sideLength = footer ? Math.max(Math.floor(windowWidth / 10), 125) : 250;

  let content = Menu({ list: [...list, ...list], sideLength, style, footer });

  if (windowWidth > 768) {
    return (
      <CloudinaryContext cloudName="sunshinephoto">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "relative",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            margin: "1rem auto",
            height: `${sideLength * 1.25 + 32}px`,
          }}
        >
          <ScrollingHorizontally
            // pageLock={true}
            reverseScroll={true}
            style={{
              height: "100%",
              width: "100%",
            }}
            config={{ stiffness: 60, damping: 10 }}
            // className="scrolling-horizontally"
            //  config = {{ stiffness: int, damping: int }}
            // animValues={10}
          >
            {content}
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
            }}
          >
            {content}
          </div>
        </div>
      </CloudinaryContext>
    );
  }
};

export default HorizontalScroll;
