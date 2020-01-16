import React from "react";
import { Link } from "react-router-dom";
export function GalleryNav({ collections, isJournal }) {
  const journalLinks = Object.keys(collections).map((collection, i) => {
    return (
      <Link className="journal-link" to={`/journal#${collection}`} key={i}>
        <div
          className="journal-link-image"
          style={{
            backgroundImage: `${"url(https://res.cloudinary.com/sunshinephoto/image/upload/" +
              collections[collection][0].src +
              ")"}`
          }}
        >
          <p
            style={{
              background: "white",
              padding: "1rem 3rem"
            }}
          >{`${collection[0].toUpperCase() +
            collection.replace("_", " ").slice(1)}`}</p>
        </div>
      </Link>
    );
  });
  const portfolioLinks = Object.keys(collections).map((collection, i) => {
    return (
      <Link
        className="text-capitalize"
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
        to={`/gallery#${collection}`}
      >
        {`${collection}`}
      </Link>
    );
  });
  return isJournal ? (
    <div className="journal-nav">{journalLinks}</div>
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        justifyItems: "center",
        width: "50%",
        margin: "auto"
      }}
    >
      {portfolioLinks}
    </div>
  );
}
