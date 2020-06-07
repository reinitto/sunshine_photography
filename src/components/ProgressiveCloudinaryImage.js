import React, { useRef, useEffect, useState } from "react";
import { Image, Transformation } from "cloudinary-react";
export const ProgressiveCloudinaryImage = ({ publicId, altText }) => {
  let imageRef = useRef();
  let [imagePublicId, setImagePublicId] = useState();
  useEffect(() => {
    let observer;
    let theElement;
    let didCancel = false;
    if (imageRef.current.element && imagePublicId !== publicId) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImagePublicId(publicId);
                observer.unobserve(imageRef.current.element);
              }
            });
          },
          {
            threshold: 0.25,
          }
        );
        theElement = imageRef.current.element;
        observer.observe(imageRef.current.element);
      } else {
        // Old browsers fallback
        setImagePublicId(publicId);
      }
    }
    return () => {
      didCancel = true;
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(theElement);
      }
    };
  }, [publicId, imagePublicId]);
  return (
    <Image
      alt={altText}
      ref={imageRef}
      dpr="auto"
      responsive
      width="auto"
      crop="scale"
      responsiveUseBreakpoints="true"
      publicId={publicId || ""}
      secure="true"
      style={{
        width: "100%",
        objectFit: "cover",
        height: "100%",
        // ...style,
      }}
    >
      <Transformation flags="progressive:steep" fetchFormat="jpg" />
    </Image>
  );
};
