import React, { useRef, useState, useEffect } from "react";
import { useWindowWidth } from "../useWindowWidth";
import { contactFormBg } from "../../content/backgroundImages";
import aboutMeImg from "../../content/aboutImages";
import LazyBackground from "../LazyBackground";
let placeholderColor = "#b4c7d4";
const ContactFormFront = ({ submitMessage, translations, language }) => {
  return (
    <div className="facefront d-flex flex-column justify-content-center">
      <form onSubmit={submitMessage} id="contactFormForm" name="contactForm">
        <h2 className="text-center text-capitalize container">
          {translations
            ? translations.contactTitle[language] ||
              `I'd Like To Hear From You!`
            : `I'd Like To Hear From You!`}
        </h2>
        <div className="d-flex form-group w-75 mx-auto">
          <label htmlFor="name">
            {translations
              ? translations.fieldLabels.name[language] || "Your Name"
              : "Your Name"}
            :
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder={
              translations
                ? translations.fieldLabels.name[language] || "Your Name"
                : "Your Name"
            }
            required
          />
        </div>
        <div className="d-flex form-group w-75 mx-auto">
          <label htmlFor="email">
            {translations
              ? translations.fieldLabels.email[language] || "Your Email"
              : "Your Email"}
            :
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            placeholder={
              translations
                ? translations.fieldLabels.email[language] || "Your Email"
                : "Your Email"
            }
            required
          />
        </div>
        <div className="d-flex form-group w-75 mx-auto">
          <label htmlFor="message">
            {translations
              ? translations.fieldLabels.message[language] || "Your Event"
              : "Your Event"}
            :
          </label>
          <input
            className="form-control"
            id="message"
            placeholder={
              translations
                ? translations.fieldLabels.message[language] || "Your Event"
                : "Your Event"
            }
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-base"
          style={{ display: "block", margin: "auto" }}
        >
          {translations
            ? translations.sendButtonText[language] || "Send message"
            : "Send message"}
        </button>
      </form>
    </div>
  );
};

const ContactFormBack = ({ translations, language }) => {
  return (
    <div className="faceback d-flex flex-column justify-content-center">
      <div
        className="bgLight"
        style={{
          height: "300px",
          zIndex: "-2",
          margin: "auto",
          width: "70%",
          opacity: "0.7",
        }}
      ></div>
      <div
        className="cover-image"
        style={{
          position: "absolute",
          left: "75%",
          top: "50%",
          transform: " translate(-50%,-50%)",
          width: "60%",
          maxWidth: "450px",
          margin: "auto",
          zIndex: "-1",
          backgroundRepeat: " no-repeat",
          backgroundColor: "#b4c7d4",
          backgroundImage: `url(${aboutMeImg[0]})`,
        }}
        src={aboutMeImg[0]}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: " translate(-50%,-50%)",
          color: "white",
          mixBlendMode: "difference",
        }}
      >
        <h3
          className="text-center"
          style={{
            color: "white",
          }}
        >
          {translations
            ? translations.confirmMessage[language] ||
              `Thank You for your trust! I will get in touch with you within 48h`
            : `Thank You for your trust! I will get in touch with you within 48h`}
        </h3>
        {/* <p>I will get in touch with you within 48h</p> */}
      </div>
    </div>
  );
};

export default function ContactForm({ firebase, language, translations }) {
  let [allTranslations, setAllTranslations] = useState();
  useEffect(() => {
    if (translations) {
      setAllTranslations(translations);
    }
  }, [translations]);

  let contactFormRef = useRef(null);
  let height = "80vh";
  let windowWidth = useWindowWidth();
  const saveMessage = (props) => {
    firebase("database").then(({ database }) => {
      var messagesRef = database.ref("messages");
      const { name, email, message } = props;
      const timestamp = Date.now();
      let newMessageRef = messagesRef.push();
      newMessageRef.set({
        name,
        email,
        message,
        timestamp,
      });
    });
  };

  const submitMessage = (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let contactForm = document.getElementById("contactFormForm");

    saveMessage({ name, email, message });
    //  Reset form
    contactForm.reset();

    let contact = document.querySelector("#contact-form .slice");
    contact.style.animationPlayState = "running";
    setTimeout(() => {
      contact.style.animationPlayState = "paused";
    }, 12000);
  };
  if (
    contactFormRef &&
    contactFormRef.current &&
    contactFormRef.current.clientHeight > 0.8 * window.innerHeight
  ) {
    height = contactFormRef.current.clientHeight;
  }
  return (
    <LazyBackground
      src={contactFormBg.default}
      className="d-flex flex-column contact-form-container cover-image justify-content-center align-items-center"
      id="contactForm"
      style={
        windowWidth > 768
          ? {
              backgroundAttachment: `fixed`,
              backgroundRepeat: `no-repeat`,
              height: height,
              width: "100%",
              backgroundColor: placeholderColor,
            }
          : {
              height: height,
              width: "100%",
              backgroundColor: placeholderColor,
            }
      }
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        id="contact-form"
        ref={contactFormRef}
        style={{
          position: "absolute",
        }}
      >
        <div className="viewContainer">
          <div className="slice">
            <ContactFormFront
              language={language}
              submitMessage={submitMessage}
              translations={allTranslations}
            />
            <ContactFormBack
              language={language}
              translations={allTranslations}
            />
          </div>
        </div>
      </div>
    </LazyBackground>
  );
}
