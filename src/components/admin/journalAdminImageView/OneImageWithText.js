import React from "react";
import { OneImage } from "./OneImage";
export let OneImageWithText = ({
  setImageText,
  imageRef,
  loadFile,
  id,
  srcLink,
  imageText
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <OneImage
        id={id}
        imageRef={imageRef}
        loadFile={loadFile}
        srcLink={srcLink}
      />
      <textarea
        className="journal-image-text"
        rows="3"
        name="journalImageText"
        placeholder="Enter text about the image above. This will show up centered and in italics"
        value={imageText}
        onChange={e => {
          setImageText(id, e.target.value);
        }}
      />
    </div>
  );
};
