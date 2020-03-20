import React from "react";
import { mainBg } from "../content/backgroundImages";

export default function IntroImage({
  imageSrc,
  title,
  subtitle,
  text3,
  height = "35vh"
}) {
  return (
    <div
      className="fitted-image intro-image"
      style={{
        backgroundImage: `url(${imageSrc})`,
        height
      }}
    >
      <div className="carousel-text">
        <p>{title}</p>
        {subtitle ? (
          <span className="carousel-text-subtitle">{subtitle}</span>
        ) : null}
      </div>
      <div className="carousel-text3">
        {text3
          ? text3.map((text, i) => {
              return <span key={i}>{text}</span>;
            })
          : null}
      </div>
    </div>
  );
}
IntroImage.defaultProps = {
  imageSrc: mainBg
};
