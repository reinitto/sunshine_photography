import React, { Fragment } from "react";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/contact/ContactForm";
import { contactFormBg } from "../content/backgroundImages";

export default function About() {
  return (
    <Fragment>
      <div
        style={{
          height: "45px",
        }}
      ></div>
      <AboutSection />
      <div className="container">
        <ContactForm backgroundImage={contactFormBg} />
      </div>
    </Fragment>
  );
}
