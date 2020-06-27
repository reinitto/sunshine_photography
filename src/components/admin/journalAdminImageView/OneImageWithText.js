import React from "react";
import ReactCountryFlag from "react-country-flag";
import { OneImage } from "./OneImage";
export let OneImageWithText = ({
  setImageText,
  imageRef,
  loadFile,
  id,
  srcLink,
  imageText,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
      <OneImage
        id={id}
        imageRef={imageRef}
        loadFile={loadFile}
        srcLink={srcLink}
      />
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
          className="journal-image-text"
          rows="3"
          name="journalImageText"
          placeholder="Enter text about the image above. This will show up centered and in italics"
          value={imageText["eng"]}
          onChange={(e) => {
            setImageText(id, e.target.value, "eng");
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
          className="journal-image-text"
          rows="3"
          name="journalImageText"
          placeholder="Enter text about the image above. This will show up centered and in italics"
          value={imageText["lat"]}
          onChange={(e) => {
            setImageText(id, e.target.value, "lat");
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
          className="journal-image-text"
          rows="3"
          name="journalImageText"
          placeholder="Enter text about the image above. This will show up centered and in italics"
          value={imageText["nor"]}
          onChange={(e) => {
            setImageText(id, e.target.value, "nor");
          }}
        />
      </div>
    </div>
  );
};
