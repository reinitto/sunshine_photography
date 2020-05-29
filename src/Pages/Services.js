import React, { Fragment, Suspense, useState, useEffect } from "react";
import IntroImage from "../components/IntroImage";
import MetaTags from "react-meta-tags";
import Spinner from "../components/Spinner";
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
  return service && images ? (
    <Fragment>
      <MetaTags id={serviceId}>
        <title>{service.name}</title>
        <meta name="description" content={service.paragraphText} />
      </MetaTags>
      <Suspense fallback={<div style={{ height: "35vh" }}> </div>}>
        <IntroImage
          subtitle={(service && service.name) || null}
          height="35vh"
        />
      </Suspense>
      <div style={{ width: "90%", margin: "auto" }}>
        <ServicePricing {...service} images={images} />
      </div>
    </Fragment>
  ) : (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <Spinner />
    </div>
  );
}
