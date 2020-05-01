import React from "react";
import { HorizontalScroll } from "../HorizontalScroll";
import { createJournalItems } from "../createJournalItems";
import { useWindowWidth } from "../useWindowWidth";

const Footer = ({ journals }) => {
  let journalItems = [];
  if (journals) {
    journalItems = createJournalItems(journals);
  }
  let windowWidth = useWindowWidth();
  let height = Math.max(Math.floor(windowWidth / 10), 125) * 1.5 + 32;
  let style = {};
  let fontSize = windowWidth * 0.01;
  if (fontSize > 16) {
    fontSize = 16;
  }
  if (fontSize < 8) {
    fontSize = 8;
  }
  style.fontsize = fontSize;
  return (
    <footer className="d-flex flex-column">
      {journalItems && journalItems.length > 0 ? (
        <HorizontalScroll
          hideArrows={true}
          list={journalItems}
          footer={true}
          style={style}
        />
      ) : (
        <div
          style={{
            ...style,
            height,
          }}
        ></div>
      )}
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary btn-base"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          To The Top
        </button>
      </div>
      <div>
        <small>
          &copy; Copyright {new Date().getFullYear()}, Example Corporation
        </small>
      </div>
    </footer>
  );
};
export default Footer;
