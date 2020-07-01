import React, { Fragment, Suspense, useEffect, useState } from "react";
import ImageGalleryWithoutLighbox from "../components/portfolio/ImageGalleryWithoutLighbox";
import IntroImage from "../components/IntroImage";
import MetaTags from "react-meta-tags";
import Spinner from "../components/Spinner";

export default function Journal({ journals, language }) {
  let [journal, setJournal] = useState(null);
  let [description, setDescription] = useState();
  let journalId = window.location.pathname.split("/journal/")[1];
  useEffect(() => {
    if (journals && Object.keys(journals).length > 0) {
      setJournal(journals[journalId]);
    }
    return () => {
      setJournal(null);
    };
  }, [journals, language, journalId]);
  useEffect(() => {
    let desLength = 0;
    let des = "";
    if (journal && journal.images) {
      Object.keys(journal.images).forEach((key) => {
        let translationText =
          journal.images[key].text[language] ||
          journal.images[key].text["us"] ||
          journal.images[key].text["eng"];
        if (
          typeof translationText == "string" &&
          translationText.length > desLength
        ) {
          des = translationText;
          desLength = des.length;
        }
      });
    }
    setDescription(des);
    return () => {
      setDescription(null);
    };
  }, [journal, language]);
  return journal ? (
    <Fragment>
      <MetaTags id={journalId}>
        <title>
          {journal.title.title[language] ||
            journal.title.title["eng"] ||
            journal.title.title["us"]}
        </title>
        <meta
          property="og:title"
          content={journal.title.title[language] || ""}
        />
        <meta name="description" content={description || ""} />
        <meta property="og:description" content={description || ""} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content={language} />
      </MetaTags>
      <Suspense fallback={<div style={{ height: "400px" }}></div>}>
        <IntroImage
          subtitle={
            journal
              ? [
                  journal.title.title[language] ||
                    journal.title.title["us"] ||
                    journal.title.title["eng"],
                ]
              : null
          }
          height="35vh"
        />
      </Suspense>
      <div className="container">
        <Suspense fallback={`...loading`}>
          <ImageGalleryWithoutLighbox
            isJournal={true}
            journalImages={journal ? journal.images : null}
            language={language}
          />
        </Suspense>
      </div>
    </Fragment>
  ) : (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
      }}
    >
      <Spinner />
    </div>
  );
}
