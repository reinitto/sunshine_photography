import React, { Fragment, useState, useEffect } from "react";
import { OverlaySimple } from "./OverlaySimple";
import * as firebase from "firebase/app";
import { InputWithFlag } from "./InputWithFlag";

let langs = ["us", "lv", "no"];
let url =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/updatePageText-updatePageText";

export default function FooterView({ user }) {
  let [overlay, setOverlay] = useState(false);
  let [uploadFinished, setUploadFinished] = useState(true);
  let [toInstagramText, setToInstagramText] = useState({});
  let [toTopButton, setToTopButton] = useState({});

  useEffect(() => {
    // get data
    firebase
      .database()
      .ref(`/pages/footer`)
      .once("value")
      .then((snapshot) => {
        let pageSnap = snapshot.val();
        if (pageSnap) {
          Object.keys(pageSnap).forEach((key) => {
            switch (key) {
              case "toInstagramText":
                setToInstagramText(pageSnap[key]);
                break;
              case "toTopButton":
                setToTopButton(pageSnap[key]);
                break;
              default:
                break;
            }
          });
        }
      });
  }, []);

  let submit = async () => {
    // submit data to api
    setOverlay(true);
    let idToken = await user.getIdToken();
    const data = {
      page: "footer",
      fields: [
        { fieldName: "toInstagramText", fieldValue: toInstagramText },
        { fieldName: "toTopButton", fieldValue: toTopButton },
      ],
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

  let updateToInstagramText = (language, value) => {
    let newState = { ...toInstagramText };
    newState[language] = value;
    setToInstagramText(newState);
  };
  let updateToTopButton = (language, value) => {
    let newState = { ...toTopButton };
    newState[language] = value;
    setToTopButton(newState);
  };

  let closeOverlay = () => {
    setOverlay(false);
  };

  let toInstagramTextContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "To Instagram Text"}
      flagCode={lang}
      placeholder={"To Instagram Text"}
      textValue={toInstagramText}
      updateTextValue={updateToInstagramText}
    />
  ));
  let toTopButtonContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "To Top Button Text"}
      flagCode={lang}
      placeholder={"To Top Button Text"}
      textValue={toTopButton}
      updateTextValue={updateToTopButton}
    />
  ));

  return (
    <Fragment>
      {overlay ? (
        <OverlaySimple closeOverlay={closeOverlay} finished={uploadFinished} />
      ) : null}
      <div className="container">
        <h2 className="text-center">Footer</h2>
        {/* Section 0 */}
        <div className="admin-section">
          <h3>To Instagram Text</h3>
          {toInstagramTextContent}
          <hr
            style={{
              border: "1px solid black",
              width: "100%",
            }}
          />
        </div>
        <div className="admin-section">
          <h3>To Top Button Text</h3>
          {toTopButtonContent}
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={submit} className="btn btn-success w-75">
            Update
          </button>
        </div>
      </div>
    </Fragment>
  );
}
