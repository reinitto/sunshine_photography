import React, { Component, lazy, Suspense } from "react";
import ContactForm from "../components/contact/ContactForm";
import Pricing from "../components/pricing/PricingList";
import { digitalPhotos } from "../content/pricing";
import { mainBg, contactFormBg } from "../content/backgroundImages";
import { aboutImages } from "../content/aboutImages";
import LinksToGallery from "../components/LinksToGallery";
import LinksToJournal from "../components/LinksToJournal";
import AboutSection from "../components/AboutSection";
const IntroImage = lazy(() => import("../components/IntroImage"));

export default class Home extends Component {
  isAnyPartOfElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
    const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
    const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

    return vertInView && horInView;
  }

  componentDidMount() {
    window.addEventListener("scroll", () => {
      //Pricing
      let pricingList = document.querySelectorAll(".pricingList");
      pricingList.forEach(link => {
        if (this.isAnyPartOfElementInViewport(link)) {
          if ([...link.classList].includes("come-in")) {
          } else {
            link.classList.add("come-in");
          }
        } else {
          link.classList.remove("come-in");
        }
      });
    });
  }
  render() {
    return (
      <div id="home">
        <Suspense fallback={<div style={{ height: "50vh" }}></div>}>
          <IntroImage
            imageSrc={mainBg}
            title={"Sunshine pictures"}
            subtitle="Photography"
            text3={["lifestyle", "nature", "travel"]}
            height="100vh"
          />
        </Suspense>
        <LinksToGallery />
        <AboutSection images={aboutImages} />
        <div className="container">
          <h2 className="text-center">Pricing</h2>
          <Pricing />
          <Pricing title="Digital Photos" items={digitalPhotos} />
        </div>
        <Suspense fallback={"Still loading..."}>
          <h2 className="text-center">Latest Travel Adventures</h2>
          <LinksToJournal />
        </Suspense>
        <ContactForm backgroundImage={contactFormBg} />
      </div>
    );
  }
}
