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
            value={title["us"]}
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "us", true);
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
            value={title["lv"]}
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "lv", true);
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
            value={title["no"]}
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "no", true);
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
            value={text["us"]}
            placeholder="Enter some text. Grab bottom-right corner to make text box bigger us"
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "us");
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
            value={text["lv"]}
            placeholder="Enter some text. Grab bottom-right corner to make text box bigger lv"
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "lv");
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
            value={text["no"]}
            placeholder="Enter some text. Grab bottom-right corner to make text box bigger no"
            onChange={(e) => {
              setTextBlockText(id, e.target.value, "no");
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};
