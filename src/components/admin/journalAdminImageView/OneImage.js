import React from "react";
import { ImageWithThumbnail } from "./ImageWithThumbnail";
export let OneImage = ({ imageRef, loadFile, id, srcLink }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <ImageWithThumbnail
        id={id}
        imageRef={imageRef}
        loadFile={loadFile}
        srcLink={srcLink}
      />
    </div>
  );
};
