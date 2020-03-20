import React from "react";
import { aboutImages } from "../content/aboutImages";
// import {
//   faHome,
//   faEnvelope,
//   faPhone,
//   faCamera
// } from "@fortawesome/free-solid-svg-icons";
// import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

About.defaultProps = {
  paragraphs: [
    `I like travel and lifestyle photography. It’s basically the perfect combination of both of my passions. Taking photos, meeting peoples and exploring the beauty of the world. There’s no better feeling than waking up with the sun and exploring new locations for the first time. Photo has always been a very important part of my life and always will be. This is my way of feeling, of touching, of telling a story, of loving!`,
    `My way into the job as a lifestyle photographer was probably a bit random, since I'm not a professional photographer. After many hours of online photography and editing courses at several photoschools, my interest in photography has not diminished! Photography has always been a hobby and a passion of mine, but it wasn't until I tried doing travel and lifestyle photography that I realized I was really on the right track.`,
    `My name is Jelena and I was born in Latvia , now I'm living in South Norway with my partner. We have an outstanding view over the fjord right from the house and mountains are not so far away. Meeting our children and grandchildren in addition to this makes my life complete!`
  ],
  images: aboutImages,
  contactInfo: {
    email: "info@gmail.com",
    phone: "+ 01 234 567 88",
    area: "Telemark/ Norway"
  },
  social: {
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    shutterstock: "https://www.shutterstock.com"
  }
};

// const icons = {
//   email: faEnvelope,
//   phone: faPhone,
//   area: faHome,
//   facebook: faFacebook,
//   instagram: faInstagram,
//   shutterstock: faCamera
// };

// const ContactInfo = ({ contactInfo, social }) => {
//   return (
//     <div className="row">
//       <div className="col-md-4 col-lg-3 col-xl-3">
//         {contactInfo &&
//           Object.keys(contactInfo).length > 0 &&
//           Object.keys(contactInfo).map((item, i) => (
//             <p key={i} className="contact-info-item">
//               <FontAwesomeIcon icon={icons[item]} className="mr-3" />
//               {contactInfo[item]}
//             </p>
//           ))}
//       </div>
//       <ul className="col-md-8 about-social">
//         {social &&
//           Object.keys(social).map((item, i) => (
//             <li key={i}>
//               <a
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 href={social[item]}
//                 className=" mx-auto"
//               >
//                 <div>
//                   <FontAwesomeIcon icon={icons[item]} size={"2x"} />
//                 </div>
//                 <p>{Object.keys(social)[i]}</p>
//               </a>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };

export default function About({ images, paragraphs }) {
  return (
    // <ContactInfo contactInfo={contactInfo} social={social} />
    <div
      style={{
        backgroundColor: "white",
        lineHeight: "2.2rem"
      }}
    >
      <div id="aboutMe" name="aboutMe">
        <div
          className="fitted-image"
          style={{
            backgroundImage: `url(${images[0]})`,
            position: "relative",
            height: "100vh",
            backgroundAttachment: `fixed`,
            backgroundRepeat: `no-repeat`
          }}
        >
          <div className="about-intro-text">
            <h6
              style={{
                textTransform: "uppercase"
              }}
            >
              the photographer
            </h6>
            <h2
              style={{
                textTransform: "uppercase"
              }}
            >
              about me
            </h2>
            <hr
              style={{
                borderTop: "1px solid black",
                width: "70%"
              }}
            />
            <p
              style={{
                lineHeight: "2.1rem",
                fontSize: "21px"
              }}
            >
              {paragraphs[0]}
            </p>
          </div>
        </div>
        <div className="about-text-2">
          <p>{paragraphs[1]}</p>
        </div>
        <div
          style={{
            backgroundColor: "#FAF7F6",
            padding: "50px 0px"
          }}
        >
          <div className="about-last-section">
            <div className="about-last-text">
              <h3 className="text-center">Me and My family</h3>
              <p>{paragraphs[2]}</p>
              <div>
                <a className="about-button btn-base" href="/#contactForm">
                  Contact Me
                </a>
              </div>
            </div>
            <div className="about-image-container">
              <img src={images[2]} alt="" />
              <img src={images[1]} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
