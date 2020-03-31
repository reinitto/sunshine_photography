import React from "react";
import { OneImage } from "./OneImage";
export let ThreeJournalImagesWithText = ({
  imageRefs,
  loadFile,
  ids,
  srcLinks
}) => {
  return (
    <div style={{ display: "flex" }}>
      <OneImage
        id={ids[0]}
        imageRef={imageRefs[0]}
        loadFile={loadFile}
        srcLink={srcLinks[0]}
      />
      <OneImage
        id={ids[1]}
        imageRef={imageRefs[1]}
        loadFile={loadFile}
        srcLink={srcLinks[1]}
      />
      <OneImage
        id={ids[2]}
        imageRef={imageRefs[2]}
        loadFile={loadFile}
        srcLink={srcLinks[2]}
      />
    </div>
  );
};
