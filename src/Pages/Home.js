import React, { Suspense, useEffect, useState, lazy } from "react";
import { createJournalItems } from "../components/createJournalItems";
import { mainBg, contactFormBg } from "../content/backgroundImages";
// import { CloudinaryContext } from "cloudinary-react";
const CloudinaryContext = lazy(() =>
  import("cloudinary-react").then((module) => {
    return { default: module.CloudinaryContext };
  })
);
const ContactForm = lazy(() => import("../components/contact/ContactForm"));
const Hero = lazy(() => import("../components/Hero"));
const LinksToGallery = lazy(() => import("../components/LinksToGallery"));
const HorizontalScroll = lazy(() => import("../components/HorizontalScroll"));

const Home = ({ journals, services }) => {
  let [travelJournals, setTravelJournals] = useState();
  let [allServices, setServices] = useState();
  useEffect(() => {
    if (journals) {
      setTravelJournals(createJournalItems(journals));
    }
  }, [journals]);
  useEffect(() => {
    if (services) {
      setServices(services);
    }
  }, [services]);
  return (
    <div id="home">
      <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
        <Hero
          imageSrc={mainBg}
          title={"More than just capturing moments"}
          subtitle={"photography"}
          keywords={["lifestyle", "nature", "travel"]}
        />
      </Suspense>
      <Suspense fallback={<div style={{ height: "100vh" }}></div>}>
        <CloudinaryContext cloudName="sunshinephoto">
          <LinksToGallery services={allServices} />
          <h2 className="text-center">Latest Travel Adventures</h2>
          <HorizontalScroll list={travelJournals} />
        </CloudinaryContext>
      </Suspense>
      <ContactForm backgroundImage={contactFormBg} />
    </div>
  );
};

export default Home;
