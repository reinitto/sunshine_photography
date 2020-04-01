import React, { Fragment, Suspense } from "react";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/contact/ContactForm";
import IntroImage from "../components/IntroImage";
import { contactFormBg } from "../content/backgroundImages";

export default function About() {
  return (
    <Fragment>
      <Suspense fallback={<div style={{ height: "50vh" }}></div>}>
        <IntroImage text={["About Me"]} />
      </Suspense>
      <AboutSection />
      <div className="container">
        <ContactForm backgroundImage={contactFormBg} />
      </div>
    </Fragment>
  );
}
