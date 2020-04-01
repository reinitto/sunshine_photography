import React from "react";
import * as firebase from "firebase/app";
import { contactFormBg } from "../../content/backgroundImages";
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

    let alert = document.getElementById("alert");
    alert.style.display = "block";
    setTimeout(() => {
      alert.style.display = "none";
    }, 3000);
  };
  return (
    <div className="d-flex flex-column">
      <h2 className="text-center text-capitalize container">
        I'd Like To Hear From You!
      </h2>
      <div
        className="fitted-image"
        style={{
          backgroundAttachment: `fixed`,
          backgroundRepeat: `no-repeat`,
          backgroundImage: `url(${contactFormBg})`,
          height: `100%`
        }}
      >
        <div className="container">
          <form onSubmit={submitMessage} id="contactForm" name="contactForm">
            <div className="form-group">
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
                rows="10"
                cols="70"
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
          <div id="alert" style={{ display: "none" }} className="alert-success">
            Message Sent!
          </div>
        </div>
      </div>
    </div>
  );
}
