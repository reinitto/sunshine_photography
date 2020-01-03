import React from "react";
import ImageGalleryWithoutLighbox from "./ImageGalleryWithoutLighbox";

function ImageGallery({ photos, galleryName }) {
  return (
    <div>
      <h2 className="text-center">{galleryName.toUpperCase() || ""}</h2>
      <ImageGalleryWithoutLighbox images={photos} />
    </div>
  );
}
export default ImageGallery;
