import React from "react";
import { Link } from "react-router-dom";
import { Image, Transformation } from "cloudinary-react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { CloudinaryContext } from "cloudinary-react";
import { useWindowWidth } from "./useWindowWidth";

export const MenuItem = ({ text, link, imageUrl, sideLength }) => {
  let public_id = imageUrl.match(/(images\/.*)/)[1].split(".")[0];
  return (
    <Link to={`/journal/${link}`} className={`menu-item`}>
      <div
        style={{
          position: "relative"
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
        <p className="link-overlay-text text-uppercase">{text}</p>
      </div>
    </Link>
  );
};

// All items component
// Important! add unique key
export const Menu = (list, sideLength) =>
  list.map(el => {
    const { title, journalUrl, imageUrl } = el;

    return (
      <MenuItem
        text={title}
        link={journalUrl}
        key={title}
        imageUrl={imageUrl}
        sideLength={sideLength}
      />
    );
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

export const HorizontalScroll = ({ list }) => {
  console.log("list", list);
  let windowWidth = useWindowWidth();
  let sideLength = Math.floor(windowWidth / 3);
  let menu = [];
  if (list) {
    menu = Menu(list, sideLength);
  }
  return (
    <CloudinaryContext cloudName="sunshinephoto">
      <div className="horizontal-scroll-menu">
        <ScrollMenu data={menu} arrowLeft={ArrowLeft} arrowRight={ArrowRight} />
      </div>
    </CloudinaryContext>
  );
};

export default HorizontalScroll;
