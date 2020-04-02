import React from "react";
import { HorizontalScroll } from "../HorizontalScroll";
import { createJournalItems } from "../createJournalItems";

const Footer = ({ journals }) => {
  let journalItems = [];
  if (journals) {
    journalItems = createJournalItems(journals);
  }
  return (
    <footer className="d-flex flex-column">
      <HorizontalScroll list={journalItems} />
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
