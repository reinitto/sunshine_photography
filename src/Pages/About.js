import React, { Fragment } from "react";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/contact/ContactForm";
import { contactFormBg } from "../content/backgroundImages";
import MetaTags from "react-meta-tags";

export default function About() {
  return (
    <Fragment>
      <MetaTags id="aboutID">
        <title>About the photographer</title>
        <meta
          name="description"
          content="I like travel and lifestyle photography. It’s basically the perfect combination of both of my passions."
        />
      </MetaTags>
      <AboutSection />
      <div className="container">
        <ContactForm backgroundImage={contactFormBg} />
      </div>
    </Fragment>
  );
}
