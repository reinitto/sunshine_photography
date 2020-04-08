import React, { createRef } from "react";
import { FileDrop } from "react-file-drop";
import { inputStyles } from "./inputStyles";
export let TitleAndTitleImage = ({
  setTitle,
  loadTitle,
  titleText,
  titleSrc
}) => {
  let titleImageRef = createRef(null);
  let handleDrop = files => {
    loadTitle(files[0], titleImageRef);
  };
  let isLink = titleSrc ? titleSrc.match(/^http/) : null;
  return (
    <>
      <div
        style={{
          ...inputStyles,
          backgroundImage: isLink ? `url(${titleSrc})` : titleSrc
        }}
        className="fitted-image"
        ref={titleImageRef}
      >
        <FileDrop onDrop={handleDrop}>
          Drop title image here!
          <textarea
            style={{
              color: "white"
            }}
            className="title-input"
            name="journalTitle"
            placeholder="Enter title"
            value={titleText}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
        </FileDrop>
      </div>
    </>
  );
};

export default TitleAndTitleImage;
