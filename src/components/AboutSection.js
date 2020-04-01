import React from "react";
import { aboutImages } from "../content/aboutImages";
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

export default function About({ images, paragraphs }) {
  return (
    // <ContactInfo contactInfo={contactInfo} social={social} />
    <div
      style={{
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
