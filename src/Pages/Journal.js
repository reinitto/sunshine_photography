import React, { Fragment, Suspense, useEffect, useState } from "react";
import ImageGalleryWithoutLighbox from "../components/portfolio/ImageGalleryWithoutLighbox";
import IntroImage from "../components/IntroImage";
import Spinner from "../components/Spinner";

export default function Journal({ journals }) {
  let [journal, setJournal] = useState(null);
  let journalId = window.location.pathname.replace(`/journal/`, "");
  useEffect(() => {
    if (journals) {
      setJournal(journals[journalId]);
    }
  }, [journalId, journals]);

  return journal ? (
    <Fragment>
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
