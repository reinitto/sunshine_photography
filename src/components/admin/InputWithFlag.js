import React from "react";
import ReactCountryFlag from "react-country-flag";
export const InputWithFlag = ({
  flagCode,
  placeholder,
  textValue,
  updateTextValue,
  id,
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
      <input
        className="text-center w-100"
        type="text"
        placeholder={`${placeholder} ${flagCode} `}
        //   value={serviceParagraph["lat"]}
        //   onChange={(e) => updateServiceParagraph(e, "lat")}
        value={textValue[flagCode]}
        onChange={(e) => updateTextValue(flagCode, e.target.value, id)}
      />
    </div>
  );
};
