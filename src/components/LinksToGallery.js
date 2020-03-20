import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import portfolioImages from "../content/portfolio.json";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return windowWidth;
}

let portfolioThumbs = [...Object.keys(portfolioImages)].map((key, i) => {
  return (
    <Link to={`/gallery#${key}`} key={i}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%"
        }}
      >
        <Image
          publicId={portfolioImages[key][0].src}
          className="p-3"
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <Transformation quality="auto" fetchFormat="auto" />
        </Image>
        <p className="link-overlay-text text-uppercase">{key}</p>
      </div>
    </Link>
  );
});

let LinkLayout = ({ links, reverse = false }) => {
  return reverse ? (
    <div className="links-to-gallery-layout">
      <div className="single-link">{links[0] ? links[0] : null}</div>
      <div className="two-links">
        {links[1] ? links[1] : null}
        {links[2] ? links[2] : null}
      </div>
    </div>
  ) : (
    <div className="links-to-gallery-layout">
      <div className="two-links">
        {links[0] ? links[0] : null}
        {links[1] ? links[1] : null}
      </div>
      <div className="single-link">{links[2] ? links[2] : null}</div>
    </div>
  );
};

export default function LinksToGallery() {
  const width = useWindowWidth();
  return (
    <div
      className={width < 768 ? "pb-3 mx-auto w-90 " : "container pb-3"}
      style={{
        backgroundColor: "#faf7f6"
      }}
    >
      <h2 className="text-center">Capture Your Life Journey</h2>
      <CloudinaryContext cloudName="sunshinephoto">
        <div className="d-flex links-to-gallery">
          <LinkLayout links={portfolioThumbs.slice(0, 3)} />
          <LinkLayout
            links={portfolioThumbs.slice(3)}
            reverse={width < 769 ? false : true}
          />
        </div>
      </CloudinaryContext>
    </div>
  );
}
