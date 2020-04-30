import React from "react";
import { Link } from "react-router-dom";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { useWindowWidth } from "./useWindowWidth";
import { mainBg } from "../content/backgroundImages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Hero({
  imageSrc,
  title,
  subtitle,
  keywords,
  height = "100vh",
}) {
  let windowWidth = useWindowWidth();
  let titleSize = "8vw";
  let subtitleSize = windowWidth * 0.024 > 30 ? "30px" : "2.4vw";
  let keywordPadding = "0.2rem 3rem";
  let keywordLetterSpacing = "1.22rem";
  let subtitleSpacing = "1.34rem";
  let keywordSize = windowWidth * 0.01 > 16 ? "1rem" : "10px";
  let color = "white";
  if (windowWidth * 0.08 < 65) {
    titleSize = "65px";
    color = "#3d4856";
    keywordPadding = "0.2rem 1rem";
    keywordLetterSpacing = "0.3rem";
    subtitleSpacing = "0.8rem";
  }
  return (
    <CloudinaryContext cloudName="sunshinephoto">
      <div
        // className="cover-image"
        style={{
          width: "100%",
          height,
        }}
      >
        <Image
          publicId={mainBg}
          width={1600}
          crop="fill"
          className="cover-image"
          style={{
            width: "100%",
            height: "100%",
          }}
          secure="true"
        >
          <Transformation
            quality="auto"
            fetchFormat="auto"
            flags="progressive:semi"
            dpr="auto"
          />
        </Image>
        <div className="hero">
          <h1
            className="text-center title-text"
            style={{
              fontSize: titleSize,
              color,
            }}
          >
            {title}
          </h1>
          <h2
            className="text-center text-uppercase hero-subtitle"
            style={{
              fontSize: subtitleSize,
              letterSpacing: subtitleSpacing,
            }}
          >
            {subtitle}
          </h2>
          <div className="hero-keywords d-flex justify-content-center flex-wrap">
            {keywords
              ? keywords.map((word, i) => {
                  return (
                    <span
                      className="hero-keyword text-uppercase"
                      key={i}
                      style={{
                        padding: keywordPadding,
                        letterSpacing: keywordLetterSpacing,
                        fontSize: keywordSize,
                      }}
                    >
                      {word}
                    </span>
                  );
                })
              : null}
          </div>
        </div>
        <div className="hero-social-container">
          <Link to="#" className="hero-social">
            <FontAwesomeIcon inverse icon={faFacebook} size="lg" />
          </Link>
          <Link to="#" className="hero-social">
            <FontAwesomeIcon inverse icon={faInstagram} size="lg" />
          </Link>
          <a as={Link} href="/#contactForm" className="hero-social">
            <FontAwesomeIcon inverse icon={faEnvelope} size="lg" />
          </a>
        </div>
      </div>
    </CloudinaryContext>
  );
}
Hero.defaultProps = {
  imageSrc: "images/backgrounds/Front_mount-1_po42ya",
};
