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
      className="intro-image d-flex flex-column justify-content-center"
      style={{
        backgroundImage: `url(${imageSrc ? imageSrc : null})`,
        height,
        marginTop: "60px",
      }}
    >
      <div
        style={{
          fontSize: inJournal ? "4rem" : "8rem",
        }}
      >
        {/* <p>{title}</p> */}
        {subtitle ? <h2 className="text-center">{subtitle}</h2> : null}
      </div>
      {/* <div className="carousel-text3">
        {text3
          ? text3.map((text, i) => {
              return <span key={i}>{text}</span>;
            })
          : null}
      </div> */}
    </div>
  );
}
