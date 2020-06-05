import React, { lazy, useState, useEffect } from "react";
import { useWindowWidth } from "../useWindowWidth";
import HorizontalScroll from "../HorizontalScroll";

const instagramUrls = [
  "https://instagram.com/p/B-7mDcDByu_/",
  "https://instagram.com/p/BOeVb9Pgp24/",
  "https://instagram.com/p/BM0tMcFh-tU/",
  "https://instagram.com/p/_PALghL-Mi/",
  "https://instagram.com/p/-qWL__L-A9/",
];

let getInstagramPosts =
  "http://localhost:5001/momblog-15d1c/us-central1/instagram-instagram";

const Footer = () => {
  let windowWidth = useWindowWidth();
  let itemHeight = Math.max(Math.floor(windowWidth / 10), 125);
  // padding 2 x 1rem
  // border 2 x 1px
  // scrollbar 17px
  let smallHeight = itemHeight + 32 + 17;
  let height = windowWidth > 768 ? itemHeight * 1.5 + 32 + 2 : smallHeight;
  let style = {};
  let fontSize = windowWidth * 0.01;
  if (fontSize > 16) {
    fontSize = 16;
  }
  if (fontSize < 8) {
    fontSize = 8;
  }
  style.fontsize = fontSize;

  // let result = await fetch(url);
  // console.log("result", result);
  // console.log("result", await result.json());
  let [instaPosts, setInstaPosts] = useState([]);
  useEffect(() => {
    let urls = instagramUrls.map((url) => {
      return new Promise((resolve, reject) => {
        fetch(`https://api.instagram.com/oembed?url=${url}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => resolve({ ...data, url }));
      });
    });
    Promise.all(urls).then((res) => {
      let posts = res.map((post) => {
        return { ...post, imageUrl: post.thumbnail_url, journalUrl: post.url };
      });
      setInstaPosts(posts);
    });
  }, []);
  return (
    <footer className="d-flex flex-column">
      {instaPosts.length > 0 && (
        <div className="container pt-3">
          <h4 className="text-center">
            <a href={instaPosts[0].author_url}>
              More photos on Instagram
             </a>
          </h4>
        </div>
      )}
      <HorizontalScroll list={instaPosts} footer={true} />
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
