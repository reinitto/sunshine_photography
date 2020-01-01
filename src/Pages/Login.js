import React, { Fragment, Suspense } from "react";
import IntroImage from "../components/IntroImage";
import firebase from "firebase/app";

export default function Login() {
  const requestLogin = e => {
    e.preventDefault();
    const email = document.querySelector("#passwordless-email").value;
    var actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      //   WORKS
      //

      //   url: "https://momblog-15d1c.firebaseapp.com",
      url: "https://localhost:3000",
      // This must be true.
      handleCodeInApp: true
      //   iOS: {
      //     bundleId: "localhost:3000"
      //   },
      //   android: {
      //     packageName: "localhost:3000",
      //     installApp: true,
      //     minimumVersion: "12"
      //   },
      //   dynamicLinkDomain: "https://sunshineemail.page.link"
    };
    firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(function() {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
      })
      .catch(function(error) {
        // Some error occurred, you can inspect the code: error.code
        console.log("login error", error);
      });
  };

  //   if (firebase) {
  //     if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  //       // Additional state parameters can also be passed via URL.
  //       // This can be used to continue the user's intended action before triggering
  //       // the sign-in operation.
  //       // Get the email if available. This should be available if the user completes
  //       // the flow on the same device where they started it.
  //       var email = window.localStorage.getItem("emailForSignIn");
  //       if (!email) {
  //         // User opened the link on a different device. To prevent session fixation
  //         // attacks, ask the user to provide the associated email again. For example:
  //         email = window.prompt("Please provide your email for confirmation");
  //       }
  //       // The client SDK will parse the code from the link for you.
  //       firebase
  //         .auth()
  //         .signInWithEmailLink(email, window.location.href)
  //         .then(function(result) {
  //           // Clear email from storage.
  //           window.localStorage.removeItem("emailForSignIn");
  //           // You can access the new user via result.user
  //           // Additional user info profile not available via:
  //           // result.additionalUserInfo.profile == null
  //           // You can check if the user is new or existing:
  //           // result.additionalUserInfo.isNewUser
  //         })
  //         .catch(function(error) {
  //           // Some error occurred, you can inspect the code: error.code
  //           // Common errors could be invalid email and invalid or expired OTPs.
  //         });
  //     }
  //   }
  return (
    <Fragment>
      <Suspense fallback={<div style={{ height: "50vh" }}></div>}>
        <IntroImage
          //   imageSrc="https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8997_1500_ymk08l.jpg"
          text={["Login"]}
          height="35vh"
        />
      </Suspense>
      <div className="container">
        <form onSubmit={requestLogin}>
          <input
            type="email"
            name="email"
            id="passwordless-email"
            placeholder="Your Email"
          />
          <button type="submit">Request Login</button>
        </form>
      </div>
    </Fragment>
  );
}
