import React, { useState } from "react";
import firebase from "firebase/app";

export default function Signup({ display, showSignup }) {
  return (
    <div className="signup-popup" style={{ display: display }}>
      <div className="popup\_inner">
        <h1>Signup</h1>
        <div>
          <ul>
            <li>
              <input
                type="email"
                name="email"
                id="signup-email"
                placeholder="Email"
              />
            </li>
            <li>
              <input
                type="password"
                name="password"
                id="signup-password"
                placeholder="Password"
              />
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            let email = document.querySelector("#signup-email").value;
            let password = document.querySelector("#signup-password").value;
            const db = firebase.firestore();
            var UserRef = db.collection("users");
            UserRef.doc(email)
              .get()
              .then(function(doc) {
                if (doc.exists) {
                  // console.log("Document data:", doc.data());
                } else {
                  console.log("creating user with password");
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .catch(function(error) {
                      // Handle Errors here.
                      var errorCode = error.code;
                      var errorMessage = error.message;
                    });
                  console.log("Creating User in firestore ");
                  UserRef.doc(email)
                    .set({
                      //   name: displayName,
                      email
                      //   uid
                    })
                    .then(function() {
                      console.log("Document successfully created!");
                    })
                    .catch(function(error) {
                      console.error("Error writing document: ", error);
                    });
                }
              });
          }}
        >
          Signup
        </button>
        <button
          onClick={() => {
            showSignup();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
