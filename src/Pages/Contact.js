import React, { Fragment } from "react";
import ContactForm from "../components/contact/ContactForm";
import Navbar from "../components/layout/Navbar";

export default function Contact() {
  return (
    <Fragment>
      <Navbar />
      <div
        style={{
          height: "70px"
        }}
      ></div>
      <div className="container">
        <ContactForm />
      </div>
    </Fragment>
  );
}
