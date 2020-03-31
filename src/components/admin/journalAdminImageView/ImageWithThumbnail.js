import React from "react";
import FileDrop from "react-file-drop";
import { inputStyles } from "./inputStyles";
export let ImageWithThumbnail = ({ imageRef, loadFile, id, srcLink }) => {
  let handleDrop = files => {
    loadFile(files[0], imageRef, id);
  };
  let isLink = srcLink.match(/^images/);
  return (
    <div
      className="fitted-image"
      ref={imageRef}
      style={{
        ...inputStyles,
        backgroundImage: isLink
          ? `url(https://res.cloudinary.com/sunshinephoto/image/upload/c_thumb,w_500,g_face/${srcLink})`
          : srcLink
      }}
    >
      <FileDrop onDrop={handleDrop}>Drop an image here!</FileDrop>
    </div>
  );
};
