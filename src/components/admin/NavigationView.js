import React, { Fragment, useState, useEffect } from "react";
import { OverlaySimple } from "./OverlaySimple";
import * as firebase from "firebase/app";
import { InputWithFlag } from "./InputWithFlag";
const shortid = require("shortid");
shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
);

let langs = ["us", "lv", "no"];
let url =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/updatePageText-updatePageText";

export default function NavigationView({ user }) {
  let [overlay, setOverlay] = useState(false);
  let [uploadFinished, setUploadFinished] = useState(true);
  let [buttonTexts, setButtonTexts] = useState({
    home: { us: "home", lv: "", no: "" },
    services: { us: "services", lv: "", no: "" },
    about: { us: "about me", lv: "", no: "" },
    contact: { us: "contact", lv: "", no: "" },
    blog: { us: "blog", lv: "", no: "" },
  });

  useEffect(() => {
    // get data
    firebase
      .database()
      .ref(`/pages/navigation`)
      .once("value")
      .then((snapshot) => {
        let pageSnap = snapshot.val();
        if (pageSnap) {
          setButtonTexts(pageSnap["buttonTexts"]);
        }
      });
  }, []);

  let submit = async () => {
    // submit data to api
    setOverlay(true);
    let idToken = await user.getIdToken();
    const data = {
      page: "navigation",
      fields: [{ fieldName: "buttonTexts", fieldValue: buttonTexts }],
    };
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(data),
    };
    await fetch(url, RequestOptions);
    setUploadFinished(true);
  };

  let updateButtonTexts = (language, value, name) => {
    let newState = { ...buttonTexts };
    let button = newState[name];
    button[language] = value;
    setButtonTexts(newState);
  };

  let closeOverlay = () => {
    setOverlay(false);
  };
  let buttonTextsContent = Object.keys(buttonTexts).map((name, i) => {
    let inputs = langs.map((lang) => {
      return (
        <InputWithFlag
          key={name + "Navigation Button" + lang}
          id={name}
          flagCode={lang}
          placeholder={"Nav Button"}
          textValue={buttonTexts[name]}
          updateTextValue={updateButtonTexts}
        />
      );
    });
    return (
      <Fragment>
        <h6>{name}</h6>
        {inputs}
      </Fragment>
    );
  });

  return (
    <Fragment>
      {overlay ? (
        <OverlaySimple closeOverlay={closeOverlay} finished={uploadFinished} />
      ) : null}
      <div>
        <h2 className="text-center">Navigation Buttons</h2>
        <div className="admin-section">{buttonTextsContent}</div>

        <hr
          style={{
            border: "1px solid black",
            width: "100%",
          }}
        />
        <div className="d-flex justify-content-center">
          <button onClick={submit} className="btn btn-success w-75">
            Update
          </button>
        </div>
      </div>
    </Fragment>
  );
}
