import React, { useState, useEffect, useRef } from "react";
import { arrayFromObject } from "../arrayFromObject";
import HorizontalScroll from "../HorizontalScroll";

const Footer = ({ instagram, translations, language }) => {
  let [instaPosts, setInstaPosts] = useState([]);
  let footerRef = useRef();

  useEffect(() => {
    let getInstaPosts = () => {
      if (instaPosts.length === 0) {
        let urls = arrayFromObject(instagram).map((url) => {
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
            return {
              ...post,
              imageUrl: post.thumbnail_url,
              journalUrl: post.url,
            };
          });
          setInstaPosts(posts);
        });
      }
    };
    let options = {
      threshold: 0.25,
    };
    let currRef = footerRef.current;
    let observer = new IntersectionObserver((entries) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          getInstaPosts();
        }
      }
    }, options);
    observer.observe(currRef);

    return () => {
      observer.unobserve(currRef);
    };
  }, [instagram, instaPosts]);

  return (
    <footer className="d-flex flex-column" ref={footerRef}>
      {instaPosts.length > 0 && (
        <div className="container pt-3">
          <h4 className="text-center">
            <a href={instaPosts[0].author_url}>
              <h4>
                {translations
                  ? translations.toInstagramText[language] ||
                    translations.toInstagramText["us"]
                  : "Follow Me on Instagram"}
              </h4>
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
          {translations
            ? translations.toTopButton[language] ||
              translations.toTopButton["us"]
            : "To The Top"}
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
