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

export default function HomeView({ user }) {
  let [overlay, setOverlay] = useState(false);
  let [uploadFinished, setUploadFinished] = useState(true);
  let [heroTitle, setHeroTitle] = useState({});
  let [heroSubtitle, setHeroSubtitle] = useState({});
  let [heroKeywords, setHeroKeywords] = useState([{ id: shortid.generate() }]);
  let [menuSectionTitle, setMenuSectionTitle] = useState({});
  let [menuSectionSubtitle, setMenuSectionSubtitle] = useState({});
  let [travelJournalTitle, setTravelJournalTitle] = useState({});

  // let [sectionTitles, setSectionTitles] = useState([
  //   { id: shortid.generate() },
  // ]);

  useEffect(() => {
    // get data
    firebase
      .database()
      .ref(`/pages/home`)
      .once("value")
      .then((snapshot) => {
        let pageSnap = snapshot.val();
        if (pageSnap) {
          Object.keys(pageSnap).forEach((key) => {
            switch (key) {
              case "heroTitle":
                setHeroTitle(pageSnap[key]);
                break;
              case "heroSubtitle":
                setHeroSubtitle(pageSnap[key]);
                break;
              case "heroKeywords":
                setHeroKeywords(pageSnap[key]);
                break;
              case "menuSectionTitle":
                setMenuSectionTitle(pageSnap[key]);
                break;
              case "menuSectionSubtitle":
                setMenuSectionSubtitle(pageSnap[key]);
                break;
              case "travelJournalTitle":
                setTravelJournalTitle(pageSnap[key]);
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
      page: "home",
      fields: [
        { fieldName: "heroTitle", fieldValue: heroTitle },
        { fieldName: "heroSubtitle", fieldValue: heroSubtitle },
        { fieldName: "heroKeywords", fieldValue: heroKeywords },
        { fieldName: "menuSectionTitle", fieldValue: menuSectionTitle },
        { fieldName: "menuSectionSubtitle", fieldValue: menuSectionSubtitle },
        { fieldName: "travelJournalTitle", fieldValue: travelJournalTitle },
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

  let updateHeroTitle = (language, value) => {
    let newState = { ...heroTitle };
    newState[language] = value;
    setHeroTitle(newState);
  };
  let updateHeroSubtitle = (language, value) => {
    let newState = { ...heroSubtitle };
    newState[language] = value;
    setHeroSubtitle(newState);
  };
  let updateMenuSectionTitle = (language, value) => {
    let newState = { ...menuSectionTitle };
    newState[language] = value;
    setMenuSectionTitle(newState);
  };
  let updateMenuSectionSubtitle = (language, value) => {
    let newState = { ...menuSectionSubtitle };
    newState[language] = value;
    setMenuSectionSubtitle(newState);
  };
  let updateTravelJournalTitle = (language, value) => {
    let newState = { ...travelJournalTitle };
    newState[language] = value;
    setTravelJournalTitle(newState);
  };

  let updateHeroKeywords = (language, value, id) => {
    let newState = [...heroKeywords];
    let keyword = newState.filter((keyword) => keyword.id === id)[0];
    keyword[language] = value;
    let index = newState.findIndex((keyword) => keyword.id === id);
    newState[index] = keyword;
    setHeroKeywords(newState);
  };

  let closeOverlay = () => {
    setOverlay(false);
  };

  let heroTitleContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "Hero Title"}
      flagCode={lang}
      placeholder={"Hero Title"}
      textValue={heroTitle}
      updateTextValue={updateHeroTitle}
    />
  ));
  let heroSubtitleContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "Hero subtitle"}
      flagCode={lang}
      placeholder={"Hero subtitle"}
      textValue={heroSubtitle}
      updateTextValue={updateHeroSubtitle}
    />
  ));
  let menuSectionTitleContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "Menu section Title"}
      flagCode={lang}
      placeholder={"Menu section Title"}
      textValue={menuSectionTitle}
      updateTextValue={updateMenuSectionTitle}
    />
  ));
  let menuSectionSubtitleContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "Menu section Subtitle"}
      flagCode={lang}
      placeholder={"Menu section Subtitle"}
      textValue={menuSectionSubtitle}
      updateTextValue={updateMenuSectionSubtitle}
    />
  ));
  let travelJournalTitleContent = langs.map((lang, i) => (
    <InputWithFlag
      key={i + "Travel journal Menu Title"}
      flagCode={lang}
      placeholder={"Travel journal Menu Title"}
      textValue={travelJournalTitle}
      updateTextValue={updateTravelJournalTitle}
    />
  ));
  let heroKeywordsContent = heroKeywords.map((keyword, i) => {
    let inputs = langs.map((lang) => {
      return (
        <InputWithFlag
          key={keyword.id + "Hero Keyword" + lang}
          id={keyword.id}
          flagCode={lang}
          placeholder={"Hero Keyword"}
          textValue={heroKeywords[i]}
          updateTextValue={updateHeroKeywords}
        />
      );
    });
    return (
      <Fragment>
        {inputs}
        {/* <button onClick={() => removeHeroKeyword(keyword.id)}>delete</button> */}
        <hr
          style={{
            border: "1px dotted grey",
            width: "100%",
          }}
        />
      </Fragment>
    );
  });

  return (
    <Fragment>
      {overlay ? (
        <OverlaySimple closeOverlay={closeOverlay} finished={uploadFinished} />
      ) : null}
      <div className="container">
        <h2 className="text-center">Home Page </h2>
        <div className="admin-section">
          <h3>Hero section</h3>
          <h6>Title</h6>
          {heroTitleContent}
          <hr
            style={{
              border: "1px solid black",
              width: "100%",
            }}
          />
          <h6>Subtitle</h6>
          {heroSubtitleContent}
          <h6>Hero Keywords</h6>
          {heroKeywordsContent}
          {/* <button onClick={addHeroKeyword} className="btn btn-success">
            Add Keyword
          </button> */}
        </div>
        <div className="admin-section">
          <h3>Service Menu Section</h3>
          <h6> Title</h6>
          {menuSectionTitleContent}
          <h6> Subtitle</h6>
          {menuSectionSubtitleContent}
        </div>
        <div className="admin-section">
          <h3>Travel Journal Menu</h3>
          <h6>Title</h6>
          {travelJournalTitleContent}
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
