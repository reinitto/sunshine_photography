import React, { Fragment, Suspense } from "react";
import IntroImage from "../components/IntroImage";
import firebase from "firebase/app";

export default function Admin() {
  const Submit = e => {
    e.preventDefault();
    let functions = firebase.functions();
    // var uploadImages = functions.httpsCallable("uploadImages");
    // let text = document.querySelector("#test-text").value;
    // uploadImages({ text })
    //   .then(function(result) {
    //     // Read result of the Cloud Function.
    //     console.log("cloud func return: ", result);
    //   })
    //   .catch(err => console.log("cloud error", err));
  };

  return (
    <Fragment>
      <Suspense fallback={<div style={{ height: "50vh" }}></div>}>
        <IntroImage text={["Admin"]} height="35vh" />
      </Suspense>
      <div className="container">
        <form onSubmit={Submit}>
          <input
            type="text"
            name="text"
            id="test-text"
            placeholder="test-text"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Fragment>
  );
}
