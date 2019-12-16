import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import portfolioImages from "../content/portfolioImages";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

let portfolioThumbs = [...Object.keys(portfolioImages)].map(key => [
  key,
  portfolioImages[key][0]
]);

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

export default function LinksToGallery() {
  const width = useWindowWidth();
  return (
    <div className={width < 768 ? "pb-3 mx-auto w-90" : "container pb-3"}>
      <h2 className="text-center">Portfolio</h2>
      <CloudinaryContext cloudName="sunshinephoto">
        <div
          className={`links-to-gallery`}
          style={{
            display: "grid",
            gridTemplateColumns:
              width > 425 ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
            gridGap: "10px"
          }}
        >
          {portfolioThumbs.map((thumb, i) => {
            return (
              <Link
                to={`/gallery#${thumb[0]}`}
                className="link-to-gallery"
                key={i}
              >
                <div>
                  <Image
                    publicId={thumb[1].src}
                    style={{
                      width: "100%"
                    }}
                  >
                    <Transformation quality="auto" fetchFormat="auto" />
                  </Image>
                  <p className="link-overlay-text text-uppercase">{thumb[0]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </CloudinaryContext>
    </div>
  );
}
