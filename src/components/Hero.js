import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink } from "react-router-hash-link";
import LazyBackground from "./LazyBackground";
import "./FontAwesomeIcons";
import { useWindowInnerWidth } from "./useWindowInnerWidth";
import { useWindowOuterWidth } from "./useWindowOuterWidth";
import { useWindowFromTop } from "./useWindowFromTop";

let placeholderColor = "#b4c7d4";
export default function Hero({
  title,
  subtitle,
  keywords,
  background,
  height = "100vh",
}) {
  let windowWidth = Math.min(useWindowInnerWidth(), useWindowOuterWidth());
  let fromTop = useWindowFromTop();
  let [keywordSize, setkeywordSize] = useState();
  let [minRes, setminRes] = useState();
  let [resSize, setresSize] = useState(0);
  useEffect(() => {
    setminRes(windowWidth <= 768 ? windowWidth * 2 : windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    let resSize = 1920;
    Object.keys(background.sizes).forEach((size) => {
      size = parseInt(size);
      if (size >= minRes && size < resSize) {
        resSize = size;
      }
    });
    setresSize(resSize);

    setkeywordSize(windowWidth * 0.01 > 16 ? "1rem" : "10px");
  }, [windowWidth, minRes, background]);

  return (
    <LazyBackground
      src={`${background.sizes[resSize]}`}
      className="d-flex flex-column contact-form-container cover-image justify-content-center align-items-center"
      style={
        windowWidth > 768
          ? {
              backgroundAttachment: `fixed`,
              backgroundRepeat: `no-repeat`,
              height: height,
              width: "100%",
              backgroundColor: placeholderColor,
            }
          : {
              height: height,
              width: "100%",
              backgroundColor: placeholderColor,
            }
      }
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
              fontSize: "2.4vw",
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
          <div
            style={{
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "55px",
              width: "55px",
              transition: "all 1s",
              animation: "move 3s ease-out infinite",
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
    </LazyBackground>
  );
}
