import React from "react";
import { Link } from "react-router-dom";
import portfolioImages from "../content/portfolio.json";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { useWindowWidth } from "./useWindowWidth";

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
          width="300"
          crop="scale"
          className="p-3 fitted-image"
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

let SingleLink = ({ link }) => {
  if (link) {
    return <div className="single-link">{link}</div>;
  } else {
    return null;
  }
};

let LinkLayout = ({ links, reverse = false }) => {
  if (reverse) {
    return (
      <div className="links-to-gallery-layout">
        <SingleLink link={links[0]} />
        <div className="two-links">{[links[1], links[2]]}</div>
      </div>
    );
  } else {
    return (
      <div className="links-to-gallery-layout">
        <div className="two-links">{[links[0], links[1]]}</div>
        <SingleLink link={links[2]} />
      </div>
    );
  }
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
      <h2 className="text-center">Capture Your Life's Journey</h2>
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
