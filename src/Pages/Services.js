import React, { Fragment, Suspense, useState, useEffect } from "react";
import IntroImage from "../components/IntroImage";
import MetaTags from "react-meta-tags";
import Spinner from "../components/Spinner";
import ServicePricing from "../components/pricing/ServicePricing";

export default function Service({ services, language }) {
  let [service, setService] = useState(null);
  let [images, setImages] = useState(null);
  let serviceId = window.location.pathname.split("/services/")[1];

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
        <title>{service.name[language]}</title>
        <meta name="description" content={service.paragraphText[language]} />
      </MetaTags>
      <Suspense fallback={<div style={{ height: "35vh" }}> </div>}>
        <IntroImage
          subtitle={(service && service.name[language]||service.name['eng']||service.name['us']) || null}
          height="35vh"
        />
      </Suspense>
      <div className="container">
        <ServicePricing {...service} images={images} language={language} />
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
