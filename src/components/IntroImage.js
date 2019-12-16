import React from "react";

let cloudinaryBgs = [
  "https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8944_xj7nmv.jpg"
];

export default function IntroImage({ imageSrc, text, height = "65vh" }) {
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
      <div className="carousel-text ">
        {text.map((word, i) => (
          <p>
            <span className="text-capitalize" key={i}>
              {word}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}
IntroImage.defaultProps = {
  imageSrc: cloudinaryBgs[0]
};
