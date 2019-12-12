import React from "react";
// import React, { useState, useCallback } from "react";
// import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
import ImageGalleryWithoutLighbox from "./ImageGalleryWithoutLighbox";

function ImageGallery({ photos, galleryName }) {
  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // const openLightbox = useCallback((event, { photo, index }) => {
  //   setCurrentImage(index);
  //   setViewerIsOpen(true);
  // }, []);

  // const closeLightbox = () => {
  //   setCurrentImage(0);
  //   setViewerIsOpen(false);
  // };

  return (
    <div>
      <h2 className="text-center">{galleryName.toUpperCase() || ""}</h2>
      <ImageGalleryWithoutLighbox images={photos} />
      {/* <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway
        style={{
          zIndex: "1100"
        }}
      >
        {viewerIsOpen ? (
          <Modal
            onClose={closeLightbox}
            style={{
              zIndex: "1100"
            }}
          >
            <Carousel
              style={{
                zIndex: "1100"
              }}
              currentIndex={currentImage}
              views={photos.map((x, i) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
                key: i
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway> */}
    </div>
  );
}
export default ImageGallery;
