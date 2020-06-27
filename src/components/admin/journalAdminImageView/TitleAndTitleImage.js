import React, { createRef } from "react";
import ReactCountryFlag from "react-country-flag";
import { FileDrop } from "react-file-drop";
import { inputStyles } from "./inputStyles";
export let TitleAndTitleImage = ({
  setTitle,
  loadTitle,
  titleText,
  titleSrc,
}) => {
  let titleImageRef = createRef(null);
  let handleDrop = (files) => {
    loadTitle(files[0], titleImageRef);
  };
  let isLink = titleSrc ? titleSrc.match(/^http/) : null;
  return (
    <>
      <div
        style={{
          ...inputStyles,
          backgroundImage: isLink
            ? `url(${titleSrc.replace(/upload\//, "/upload/c_scale,w_500/")})`
            : titleSrc,
        }}
        className="fitted-image"
        ref={titleImageRef}
      >
        <FileDrop onDrop={handleDrop}>Drop title image here!</FileDrop>
      </div>
      <div className="d-flex align-items-center">
        <ReactCountryFlag
          countryCode="US"
          svg
          style={{
            width: "2em",
            height: "100%",
          }}
        />
        <textarea
          style={{
            width: "100%",
          }}
          // className="title-input"
          name="journalTitle"
          placeholder="Enter title eng"
          value={titleText["eng"]}
          onChange={(e) => {
            setTitle(e.target.value, "eng");
          }}
        />
      </div>
      <div className="d-flex align-items-center">
        <ReactCountryFlag
          countryCode="LV"
          svg
          style={{
            width: "2em",
            height: "100%",
          }}
        />
        <textarea
          style={{
            width: "100%",
          }}
          // className="title-input"
          name="journalTitle"
          placeholder="Enter title lat"
          value={titleText["lat"]}
          onChange={(e) => {
            setTitle(e.target.value, "lat");
          }}
        />
      </div>
      <div className="d-flex align-items-center">
        <ReactCountryFlag
          countryCode="NO"
          svg
          style={{
            width: "2em",
            height: "100%",
          }}
        />
        <textarea
          style={{
            width: "100%",
          }}
          // className="title-input"
          name="journalTitle"
          placeholder="Enter title nor"
          value={titleText["nor"]}
          onChange={(e) => {
            setTitle(e.target.value, "nor");
          }}
        />
      </div>
    </>
  );
};

export default TitleAndTitleImage;
