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
  let subtitleSize = windowWidth * 0.024 > 30 ? "30px" : "2.4vw";
  let keywordSize = windowWidth * 0.01 > 16 ? "1rem" : "10px";

  return (
    <LazyBackground
      src={mainBg}
      className="cover-image"
      style={{
        width: "100%",
        height,
        backgroundColor: placeholderColor,
      }}
    >
      <div
        style={{
          width: "100%",
          height,
        }}
      >
        <div className="hero">
          <h1 className="text-center title-text">{title}</h1>
          <h2
            className="text-center text-uppercase hero-subtitle"
            style={{
              fontSize: subtitleSize,
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
          <Link to="#" className="hero-social" aria-label="Facebook">
            <FontAwesomeIcon inverse icon={["fab", "facebook"]} size="lg" />
          </Link>
          <Link to="#" className="hero-social" aria-label="instagram">
            <FontAwesomeIcon inverse icon={["fab", "instagram"]} size="lg" />
          </Link>
          <a
            as={Link}
            href="/#contactForm"
            className="hero-social"
            aria-label="email"
          >
            <FontAwesomeIcon inverse icon={["fa", "envelope"]} size="lg" />
          </a>
        </div>
      </div>
    </LazyBackground>
  );
}
Hero.defaultProps = {
  imageSrc: "images/backgrounds/Front_mount-1_po42ya",
};
