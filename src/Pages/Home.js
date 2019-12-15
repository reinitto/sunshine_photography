import React, { Component, lazy, Suspense } from "react";
import ContactForm from "../components/contact/ContactForm";
import Pricing from "../components/pricing/PricingList";
import Navbar from "../components/layout/Navbar";
const IntroImage = lazy(() => import("../components/IntroImage"));
// const IntroCarousel = lazy(() => import("../components/IntroCarousel"));
const LinksToGallery = lazy(() => import("../components/LinksToGallery"));
const LinksToJournal = lazy(() => import("../components/LinksToJournal"));
const AboutSection = lazy(() => import("../components/AboutSection"));
let digitalPhotos = [
  {
    name: "5",
    price: "1500 NOK"
  },
  {
    name: "10",
    price: "2500 NOK"
  },
  {
    name: "20",
    price: "4000 NOK"
  },
  {
    name: "30",
    price: "5000 NOK"
  }
];

export default class Home extends Component {
  isAnyPartOfElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
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
      //Links to gallery
      let linksToGallery = document.querySelectorAll(".link-to-gallery");
      linksToGallery.forEach(link => {
        if (this.isAnyPartOfElementInViewport(link)) {
          if ([...link.classList].includes("come-in")) {
          } else {
            link.classList.add("come-in");
          }
        } else {
          link.classList.remove("come-in");
        }
      });
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
        <Navbar />
        <Suspense fallback={"."}>
          <IntroImage />
        </Suspense>
        <Suspense fallback={"loading..."}>
          <LinksToGallery />
          <AboutSection />
        </Suspense>
        <div className="container">
          <h2 className="text-center">Pricing</h2>
          <Pricing />
          <Pricing title="Digital Photos" items={digitalPhotos} />
        </div>
        <Suspense fallback={"Still loading..."}>
          <h2 className="text-center">Latest Travel Adventures</h2>
          <LinksToJournal />
        </Suspense>
        <div className="container">
          <ContactForm />
        </div>
      </div>
    );
  }
}
