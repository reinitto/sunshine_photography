import React, { Fragment } from "react";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/contact/ContactForm";
import { contactFormBg } from "../content/backgroundImages";
import MetaTags from "react-meta-tags";

export default function About({ translations, language }) {
  console.log("about translations", translations);

  return (
    <Fragment>
      <MetaTags id="aboutID">
        <title>About the photographer</title>
        <meta
          name="description"
          content="I like travel and lifestyle photography. It’s basically the perfect combination of both of my passions."
        />
      </MetaTags>
      <AboutSection translations={translations["about"]} language={language} />
      <div className="container">
        <ContactForm
          backgroundImage={contactFormBg}
          translations={translations["contact"]}
          language={language}
        />
      </div>
    </Fragment>
  );
}
