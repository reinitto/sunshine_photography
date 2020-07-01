import React, { Fragment, useState, useEffect } from "react";
import * as firebase from "firebase/app";
import { OverlaySimple } from "./OverlaySimple";
import { TextAreaWithFlag } from "./TextAreaWithFlag";
import { InputWithFlag } from "./InputWithFlag";

let langs = ["us", "lv", "no"];

let url =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/updatePageText-updatePageText";

export default function AboutView({ user }) {
  let [overlay, setOverlay] = useState(false);
  let [uploadFinished, setUploadFinished] = useState(true);
  let [aboutMeTitle, setAboutMeTitle] = useState({});
  let [aboutMeSubtitle, setAboutMeSubtitle] = useState({});
  let [aboutMeText, setAboutMeText] = useState({});
  let [middleText, setMiddleText] = useState({});
  let [familySectionTitle, setFamilySectionTitle] = useState({});
  let [familySectionText, setFamilySectionText] = useState({});
  let [familySectionButton, setFamilySectionButton] = useState({});

  useEffect(() => {
    // get data
    firebase
      .database()
      .ref(`/pages/about`)
      .once("value")
      .then((snapshot) => {
        let pageSnap = snapshot.val();
        if (pageSnap) {
          Object.keys(pageSnap).forEach((key) => {
            switch (key) {
              case "aboutMeTitle":
                setAboutMeTitle(pageSnap[key]);
                break;
              case "aboutMeSubtitle":
                setAboutMeSubtitle(pageSnap[key]);
                break;
              case "aboutMeText":
                setAboutMeText(pageSnap[key]);
                break;
              case "familySectionTitle":
                setFamilySectionTitle(pageSnap[key]);
                break;
              case "middleText":
                setMiddleText(pageSnap[key]);
                break;
              case "familySectionText":
                setFamilySectionText(pageSnap[key]);
                break;
              case "familySectionButton":
                setFamilySectionButton(pageSnap[key]);
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
      page: "about",
      fields: [
        { fieldName: "aboutMeTitle", fieldValue: aboutMeTitle },
        { fieldName: "aboutMeSubtitle", fieldValue: aboutMeSubtitle },
        { fieldName: "aboutMeText", fieldValue: aboutMeText },
        { fieldName: "middleText", fieldValue: middleText },
        { fieldName: "familySectionTitle", fieldValue: familySectionTitle },
        { fieldName: "familySectionText", fieldValue: familySectionText },
        { fieldName: "familySectionButton", fieldValue: familySectionButton },
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

  let updateFamilySectionTitle = (language, value) => {
    let newState = { ...familySectionTitle };
    newState[language] = value;
    setFamilySectionTitle(newState);
  };
  let updateFamilySectionText = (language, value) => {
    let newState = { ...familySectionText };
    newState[language] = value;
    setFamilySectionText(newState);
  };
  let updateFamilySectionButton = (language, value) => {
    let newState = { ...familySectionButton };
    newState[language] = value;
    setFamilySectionButton(newState);
  };

  let updateAboutMeText = (language, value) => {
    let newState = { ...aboutMeText };
    newState[language] = value;
    setAboutMeText(newState);
  };
  let updateAboutMeSubtitle = (language, value) => {
    let newState = { ...aboutMeSubtitle };
    newState[language] = value;
    setAboutMeSubtitle(newState);
  };
  let updateAboutMeTitle = (language, value) => {
    let newState = { ...aboutMeTitle };
    newState[language] = value;
    setAboutMeTitle(newState);
  };
  let updateMiddleText = (language, value) => {
    let newState = { ...middleText };
    newState[language] = value;
    setMiddleText(newState);
  };

  let closeOverlay = () => {
    setOverlay(false);
  };

  let aboutSectionSubtitleContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i}
      flagCode={lang}
      placeholder={"About Me section Subtitle"}
      textValue={aboutMeSubtitle}
      updateTextValue={updateAboutMeSubtitle}
    />
  ));
  let aboutSectionTitleContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i}
      flagCode={lang}
      placeholder={"About Me section Title"}
      textValue={aboutMeTitle}
      updateTextValue={updateAboutMeTitle}
    />
  ));
  let aboutSectionTextContent = langs.map((lang, i) => (
    <TextAreaWithFlag
      key={i}
      flagCode={lang}
      placeholder={"About Me section Text"}
      textValue={aboutMeText}
      updateTextValue={updateAboutMeText}
    />
  ));

  let middleSectionContent = langs.map((lang, i) => (
    <TextAreaWithFlag
      key={i}
      flagCode={lang}
      placeholder={"Middle section"}
      textValue={middleText}
      updateTextValue={updateMiddleText}
    />
  ));
  let familySectionTitleContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i}
      flagCode={lang}
      placeholder={"Family section Title"}
      textValue={familySectionTitle}
      updateTextValue={updateFamilySectionTitle}
    />
  ));
  let familySectionTextContent = langs.map((lang, i) => (
    <TextAreaWithFlag
      key={i}
      flagCode={lang}
      placeholder={"Family section Text"}
      textValue={familySectionText}
      updateTextValue={updateFamilySectionText}
    />
  ));
  let familySectionButtonContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i}
      flagCode={lang}
      placeholder={"Family section Button"}
      textValue={familySectionButton}
      updateTextValue={updateFamilySectionButton}
    />
  ));
  return (
    <Fragment>
      {overlay ? (
        <OverlaySimple closeOverlay={closeOverlay} finished={uploadFinished} />
      ) : null}
      <div className="container">
        <h2 className="text-center">About Page</h2>
        <div className="admin-section">
          <h3>About Me section</h3>
          <h6>Title</h6>
          {aboutSectionTitleContent}
          <h6>Subtitle</h6>
          {aboutSectionSubtitleContent}
          <h6>Text</h6>
          {aboutSectionTextContent}
        </div>
        <div className="admin-section">
          <h3>Middle Text</h3>
          {middleSectionContent}
        </div>
        <div className="admin-section">
          <h3>Family Section</h3>
          <h6>Title</h6>
          {familySectionTitleContent}
          <hr
            style={{
              border: "1px solid black",
              width: "100%",
            }}
          />
          <h6>Text</h6>
          {familySectionTextContent}
          <hr
            style={{
              border: "1px solid black",
              width: "100%",
            }}
          />
          <h6>Button Text</h6>
          {familySectionButtonContent}
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
