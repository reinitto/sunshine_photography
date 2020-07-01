import React, { Fragment, useState, useEffect } from "react";
import { OverlaySimple } from "./OverlaySimple";
import * as firebase from "firebase/app";
import { InputWithFlag } from "./InputWithFlag";

let langs = ["us", "lv", "no"];
let url =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/updatePageText-updatePageText";

export default function ContactView({ user }) {
  let [overlay, setOverlay] = useState(false);
  let [uploadFinished, setUploadFinished] = useState(true);
  let [contactTitle, setcontactTitle] = useState({});
  let [confirmMessage, setConfirmMessage] = useState({});
  let [sendButtonText, setSendButtonText] = useState({});
  let [fieldLabels, setFieldLabels] = useState({
    name: {},
    email: {},
    message: {},
  });

  useEffect(() => {
    // get data
    firebase
      .database()
      .ref(`/pages/contact`)
      .once("value")
      .then((snapshot) => {
        let pageSnap = snapshot.val();
        if (pageSnap) {
          Object.keys(pageSnap).forEach((key) => {
            switch (key) {
              case "contactTitle":
                setcontactTitle(pageSnap[key]);
                break;
              case "confirmMessage":
                setConfirmMessage(pageSnap[key]);
                break;
              case "sendButtonText":
                setSendButtonText(pageSnap[key]);
                break;
              case "fieldLabels":
                setFieldLabels(pageSnap[key]);
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
      page: "contact",
      fields: [
        { fieldName: "contactTitle", fieldValue: contactTitle },
        { fieldName: "confirmMessage", fieldValue: confirmMessage },
        { fieldName: "sendButtonText", fieldValue: sendButtonText },
        { fieldName: "fieldLabels", fieldValue: fieldLabels },
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

  let updateContactTitle = (language, value) => {
    let newState = { ...contactTitle };
    newState[language] = value;
    setcontactTitle(newState);
  };
  let updateConfirmMessage = (language, value) => {
    let newState = { ...confirmMessage };
    newState[language] = value;
    setConfirmMessage(newState);
  };
  let updateSendButtonText = (language, value) => {
    let newState = { ...sendButtonText };
    newState[language] = value;
    setSendButtonText(newState);
  };
  let updateFieldLabels = (language, value, id) => {
    let newState = { ...fieldLabels };
    newState[id][language] = value;
    setFieldLabels(newState);
  };

  let closeOverlay = () => {
    setOverlay(false);
  };

  let fieldLabelsContent = Object.keys(fieldLabels).map((label, i) => {
    let inputs = langs.map((lang) => {
      return (
        <InputWithFlag
          key={label + "Field Label" + lang}
          id={label}
          flagCode={lang}
          placeholder={"Field Label"}
          textValue={fieldLabels[label]}
          updateTextValue={updateFieldLabels}
        />
      );
    });
    return (
      <Fragment>
        <h6>{label}</h6>
        {inputs}
      </Fragment>
    );
  });

  let sendButtonTextContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "Send Button Text"}
      flagCode={lang}
      placeholder={"Send Button Text"}
      textValue={sendButtonText}
      updateTextValue={updateSendButtonText}
    />
  ));
  let contactTitleContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "Contact Title"}
      flagCode={lang}
      placeholder={"Contact Title"}
      textValue={contactTitle}
      updateTextValue={updateContactTitle}
    />
  ));
  let confirmMessageContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "Confirm Message"}
      flagCode={lang}
      placeholder={"Confirm Message"}
      textValue={confirmMessage}
      updateTextValue={updateConfirmMessage}
    />
  ));

  return (
    <Fragment>
      {overlay ? (
        <OverlaySimple closeOverlay={closeOverlay} finished={uploadFinished} />
      ) : null}
      <div className="container">
        <h2 className="text-center">Contact Form</h2>
        <div className="admin-section">
          <h3>Title</h3>
          {contactTitleContent}
          <hr
            style={{
              border: "1px solid black",
              width: "100%",
            }}
          />
        </div>
        <div className="admin-section">
          <h3>Confirm Message</h3>
          {confirmMessageContent}
        </div>
        <div className="admin-section">
          <h3>Send Button</h3>
          {sendButtonTextContent}
        </div>
        <div className="admin-section">
          <h3>Field Labels</h3>
          {fieldLabelsContent}
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
