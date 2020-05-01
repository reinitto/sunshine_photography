import React, { lazy, Suspense, useEffect, useState } from "react";
import ContactForm from "../components/contact/ContactForm";
import Hero from "../components/Hero";
import Spinner from "../components/Spinner";
import LinksToGallery from "../components/LinksToGallery";
import HorizontalScroll from "../components/HorizontalScroll";
import { mainBg, contactFormBg } from "../content/backgroundImages";
import { createJournalItems } from "../components/createJournalItems";

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
      <LinksToGallery services={allServices} />
      <h2 className="text-center">Latest Travel Adventures</h2>
      <HorizontalScroll list={travelJournals} />
      <ContactForm backgroundImage={contactFormBg} />
    </div>
  );
};

export default Home;
