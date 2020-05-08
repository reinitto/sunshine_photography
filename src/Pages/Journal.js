import React, { Fragment, Suspense, useEffect, useState } from "react";
import ImageGalleryWithoutLighbox from "../components/portfolio/ImageGalleryWithoutLighbox";
import IntroImage from "../components/IntroImage";
import MetaTags from "react-meta-tags";
import Spinner from "../components/Spinner";

export default function Journal({ journals }) {
  let [journal, setJournal] = useState(null);
  let [description, setDescription] = useState();
  let journalId = window.location.pathname.replace(`/journal/`, "");
  useEffect(() => {
    if (journals && Object.keys(journals).length > 0) {
      setJournal(journals[journalId]);
      let desLength = 0;
      let des = "";
      Object.keys(journals[journalId].images).forEach((key) => {
        if (journals[journalId].images[key].text.length > desLength) {
          des = journals[journalId].images[key].text;
          desLength = journals[journalId].images[key].text.length;
        }
      });
      setDescription(des);
    }
    return () => {
      setJournal(null);
      setDescription(null);
    };
  }, [journalId, journals]);
  return journal ? (
    <Fragment>
      <MetaTags id={journalId}>
        <title>{journal.title.title}</title>
        <meta name="description" content={description} />
      </MetaTags>
      <Suspense fallback={<div style={{ height: "400px" }}></div>}>
        <IntroImage
          subtitle={journal ? [journal.title.title] : null}
          height="35vh"
        />
      </Suspense>
      <div className="container">
        <Suspense fallback={`...loading`}>
          <ImageGalleryWithoutLighbox
            isJournal={true}
            journalImages={journal ? journal.images : null}
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
