import React, { Fragment } from "react";
import Gallery from "../components/portfolio/Gallery";
import Navbar from "../components/layout/Navbar";
export default function GalleryPage() {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <h2>Gallery</h2>
        <Gallery collection={window.location.hash.slice(1) || "baby"} />
      </div>
    </Fragment>
  );
}
