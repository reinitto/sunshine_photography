import React, { Fragment, Suspense, useState, useEffect } from "react";
import ImageGalleryWithoutLighbox from "../components/portfolio/ImageGalleryWithoutLighbox";
import IntroImage from "../components/IntroImage";
import ServicePricing from "../components/pricing/ServicePricing";

export default function Service({ services }) {
  let [service, setService] = useState(null);
  let [images, setImages] = useState(null);
  let serviceId = window.location.pathname.replace(`/services/`, "");
  useEffect(() => {
    if (services) {
      setService(services[serviceId]);
      if (services[serviceId]) {
        let imageArray = [];
        Object.keys(services[serviceId].imageGallery).forEach((key) => {
          imageArray.push({
            ...services[serviceId].imageGallery[key],
            src: services[serviceId].imageGallery[key].image,
          });
        });
        setImages(imageArray);
      }
    }
  }, [serviceId, services]);
  console.log(service);
  return (
    <Fragment>
      <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
        <IntroImage
          subtitle={(service && service.name) || null}
          height="35vh"
        />
      </Suspense>
      <div style={{ width: "90%", margin: "auto" }}>
        <ImageGalleryWithoutLighbox images={images} />
        <ServicePricing {...service} />
      </div>
    </Fragment>
  );
}
