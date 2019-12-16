import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import portfolioImages from "../../content/portfolioImages";

export function GalleryNav({ collections, isJournal }) {
  const journalLinks = Object.keys(collections).map((collection, i) => {
    return (
      <Link
        style={{
          width: "100%",
          height: "450px",
          padding: "1rem"
        }}
        to={`/journal#${collection}`}
        key={i}
      >
        <div
          style={{
            backgroundImage: `${"url(" +
              collections[collection][0].src +
              "&w=450&q=60" +
              ")"}`,
            objectFit: `cover`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
            width: "100%",
            height: "100%",
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`
          }}
        >
          <p
            style={{
              background: "white",
              padding: "1rem 3rem"
            }}
          >{`${collection}`}</p>
        </div>
      </Link>
    );
  });
  const portfolioLinks = Object.keys(collections).map((collection, i) => {
    return (
      <Link
        key={i}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          borderRight: i % 2 === 0 ? "2px solid grey" : "",
          borderLeft: i % 2 === 1 ? "2px solid grey" : "",
          borderTop: i - 2 >= 0 ? "2px solid grey" : "",
          borderBottom: 2 - i >= 1 ? "2px solid grey" : ""
        }}
        to={`/${isJournal ? "journal" : "gallery"}#${collection}`}
      >
        {`${collection}`}
      </Link>
    );
  });
  return isJournal ? (
    <div
      className="journal-nav"
      style={{
        display: "grid",
        gridGap: "15px",
        justifyItems: "center"
      }}
    >
      {journalLinks}
    </div>
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        justifyItems: "center",
        margin: "3rem"
      }}
    >
      {portfolioLinks}
    </div>
  );
}

export default class Gallery extends Component {
  render() {
    const galleries = this.props.galleries || portfolioImages;
    const isJournal = this.props.isJournal || false;
    return (
      <Fragment>
        {isJournal ? (
          <Fragment>
            {window.location.hash.slice(1) ? (
              <ImageGallery
                galleryName={this.props.collection || Object.keys(galleries)[0]}
                photos={
                  galleries[this.props.collection].slice(1) ||
                  galleries[Object.keys(galleries)[0]].slice(1)
                }
              />
            ) : (
              <GalleryNav collections={galleries} isJournal />
            )}
          </Fragment>
        ) : (
          <Fragment>
            <p>
              For higher resolution images <Link to="/contact">contact me</Link>{" "}
              or Visit{" "}
              <a
                target="_blank"
                href="http://www.shutterstock.com"
                rel="noopener noreferrer"
              >
                Shutterstock
              </a>
            </p>
            <GalleryNav collections={galleries} />
            <ImageGallery
              galleryName={this.props.collection || Object.keys(galleries)[0]}
              photos={
                galleries[this.props.collection] ||
                galleries[Object.keys(galleries)[0]]
              }
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
