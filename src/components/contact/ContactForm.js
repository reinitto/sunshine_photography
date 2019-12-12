import React, { Fragment } from "react";
import * as firebase from "firebase/app";
import "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDU7pnAHmVuuf2nKxa5HpBBI4GaCobCQRw",
  authDomain: "momblog-15d1c.firebaseapp.com",
  databaseURL: "https://momblog-15d1c.firebaseio.com",
  projectId: "momblog-15d1c",
  storageBucket: "momblog-15d1c.appspot.com",
  messagingSenderId: "754776938435",
  appId: "1:754776938435:web:43cadca033fb5094ec0f76"
};

firebase.initializeApp(firebaseConfig);
//  Reference messages collection
var messagesRef = firebase.database().ref("messages");

const saveMessage = props => {
  const { name, email, phone, address, message } = props;

  let newMessageRef = messagesRef.push();
  newMessageRef.set({
    name,
    email,
    phone,
    address,
    message
  });
};

const submitMessage = e => {
  e.preventDefault();
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let address = document.getElementById("address").value;
  let message = document.getElementById("message").value;
  let contactForm = document.getElementById("contactForm");

  saveMessage({ name, email, phone, address, message });
  //  Reset form
  contactForm.reset();

  let alert = document.getElementById("alert");
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
  }, 3000);
};
export default function ContactForm() {
  return (
    <Fragment>
      <h2 className="text-center">Contact Me</h2>
      <form onSubmit={submitMessage} id="contactForm">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter your name"
            required
          />
          <small id="nameHelp" className="form-text text-muted">
            What should I call you?
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            aria-describedby="phoneHelp"
            placeholder="Enter phone number"
            required
          />
          <small id="phoneHelp" className="form-text text-muted">
            We'll never share your phone number with anyone
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            aria-describedby="addressHelp"
            placeholder="Enter your address"
          />
          <small id="addressHelp" className="form-text text-muted">
            We'll never share your address with anyone
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message: </label>
          <textarea
            className="form-control"
            id="message"
            placeholder="Your Message..."
            rows="10"
            cols="70"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ display: "block", margin: "auto" }}
        >
          Submit
        </button>
      </form>
      <div id="alert" style={{ display: "none" }} className="alert-success">
        Message Sent
      </div>
    </Fragment>
  );
}
