import React from "react";
import firebase from "firebase/app";

export default function Login({ display, toggleLogin, setUser }) {
  return (
    <div className="login-popup" style={{ display: display }}>
      <div className="popup\_inner">
        <h1>Login</h1>
        <div>
          <ul>
            <li>
              <input
                type="email"
                name="email"
                id="login-email"
                placeholder="Email"
              />
            </li>
            <li>
              <input
                type="password"
                name="password"
                id="login-password"
                placeholder="Password"
              />
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            let email = document.querySelector("#login-email").value;
            let password = document.querySelector("#login-password").value;
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(res => {
                let user = res.user;
                let { email, uid } = user;
                console.log(email, uid);
                toggleLogin();
                setUser({ email, uid });
              })
              .catch(function(error) {
                console.log(error);
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
              });
          }}
        >
          Login
        </button>
        <button
          onClick={() => {
            toggleLogin();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
