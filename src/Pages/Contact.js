import React, { Fragment, Suspense } from "react";
import ContactForm from "../components/contact/ContactForm";
import IntroImage from "../components/IntroImage";

const contactPageBg =
  "https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8951_1500_oxpgkq.jpg";

export default function Contact() {
  return (
    <Fragment>
      {/* <Navbar /> */}

      <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
        <IntroImage
          imageSrc={contactPageBg}
          text={["Contact Me"]}
          height="35vh"
        />
      </Suspense>
      <ContactForm
        title={false}
        backgroundImage="https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8951_1500_oxpgkq.jpg"
      />
    </Fragment>
  );
}
