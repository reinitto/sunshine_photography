import React from "react";

export default function IntroImage({
  imageSrc,
  title,
  subtitle,
  text3,
  height = "55px",
  inJournal,
}) {
  return (
    <div
      className="fitted-image intro-image"
      style={{
        backgroundImage: `url(${imageSrc ? imageSrc : null})`,
        height,
      }}
    >
      <div
        className="carousel-text"
        style={{
          fontSize: inJournal ? "4rem" : "8rem",
        }}
      >
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
