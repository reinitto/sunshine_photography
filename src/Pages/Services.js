import React, { Fragment, Suspense, useState, useEffect } from "react";
import { serviceIntroBg } from "../content/backgroundImages";
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
          imageSrc={`https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/${
            images && images[0].image
          }`}
          subtitle={(service && service.name) || null}
        />
      </Suspense>
      <div style={{ width: "90%", margin: "auto" }}>
        <ImageGalleryWithoutLighbox images={images && images.slice(1)} />

        <ServicePricing {...service} />
      </div>
    </Fragment>
  );
}
