import React from "react";

let firebaseStorageImgs = [
  "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/background_images%2FIMG_8951%201500.jpg?alt=media&token=a50f46b2-93e5-416e-aa28-de3aea7fce8b",
  "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/background_images%2FIMG_8997%201500.jpg?alt=media&token=5a01d548-ef23-417c-a359-301d38dfdd97",
  "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/background_images%2FIMG_8944.jpg?alt=media&token=2a5fc608-efa9-4664-ae03-2aa548346697"
];

export default function IntroImage({ imageSrc }) {
  return (
    <div
      className="fitted-image"
      style={{
        backgroundAttachment: `fixed`,
        backgroundRepeat: `no-repeat`,
        backgroundImage: `url(${imageSrc})`
      }}
    >
      <div className="carousel-text">
        {/*  Text set in CSS */}
        {/* <h2>Carousel Title</h2> */}
      </div>
    </div>
  );
}
IntroImage.defaultProps = {
  imageSrc: firebaseStorageImgs[0]
};
