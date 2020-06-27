import React, { Suspense, useEffect, useState, lazy } from "react";
import { createJournalItems } from "../components/createJournalItems";
import MetaTags from "react-meta-tags";
import { mainBg } from "../content/backgroundImages";
import Hero from "../components/Hero";
import Spinner from "../components/Spinner";
import ContactForm from "../components/contact/ContactForm";
const CloudinaryContext = lazy(() =>
  import("cloudinary-react").then((module) => {
    return { default: module.CloudinaryContext };
  })
);
const LinksToGallery = lazy(() => import("../components/LinksToGallery"));
const HorizontalScroll = lazy(() => import("../components/HorizontalScroll"));
const Home = ({ journals, services, firebase, language, translations }) => {
  let [travelJournals, setTravelJournals] = useState();
  let [allServices, setServices] = useState();
  let [pageTranslations, setPageTranslations] = useState();
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
  useEffect(() => {
    if (translations["home"]) {
      setPageTranslations(translations["home"]);
    }
  }, [translations]);
  return (
    <div id="home">
      <MetaTags id="homeMeta">
        <title>Home Page</title>
        <meta name="description" content="Welcome to Sunshine Pictures" />
      </MetaTags>
      <Hero
        title={
          pageTranslations
            ? pageTranslations["heroTitle"][language] ||
              pageTranslations["heroTitle"]["us"]
            : "More than just capturing moments"
        }
        subtitle={
          pageTranslations
            ? pageTranslations["heroSubtitle"][language] ||
              pageTranslations["heroSubtitle"]["us"]
            : "photography"
        }
        background={mainBg}
        keywords={
          pageTranslations
            ? Object.keys(pageTranslations["heroKeywords"]).map((key) => {
                return (
                  pageTranslations["heroKeywords"][key][language] ||
                  pageTranslations["heroKeywords"][key]["us"]
                );
              })
            : ["lifestyle", "nature", "travel"]
        }
      />
      <Suspense fallback={<Spinner />}>
        <CloudinaryContext cloudName="sunshinephoto">
          <LinksToGallery
            services={allServices}
            language={language}
            title={
              pageTranslations
                ? pageTranslations["menuSectionTitle"][language] ||
                  pageTranslations["menuSectionTitle"]["us"] ||
                  "Every Picture Has A Story To Tell"
                : "Every Picture Has A Story To Tell"
            }
            subtitle={
              pageTranslations
                ? pageTranslations["menuSectionSubtitle"][language] ||
                  pageTranslations["menuSectionSubtitle"]["us"] ||
                  "Let's Start Yours"
                : "Let's Start Yours"
            }
          />
          <h2 className="text-center">
            {pageTranslations
              ? pageTranslations["travelJournalTitle"][language] ||
                pageTranslations["travelJournalTitle"]["us"] ||
                "Latest Travel Adventures"
              : "Latest Travel Adventures"}
          </h2>
          <HorizontalScroll list={travelJournals} language={language} />
        </CloudinaryContext>
        <ContactForm
          firebase={firebase}
          language={language}
          translations={translations["contact"]}
        />
      </Suspense>
    </div>
  );
};

export default Home;
