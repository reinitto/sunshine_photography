import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";
import { useWindowWidth } from "./useWindowWidth";

export const MenuItem = ({
  text,
  link,
  imageUrl,
  width,
  height,
  footer = false,
}) => {
  let Item = () => (
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
      }}
    >
      <img
        src={
          footer
            ? imageUrl
            : imageUrl.replace(
                "upload",
                "upload/f_jpg,fl_progressive:steep/c_scale,dpr_1.0,w_300"
              )
        }
        alt={text}
        loading="lazy"
        style={{ objectFit: "cover", height: "100%", width }}
      />
   
      {text ? (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: `${width}px`,
            height: `${height}px`,
            background: `rgba(0, 0, 0, 0.20)`,
          }}
        >
          <p className="link-overlay-text text-uppercase">{text}</p>
        </div>
      ) : null}
    </div>
  );

  return !footer ? (
    <Link
      to={footer ? "" : `/journal/${link}`}
      className={`menu-item d-flex flex-column align-items-center justify-content-center p-3`}
      style={{
        background: `linear-gradient(
        rgba(147, 173, 207, 0.15), 
        rgba(147, 173, 207, 0.45)
      )`,
      }}
      aria-label={`journal ${text}`}
    >
      <Item />
    </Link>
  ) : (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      className={`menu-item d-flex flex-column align-items-center justify-content-center p-3`}
      style={{
        background: `linear-gradient(
        rgba(147, 173, 207, 0.15), 
        rgba(147, 173, 207, 0.45)
      )`,
      }}
      aria-label={text}
    >
      <Item />
    </a>
  );
};

// All items component
// Important! add unique key
export const Menu = ({ list, sideLength, footer, language, style = {} }) => {
  let width = sideLength > 300 ? 300 : sideLength;
  let height = width * 1.25;
  return list.map((el, i) => {
    const { title, journalUrl, imageUrl } = el;
    console.log('title',title)
    return (
      <MenuItem
        text={footer ? "" :( title[language]?title[language]:title['us']||title['eng'])}
        link={journalUrl}
        key={footer ? i : title[language] + i}
        imageUrl={imageUrl}
        width={width}
        height={height}
        style={style}
        footer={footer}
      />
    );
  });
};

export const HorizontalScroll = ({
  list = [],
  footer,
  language,
  style = {},
}) => {
  let windowWidth = useWindowWidth();
  let horizontalScroll = useRef();
  let sideLength = footer ? Math.max(Math.floor(windowWidth / 10), 125) : 250;

  let content = Menu({
    list: [...list, ...list],
    sideLength,
    style,
    footer,
    language,
  });

  let goLeft = () => {
    let hs = horizontalScroll.current;
    let currentX = hs.style.transform.match(/translateX\((-?\d+)px/)[1];
    hs.style.transform = `translateX(${Math.min(
      0,
      parseInt(currentX) + 250
    )}px)`;
  };
  let goRight = (e) => {
    let hs = horizontalScroll.current;
    let currentX = hs.style.transform.match(/translateX\((-?\d+)px/)[1];
    let contentLength = sideLength * list.length * 2;
    let minX = windowWidth - contentLength;
    hs.style.transform = `translateX(${Math.max(
      minX,
      parseInt(currentX) - 250
    )}px)`;
  };
  if (windowWidth > 768) {
    return (
      <CloudinaryContext cloudName="sunshinephoto">
        <div
          className="d-flex"
          style={{
            position: "relative",
            borderTop: "1px solid black",
            borderBottom: "1px solid black",
            margin: "1rem auto",
            height: footer ? "175px" : "350px",
          }}
        >
          <div
            className="d-flex"
            style={{
              transform: `translateX(0px)`,
              transition: "transform 0.2s ease-in-out",
            }}
            ref={horizontalScroll}
          >
            {content}
          </div>
          <div
            onClick={goLeft}
            className="horizontal-arrow arrow-left"
            style={{
              left: 0,
            }}
          >
            <span>{" < "}</span>
          </div>
          <div
            onClick={goRight}
            className="horizontal-arrow arrow-right"
            style={{
              right: 0,
            }}
          >
            <span>{" > "}</span>
          </div>
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
