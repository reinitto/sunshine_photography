import React from "react";
import { Link } from "react-router-dom";
import { mainBg } from "../content/backgroundImages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Hero({ imageSrc, title, keywords, height = "100vh" }) {
  return (
    <div
      className="cover-image"
      style={{
        backgroundImage: `url(${imageSrc})`,
        height
      }}
    >
      <div className="hero">
        <h1 className="text-center">{title}</h1>
        <div className="hero-keywords">
          {keywords
            ? keywords.map((word, i) => {
                return (
                  <span className="hero-keyword text-uppercase" key={i}>
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
  );
}
Hero.defaultProps = {
  imageSrc: mainBg
};
