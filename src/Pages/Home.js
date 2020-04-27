import React, { lazy, Suspense, useEffect, useState } from "react";
import ContactForm from "../components/contact/ContactForm";
import Hero from "../components/Hero";
// import Pricing from "../components/pricing/PricingList";
// import { digitalPhotos } from "../content/pricing";
import { mainBg, contactFormBg } from "../content/backgroundImages";
import LinksToGallery from "../components/LinksToGallery";
// import { HorizontalScroll } from "../components/HorizontalScroll";
import { createJournalItems } from "../components/createJournalItems";
const HorizontalScroll = lazy(() => import("../components/HorizontalScroll"));

// let isAnyPartOfElementInViewport = el => {
//   const rect = el.getBoundingClientRect();
//   const windowHeight =
//     window.innerHeight || document.documentElement.clientHeight;
//   const windowWidth = window.innerWidth || document.documentElement.clientWidth;

//   // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
//   const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
//   const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

//   return vertInView && horInView;
// };

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
      <Suspense fallback={"Still loading..."}>
        <h2 className="text-center">Latest Travel Adventures</h2>
        <HorizontalScroll list={travelJournals} />
      </Suspense>
      <ContactForm backgroundImage={contactFormBg} />
    </div>
  );
};

export default Home;
