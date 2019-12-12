import React, { Fragment } from "react";
import Gallery from "../components/portfolio/Gallery";
import Navbar from "../components/layout/Navbar";
export default function GalleryPage() {
  return (
    <Fragment>
      <Navbar />
      <div
        style={{
          height: "70px"
        }}
      ></div>
      <div style={{ width: "90%", margin: "auto" }}>
        <h2 className="text-center">Portfolio</h2>
        <Gallery collection={window.location.hash.slice(1)} />
      </div>
    </Fragment>
  );
}
