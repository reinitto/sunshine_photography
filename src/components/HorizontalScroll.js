import React from "react";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { CloudinaryContext } from "cloudinary-react";
import { useWindowWidth } from "./useWindowWidth";

export const MenuItem = ({ text, link, imageUrl, sideLength, style = {} }) => {
  let public_id = imageUrl.match(/(images\/.*)/)[1].split(".")[0];
  return (
    <Link to={`/journal/${link}`} className={`menu-item`}>
      <div
        style={{
          position: "relative",
        }}
      >
        <Image
          publicId={public_id}
          width={sideLength > 300 ? 300 : sideLength}
          height={sideLength > 300 ? 300 : sideLength}
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
  list.map((el) => {
    const { title, journalUrl, imageUrl } = el;

    return (
      <MenuItem
        text={footer ? "" : title}
        link={journalUrl}
        key={title}
        imageUrl={imageUrl}
        sideLength={sideLength}
        style={style}
      />
    );
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

export const HorizontalScroll = ({ list, footer, style, ...rest }) => {
  let windowWidth = useWindowWidth();
  let sideLength = footer
    ? Math.max(Math.floor(windowWidth / 10), 125)
    : Math.floor(windowWidth / 3);
  let menu = [];
  if (list) {
    menu = Menu({ list, sideLength, style, footer });
  }
  return (
    <CloudinaryContext cloudName="sunshinephoto">
      <div className="horizontal-scroll-menu">
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          {...rest}
        />
      </div>
    </CloudinaryContext>
  );
};

export default HorizontalScroll;
