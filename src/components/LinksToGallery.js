import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="container">
      <h2 className="text-center">Gallery</h2>

      <div
        className={`links-to-gallery`}
        style={{
          display: "grid",
          gridTemplateColumns:
            width > 425 ? "repeat(2, 1fr)" : "repeat(1, 1fr)",
          gridGap: "10px"
        }}
      >
        <Link to="/gallery#baby" className="link-to-gallery">
          <div
            className="link-to-baby-gallery "
            style={{
              backgroundImage: `
                url(
                  'https://images.unsplash.com/photo-1546015720-b8b30df5aa27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80')`,
              backgroundRepeat: "no-repeat",
              height: `300px`,
              fontSize: "2.5rem",
              display: "flex",
              color: "white",
              backgroundSize: "cover"
            }}
          ></div>
        </Link>
        <Link to="/gallery#family" className="link-to-gallery">
          <div
            className="link-to-family-gallery"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80')`,
              backgroundRepeat: "no-repeat",
              height: `300px`,
              fontSize: "2.5rem",
              textDecoration: "none",
              display: "flex",
              color: "white",
              backgroundSize: "cover"
            }}
          ></div>
        </Link>
        <Link to="/gallery#portrait" className="link-to-gallery">
          <div
            className="link-to-portrait-gallery"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80')`,
              backgroundRepeat: "no-repeat",
              height: `300px`,
              fontSize: "2.5rem",
              textDecoration: "none",
              display: "flex",
              color: "white",
              backgroundSize: "cover"
            }}
          ></div>
        </Link>
        <Link to="/gallery#event" className="link-to-gallery">
          <div
            className="link-to-event-gallery"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80')`,
              backgroundRepeat: "no-repeat",
              height: `300px`,
              fontSize: "2.5rem",
              textDecoration: "none",
              display: "flex",
              color: "white",
              backgroundSize: "cover"
            }}
          ></div>
        </Link>
      </div>
    </div>
  );
}
