import React, { Fragment } from "react";
import ReactCountryFlag from "react-country-flag";

import { inputStyles } from "./inputStyles";
export let TextBlock = ({ id, setTextBlockText, text, title }) => {
  return (
    <Fragment>
      <hr
        style={{
          border: "1px solid black",
          width: "100%",
        }}
      />
      <div style={inputStyles} className="journal-text-block">
        <div className="d-flex align-items-center">
          <ReactCountryFlag
            countryCode="US"
            svg
            style={{
              width: "2em",
              height: "100%",
            }}
          />
          <input
            type="text"
            name="text-block-title"
            className="text-block-title"
            placeholder="Enter a title eng"
            value={title["eng"]}
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "eng", true);
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
          <input
            type="text"
            name="text-block-title"
            className="text-block-title"
            placeholder="Enter a title lat"
            value={title["lat"]}
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "lat", true);
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
          <input
            type="text"
            name="text-block-title"
            className="text-block-title"
            placeholder="Enter a title nor"
            value={title["nor"]}
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "nor", true);
            }}
          />
        </div>
        <hr
          style={{
            border: "none",
            width: "100%",
          }}
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
            className="text-block-text"
            name="text-block-text"
            value={text["eng"]}
            placeholder="Enter some text. Grab bottom-right corner to make text box bigger eng"
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "eng");
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
            className="text-block-text"
            name="text-block-text"
            value={text["lat"]}
            placeholder="Enter some text. Grab bottom-right corner to make text box bigger lat"
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "lat");
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
            className="text-block-text"
            name="text-block-text"
            value={text["nor"]}
            placeholder="Enter some text. Grab bottom-right corner to make text box bigger nor"
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "nor");
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};
