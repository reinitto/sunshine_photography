import React from "react";
import { inputStyles } from "./inputStyles";
export let TextBlock = ({ id, setTextBlockText, text, title }) => {
  return (
    <div style={inputStyles} className="journal-text-block">
      <input
        type="text"
        name="text-block-title"
        placeholder="Enter a title"
        value={title}
        onChange={e => {
          setTextBlockText(id, e.target.value, true);
        }}
      />

      <textarea
        className="text-block-text"
        name="text-block-text"
        value={text}
        placeholder="Enter some text. Grab bottom-right corner to make text box bigger"
        onChange={e => {
          setTextBlockText(id, e.target.value);
        }}
      />
    </div>
  );
};
