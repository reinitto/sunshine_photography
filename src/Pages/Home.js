import React, { Suspense, useEffect, useState, lazy } from "react";
import { createJournalItems } from "../components/createJournalItems";
import Hero from "../components/Hero";
import Spinner from "../components/Spinner";
const CloudinaryContext = lazy(() =>
  import("cloudinary-react").then((module) => {
    return { default: module.CloudinaryContext };
  })
);
const LinksToGallery = lazy(() => import("../components/LinksToGallery"));
const HorizontalScroll = lazy(() => import("../components/HorizontalScroll"));
const ContactForm = lazy(() => import("../components/contact/ContactForm"));

const Home = ({ journals, services, firebase }) => {
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
      <Hero
        title={"More than just capturing moments"}
        subtitle={"photography"}
        keywords={["lifestyle", "nature", "travel"]}
      />
      <Suspense fallback={<Spinner />}>
        <CloudinaryContext cloudName="sunshinephoto">
          <LinksToGallery services={allServices} />
          <h2 className="text-center">Latest Travel Adventures</h2>
          <HorizontalScroll list={travelJournals} />
        </CloudinaryContext>
        <ContactForm firebase={firebase} />
      </Suspense>
    </div>
  );
};

export default Home;
