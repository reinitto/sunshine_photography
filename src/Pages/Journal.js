import React, { Fragment, Suspense, useEffect, useState } from "react";
// import * as firebase from "firebase/app";
import { journalIntroBg } from "../content/backgroundImages";
import ImageGalleryWithoutLighbox from "../components/portfolio/ImageGalleryWithoutLighbox";
import IntroImage from "../components/IntroImage";

export default function Journal({ journals }) {
  let [journal, setJournal] = useState(null);
  let journalId = window.location.pathname.replace(`/journal/`, "");
  useEffect(() => {
    if (journals) {
      setJournal(journals[journalId]);
    }
  }, [journalId]);
  return (
    <Fragment>
      <Suspense fallback={<div style={{ height: "400px" }}></div>}>
        <IntroImage
          imageSrc={journal ? journal.title.titleUrl : journalIntroBg}
          title={journal ? [journal.title.title] : null}
          height="55vh"
          inJournal={true}
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
  );
}
