import React, { Fragment, Suspense } from "react";
import Gallery from "../components/portfolio/Gallery";
import IntroImage from "../components/IntroImage";
import ServicePricing from "../components/pricing/ServicePricing";

export default function ServicesPage() {
  return (
    <Fragment>
      <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
        <IntroImage text={["Services"]} />
      </Suspense>
      <div style={{ width: "90%", margin: "auto" }}>
        <Gallery
          collection={window.location.pathname.split("/").slice(-1)[0]}
        />
        <ServicePricing />
      </div>
    </Fragment>
  );
}
