import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import ImageGalleryWithoutLighbox from "./ImageGalleryWithoutLighbox";

import portfolioImages from "../../content/portfolio.json";
// import { GalleryNav } from "./GalleryNav";

export default class Gallery extends Component {
  render() {
    const galleries = this.props.galleries || portfolioImages;
    const isJournal = this.props.isJournal || false;
    const collection = this.props.collection;
    return (
      <Fragment>
        {isJournal ? (
          <Fragment>
            <ImageGalleryWithoutLighbox
              isJournal={true}
              journalImages={galleries}
            />
          </Fragment>
        ) : (
          <Fragment>
            <p>
              For higher resolution images <Link to="/contact">contact me</Link>
              or Visit
              <a
                target="_blank"
                href="http://www.shutterstock.com"
                rel="noopener noreferrer"
              >
                Shutterstock
              </a>
            </p>
            {/* <GalleryNav collections={galleries} /> */}
            <ImageGallery
              galleryName={collection || Object.keys(galleries)[0]}
              photos={
                galleries[collection] || galleries[Object.keys(galleries)[0]]
              }
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
