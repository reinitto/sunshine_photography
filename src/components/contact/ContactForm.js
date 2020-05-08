import React, { useRef } from "react";
import { useWindowWidth } from "../useWindowWidth";
import { contactFormBg } from "../../content/backgroundImages";
import LazyBackground from "../LazyBackground";
let placeholderColor = "#b4c7d4";
const ContactFormFront = ({ submitMessage }) => {
  return (
    <div className="facefront d-flex flex-column justify-content-center">
      <form onSubmit={submitMessage} id="contactFormForm" name="contactForm">
        <h2 className="text-center text-capitalize container">
          I'd Like To Hear From You!
        </h2>
        <div className="d-flex form-group w-75 mx-auto">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="name"
            placeholder="Your name"
            required
          />
        </div>
        <div className="d-flex form-group w-75 mx-auto">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="d-flex form-group w-75 mx-auto">
          <label htmlFor="message">Your Event:</label>
          <input
            className="form-control"
            id="message"
            placeholder="Your Event"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-base"
          style={{ display: "block", margin: "auto" }}
        >
          Send message
        </button>
      </form>
    </div>
  );
};

const ContactFormBack = () => {
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
      <LazyBackground
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
        }}
        src="https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_250/v1584563659/images/about/aboutme3other_qzw1fm.jpg"
        // placeholder="https://res.cloudinary.com/sunshinephoto/image/upload/w_1/v1584563659/images/about/aboutme3other_qzw1fm.jpg"
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
          Thank You for your trust!
        </h3>
        <p>I will get in touch with you within 48h</p>
      </div>
    </div>
  );
};

export default function ContactForm({ firebase }) {
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
    }, 6000);
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
      src={contactFormBg}
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
            <ContactFormFront submitMessage={submitMessage} />
            <ContactFormBack />
          </div>
        </div>
      </div>
    </LazyBackground>
  );
}
