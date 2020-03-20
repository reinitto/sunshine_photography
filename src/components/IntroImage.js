import React from "react";

let cloudinaryBgs = [
  "https://res.cloudinary.com/sunshinephoto/image/upload/v1584501902/images/backgrounds/Sunshine_pictures_fron_page_darken_mlvg7i.jpg"
];
export default function IntroImage({
  imageSrc,
  title,
  subtitle,
  text3,
  height = "400px"
}) {
  return (
    <div
      className="fitted-image"
      style={{
        backgroundAttachment: `fixed`,
        backgroundRepeat: `no-repeat`,
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
  imageSrc: cloudinaryBgs[0]
};
