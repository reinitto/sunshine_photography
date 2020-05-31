import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import LazyBackground from "./LazyBackground";
import { useWindowWidth } from "./useWindowWidth";
import "./SocialIcons";

let placeholderColor = "#b4c7d4";
export default function Hero({
  title,
  subtitle,
  keywords,
  background,
  height = "100vh",
}) {
  let windowWidth = useWindowWidth();
  let subtitleSize = windowWidth * 0.024 > 30 ? "30px" : "2.4vw";
  let keywordSize = windowWidth * 0.01 > 16 ? "1rem" : "10px";

  return (
    <div
      className="cover-image"
      style={{
        width: "100%",
        height,
        backgroundColor: placeholderColor,
        backgroundImage: `url(${background.default})`,
        position: "relative",
        backgroundAttachment: `fixed`,
        backgroundRepeat: `no-repeat`,
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
    </div>
  );
}
