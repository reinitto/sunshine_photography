import React, { Fragment, Suspense } from "react";
import IntroImage from "../components/IntroImage";
import firebase from "firebase/app";

export default function Admin() {
  const Submit = async () => {
    let functions = firebase.functions();
    var uploadImages = functions.httpsCallable("uploadImages");
    var uploadimages = functions.httpsCallable("uploadimages");
    console.log("uploadImages", uploadImages);
    console.log("uploadimages", uploadimages);
    try {
      let email = document.querySelector("#test-text").value;
      uploadImages(JSON.stringify({ email }))
        .then(res => {
          return res.json();
        })
        .then(res => console.log(res))
        .catch(err => {
          console.log(err);
        });

      // const response = await fetch(
      //   "https://momblog-15d1c.firebaseapp.com/uploadimages",
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json"
      //     },
      //     method: "post",
      //     body: JSON.stringify({ data: { email } })
      //   }
      // );
      // let data = await response.text();
      // console.log("data", data);
    } catch (err) {
      console.log("error");
      console.log(err);
    }
    try {
      let email = document.querySelector("#test-text").value;
      uploadimages({ email })
        .then(res => {
          return res.json();
        })
        .then(res => console.log(res))
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
        <IntroImage text={["Admin"]} height="35vh" />
      </Suspense>
      <div
        style={{
          marginTop: "150px"
        }}
      ></div>
      <div className="container">
        <input
          type="email"
          name="text"
          id="test-text"
          placeholder="test-text"
        />
        <button onClick={() => Submit()}>Submit</button>
      </div>
    </Fragment>
  );
}
