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
  language,
}) {
  return images && images.length > 0 ? (
    <div>
      <div className="mx-auto">
        <p className="text-left">
          {paragraphText[language] ||
            paragraphText["eng"] ||
            paragraphText["us"]}
        </p>
      </div>
      <ImageGalleryWithoutLighbox
        images={images}
        name={name[language] || name["eng"] || name["us"]}
      />
      <hr />
      <h3 className="text-center">Available Sessions</h3>
      <div className="d-flex justify-content-center flex-wrap">
        {sessions
          ? Object.keys(sessions).map((key) => (
              <PriceImage
                key={key}
                sessionKey={sessions[key]}
                language={language}
              />
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
              {Object.keys(details).map((key) => (
                <li key={key} className="service-detail-item">
                  {details[key].text[language] ||
                    details[key].text["eng"] ||
                    details[key].text["us"]}
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-center align-items-center">
              <a className="about-button btn btn-base m-3" href="/#contactForm">
                Contact Me
              </a>
            </div>
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
