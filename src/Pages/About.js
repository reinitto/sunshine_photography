import React, { Fragment, Suspense } from "react";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/contact/ContactForm";
import Navbar from "../components/layout/Navbar";
import IntroImage from "../components/IntroImage";

export default function About() {
  return (
    <Fragment>
      <Navbar />
      {/* <div
        style={{
          height: "70px"
        }}
      ></div> */}
      <Suspense fallback={<div style={{ height: "50vh" }}></div>}>
        <IntroImage
          imageSrc="https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8997_1500_ymk08l.jpg"
          text={["About Me"]}
          height="35vh"
        />
      </Suspense>
      <AboutSection title={false} />
      <div className="container">
        <ContactForm />
      </div>
    </Fragment>
  );
}
