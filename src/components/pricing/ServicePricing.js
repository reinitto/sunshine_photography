import React from "react";
import PriceImage from "./PriceImage";
import Spinner from "../Spinner";
import ImageGalleryWithoutLighbox from "../../components/portfolio/ImageGalleryWithoutLighbox";

export default function ServicePricing({
  name,
  paragraphText,
  images,
  sessions,
  details,
}) {
  return images && images.length > 0 ? (
    <div>
      <div>
        <p className="text-center">{paragraphText}</p>
      </div>
      <ImageGalleryWithoutLighbox images={images} />
      <hr />
      <h3 className="text-center">Available Sessions</h3>
      <div className="d-flex justify-content-center">
        {sessions
          ? Object.keys(sessions).map((key) => (
              <PriceImage key={key} sessionKey={sessions[key]} />
            ))
          : null}
      </div>
      {details && Object.keys(details).length > 0 && (
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
      )}
    </div>
  ) : (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <Spinner />
    </div>
  );
}
