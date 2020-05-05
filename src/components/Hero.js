import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LazyBackground from "./LazyBackground";
import { useWindowWidth } from "./useWindowWidth";
import "./SocialIcons";
let mainBg =
  "https://res.cloudinary.com/sunshinephoto/image/upload/w_1600/images/backgrounds/Front_mount-1_po42ya";
let placeholderColor = "#b4c7d4";

export default function Hero({ title, subtitle, keywords, height = "100vh" }) {
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
    // <CloudinaryContext cloudName="sunshinephoto">
    <LazyBackground
      src={mainBg}
      // placeholder={placeholderBg}
      className="cover-image"
      style={{
        width: "100%",
        height,
        backgroundColor: placeholderColor,
      }}
    >
      <div
        // className="cover-image"
        style={{
          width: "100%",
          height,
        }}
      >
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
            <FontAwesomeIcon inverse icon={["fab", "facebook"]} size="lg" />
          </Link>
          <Link to="#" className="hero-social">
            <FontAwesomeIcon inverse icon={["fab", "instagram"]} size="lg" />
          </Link>
          <a as={Link} href="/#contactForm" className="hero-social">
            <FontAwesomeIcon inverse icon={["fa", "envelope"]} size="lg" />
          </a>
        </div>
      </div>
    </LazyBackground>
    // </CloudinaryContext>
  );
}
Hero.defaultProps = {
  imageSrc: "images/backgrounds/Front_mount-1_po42ya",
};
