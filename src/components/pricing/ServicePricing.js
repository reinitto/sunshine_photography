import React from "react";
import PriceImage from "./PriceImage";

export default function ServicePricing({ name, text, sessionPrices, details }) {
  return (
    <div>
      <h2>{name} session</h2>
      <div>
        <p>{text}</p>
      </div>
      <div className="d-flex">
        {sessionPrices
          ? sessionPrices.map(sessionPrice => (
              <PriceImage props={sessionPrice} />
            ))
          : null}
      </div>
      <div className="d-flex">
        <div>
          <h5>Session</h5>
          <p>details</p>
        </div>
        <div>
          <ul>{details ? details.map(detail => <li>{detail}</li>) : null}</ul>
          <p>All prices include VAT.</p>
        </div>
      </div>
    </div>
  );
}
