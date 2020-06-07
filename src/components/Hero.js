import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink } from "react-router-hash-link";
import "./FontAwesomeIcons";
import { useWindowWidth } from "./useWindowWidth";
import { useWindowFromTop } from "./useWindowFromTop";

let placeholderColor = "#b4c7d4";
export default function Hero({
  title,
  subtitle,
  keywords,
  background,
  height = "100vh",
}) {
  let windowWidth = useWindowWidth();
  let fromTop = useWindowFromTop();
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
          <HashLink
            to="/#contactForm"
            className="hero-social"
            aria-label="email"
          >
            <FontAwesomeIcon inverse icon={["fa", "envelope"]} size="lg" />
          </HashLink>
        </div>
        <div
          style={{
            position: "absolute",
            top: "85%",
            left: 0,
            right: 0,
            marginLeft: "auto",
            marginRight: "auto",
            width: "120px",
            transition: "all 1s",
          }}
        >
          {/* <p
            style={{
              padding: 0,
              margin: 0,
              marginBottom: "-1rem",
              color: fromTop === 0 ? "#3d4856" : "transparent",
              transition: "all 1s",
              fontSize: "15px",
            }}
          >
            Scroll Down
          </p> */}
          <div
            style={{
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "55px",
              width: "55px",
              transition: "all 1s",
              animation: "move 1.4s ease-out infinite",
            }}
          >
            <svg
              className="bi bi-chevron-double-down"
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill={fromTop === 0 ? "#3d4856" : "transparent"}
              style={{
                transition: "all 1s",
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
