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
  "http://localhost:5001/momblog-15d1c/us-central1/updatePageText-updatePageText";

export default function NavigationView({ user }) {
  let [overlay, setOverlay] = useState(false);
  let [uploadFinished, setUploadFinished] = useState(true);
  let [buttonTexts, setButtonTexts] = useState([{}]);

  useEffect(() => {
    // get data
    firebase
      .database()
      .ref(`/pages/navigation`)
      .once("value")
      .then((snapshot) => {
        let pageSnap = snapshot.val();
        if (pageSnap) {
          Object.keys(pageSnap).forEach((key) => {
            switch (key) {
              case "buttonTexts":
                setButtonTexts(pageSnap[key]);
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
    // let idToken = await user.getIdToken();
    const data = {
      page: "footer",
      fields: [{ fieldName: "buttonTexts", fieldValue: buttonTexts }],
    };
    const RequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(data),
    };
    await fetch(url, RequestOptions);
    setUploadFinished(true);
  };

  let updateButtonTexts = (language, value, id) => {
    let newState = [...buttonTexts];
    let button = newState.filter((button) => button.id === id)[0];
    button[language] = value;
    let index = newState.findIndex((button) => button.id === id);
    newState[index] = button;
    setButtonTexts(newState);
  };
  let addButtonText = () => {
    let newState = [...buttonTexts, { id: shortid.generate() }];
    setButtonTexts(newState);
  };
  let removeButtonText = (id) => {
    let newState = [...buttonTexts].filter((item) => item.id !== id);
    setButtonTexts(newState);
  };

  let closeOverlay = () => {
    setOverlay(false);
  };
  let buttonTextsContent = buttonTexts.map((button, i) => {
    let inputs = langs.map((lang) => {
      return (
        <InputWithFlag
          key={button.id + "Navigation Button" + lang}
          id={button.id}
          flagCode={lang}
          placeholder={"Nav Button"}
          textValue={buttonTexts[i]}
          updateTextValue={updateButtonTexts}
        />
      );
    });
    return (
      <Fragment>
        {inputs}
        <button onClick={() => removeButtonText(button.id)}>delete</button>
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

        {buttonTextsContent}
        <button onClick={addButtonText} className="btn btn-success">
          Add Button
        </button>
        <hr
          style={{
            border: "1px solid black",
            width: "100%",
          }}
        />
      </div>
      <button onClick={submit} className="btn btn-success">
        Update
      </button>
    </Fragment>
  );
}
