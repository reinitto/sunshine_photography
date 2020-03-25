import React from "react";
import * as firebase from "firebase/app";
// import firebase from "../../Firebase";
// firebase.initializeApp(firebaseConfig);
//  Reference messages collection

export default function ContactForm({ backgroundImage = "", title = true }) {
  const saveMessage = props => {
    var messagesRef = firebase.database().ref("messages");
    const { name, email, message } = props;

    let newMessageRef = messagesRef.push();
    newMessageRef.set({
      name,
      email,
      message
    });
  };

  const submitMessage = e => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    // let phone = document.getElementById("phone").value;
    // let address = document.getElementById("address").value;
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
        I'm looking forward to hearing from you!
      </h2>

      <div
        className="fitted-image"
        style={{
          backgroundAttachment: `fixed`,
          backgroundRepeat: `no-repeat`,
          backgroundImage: `url(${backgroundImage})`,
          height: `100%`
        }}
      >
        <div className="container">
          <form onSubmit={submitMessage} id="contactForm" name="contactForm">
            <div className="form-group">
              {/* <label htmlFor="name">Name</label> */}
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Your name"
                required
              />
              {/* <small id="nameHelp" className="form-text text-muted">
              What should I call you?
            </small> */}
            </div>
            {/* <div className="form-group">
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
          </div> */}
            {/* <div className="form-group">
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
          </div> */}
            <div className="form-group">
              {/* <label htmlFor="email">Your e-mail</label> */}
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Your e-mail"
                required
              />
              {/* <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small> */}
            </div>
            <div className="form-group">
              {/* <label htmlFor="message">Message: </label> */}
              <textarea
                className="form-control"
                id="message"
                placeholder="Tell me a bit about what you're planning"
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
