import React from "react";
import ReactCountryFlag from "react-country-flag";
export const TextAreaWithFlag = ({
  flagCode,
  placeholder,
  textValue,
  updateTextValue,
}) => {
  return (
    <div className="d-flex align-items-center p-1">
      <ReactCountryFlag
        countryCode={flagCode}
        svg
        style={{
          width: "2em",
          height: "100%",
        }}
      />
      <textarea
        rows={5}
        className="text-center w-100"
        type="text"
        placeholder={`${placeholder} ${flagCode} `}
        //   value={serviceParagraph["lat"]}
        //   onChange={(e) => updateServiceParagraph(e, "lat")}
        value={textValue[flagCode]}
        onChange={(e) => updateTextValue(flagCode, e.target.value)}
      />
    </div>
  );
};
