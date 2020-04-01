import React from "react";
import { Link } from "react-router-dom";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { useWindowWidth } from "../useWindowWidth";
// One item component
// selected prop will be passed
const MenuItem = ({ text, link, imageUrl, sideLength }) => {
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
const Menu = (list, sideLength) =>
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

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

const HorizontalScroll = ({ list }) => {
  let windowWidth = useWindowWidth();
  let sideLength = Math.floor(windowWidth / 3);
  let menu = Menu(list, sideLength);
  return (
    <CloudinaryContext cloudName="sunshinephoto">
      <div
        className="horizontal-scroll-menu"
        // onMouseEnter={() => {
        //   let window = document.querySelector("html");
        //   window.style.overflowY = "hidden";
        // }}
        // onMouseLeave={() => {
        //   let window = document.querySelector("html");
        //   window.style.overflowY = "visible";
        //   console.log("enable vert scroll");
        // }}
      >
        <ScrollMenu data={menu} arrowLeft={ArrowLeft} arrowRight={ArrowRight} />
      </div>
    </CloudinaryContext>
  );
};

const Footer = ({ journals }) => {
  let journalItems = [];
  if (journals) {
    journalItems = Object.keys(journals).map(key => {
      let { title, titleUrl } = journals[key].title;
      return {
        journalUrl: key,
        title,
        imageUrl: titleUrl
      };
    });
  }
  return (
    <footer className="d-flex flex-column">
      <HorizontalScroll list={journalItems} />
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary btn-base"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          To The Top
        </button>
      </div>
      <div>
        <small>
          &copy; Copyright {new Date().getFullYear()}, Example Corporation
        </small>
      </div>
    </footer>
  );
};
export default Footer;
