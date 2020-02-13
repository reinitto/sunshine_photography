import React, { Fragment, Suspense, lazy } from "react";
// import Gallery from "../components/portfolio/Gallery";
// import Navbar from "../components/layout/Navbar";
import IntroImage from "../components/IntroImage";
import JournalGalleries from "../content/journals.json";
const Gallery = lazy(() => import("../components/portfolio/Gallery"));

const journalIntroBg =
  "https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8951_1500_oxpgkq.jpg";

export default function Journal() {
  return (
    <Fragment>
      {/* <Navbar /> */}
      <Suspense fallback={<div style={{ height: "400px" }}></div>}>
        <IntroImage
          imageSrc={journalIntroBg}
          text={["Travel Photos"]}
          // height="35vh"
        />
      </Suspense>
      <div style={{ width: "90%", margin: "auto" }}>
        {/* <h2 className="text-center">Travel Photos</h2> */}
        <Suspense fallback={`...loading`}>
          <Gallery
            isJournal={true}
            collection={window.location.hash.slice(1)}
            galleries={JournalGalleries}
          />
        </Suspense>
      </div>
    </Fragment>
  );
}
