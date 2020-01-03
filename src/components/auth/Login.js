import React, { useState } from "react";

export default function Login({ display, toggleLogin, requestLogin }) {
  let [message, setMessage] = useState();
  return (
    <div className="login-popup" style={{ display: display }}>
      <div className="popup_inner">
        <h1>Request Login Link</h1>
        <div>
          <form id="login-request-form">
            <input
              type="email"
              name="email"
              id="passwordless-email"
              placeholder="Email"
              required
            />
          </form>
          <div
            style={{
              backgroundColor: message && message.color ? message.color : null
            }}
          >
            <p>{message ? message.message : null}</p>
          </div>
        </div>
        <div>
          <button
            className="login-button"
            onClick={e => {
              const email = document.querySelector("#passwordless-email").value;
              requestLogin(e, email)
                .then(() => {
                  // Clear Form
                  document.querySelector("#login-request-form").reset();
                  setMessage({
                    message: "Check Your Email for Login Link!",
                    color: "green"
                  });
                  setInterval(() => {
                    setMessage(null);
                  }, 5000);
                })
                .catch(err => {
                  setMessage({ message: err.message, color: "red" });
                  setInterval(() => {
                    setMessage(null);
                  }, 5000);
                });
            }}
          >
            Request Login Link
          </button>
          <button
            className="login-button"
            onClick={() => {
              toggleLogin();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
