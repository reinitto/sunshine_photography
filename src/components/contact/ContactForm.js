import React from "react";
import * as firebase from "firebase/app";
import { contactFormBg } from "../../content/backgroundImages";

const ContactFormFront = ({ submitMessage }) => {
  return (
    <div className="facefront d-flex flex-column justify-content-center">
      <form onSubmit={submitMessage} id="contactForm" name="contactForm">
        <div className="form-group">
          <h2 className="text-center text-capitalize container">
            I'd Like To Hear From You!
          </h2>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-group">
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
          width: "70%"
        }}
      ></div>
      <div
        className="cover-image"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_200/v1584563659/images/about/aboutme3other_qzw1fm.jpg)",
          position: "absolute",
          left: "75%",
          top: "50%",
          transform: " translate(-50%,-50%)",
          width: "60%",
          maxWidth: "450px",
          margin: "auto",
          zIndex: "-1",
          backgroundRepeat: " no-repeat"
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: " translate(-50%,-50%)"
        }}
      >
        <h3 className="text-center">Thank You for your trust!</h3>
        <p>I will get in touch with you within 48h</p>
      </div>
    </div>
  );
};

export default function ContactForm() {
  const saveMessage = props => {
    var messagesRef = firebase.database().ref("messages");
    const { name, email, message } = props;
    const timestamp = Date.now();
    let newMessageRef = messagesRef.push();
    newMessageRef.set({
      name,
      email,
      message,
      timestamp
    });
  };

  const submitMessage = e => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let contactForm = document.getElementById("contactForm");

    saveMessage({ name, email, message });
    //  Reset form
    contactForm.reset();

    let contact = document.querySelector("#contact-form .slice");
    contact.style.animationPlayState = "running";
    setTimeout(() => {
      contact.style.animationPlayState = "paused";
    }, 6000);
  };
  return (
    <div
      className="d-flex flex-column contact-form-container cover-image justify-content-center align-items-center"
      style={{
        backgroundAttachment: `fixed`,
        backgroundRepeat: `no-repeat`,
        backgroundImage: `url(${contactFormBg})`,
        height: `80vh`
      }}
    >
      <div className="d-flex flex-column" id="contact-form">
        <div className="viewContainer">
          <div className="slice">
            <ContactFormFront submitMessage={submitMessage} />
            <ContactFormBack />
          </div>
        </div>
      </div>
    </div>
  );
}
