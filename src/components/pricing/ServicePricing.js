import React from "react";
import PriceImage from "./PriceImage";

export default function ServicePricing({
  name,
  paragraphText,
  sessions,
  details,
}) {
  return (
    <div>
      <h2 className="text-center">{name}</h2>
      <div>
        <p className="text-center">{paragraphText}</p>
      </div>
      <div className="d-flex justify-content-center">
        {sessions
          ? Object.keys(sessions).map((key) => (
              <PriceImage key={key} sessionKey={sessions[key]} />
            ))
          : null}
      </div>
      <div className="d-flex">
        <div
          style={{
            borderRight: "1px solid black",
          }}
        >
          <h5>Session</h5>
          <p>details</p>
        </div>
        <div>
          <ul>
            {details
              ? Object.keys(details).map((key) => (
                  <li key={key}>{details[key].text}</li>
                ))
              : null}
          </ul>
          <p>All prices include VAT.</p>
        </div>
      </div>
    </div>
  );
}
