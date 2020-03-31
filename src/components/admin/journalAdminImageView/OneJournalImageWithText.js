import React from "react";
import { OneImageWithText } from "./OneImageWithText";
export let OneJournalImageWithText = ({
  setImageText,
  imageRef,
  loadFile,
  id,
  srcLink,
  imageText
}) => {
  return (
    <div className="flex">
      <OneImageWithText
        id={id}
        imageRef={imageRef}
        loadFile={loadFile}
        setImageText={setImageText}
        srcLink={srcLink}
        imageText={imageText}
      />
    </div>
  );
};
