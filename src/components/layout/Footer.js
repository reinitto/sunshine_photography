import React, { useState, useEffect } from "react";
import { useWindowWidth } from "../useWindowWidth";
import { arrayFromObject } from "../arrayFromObject";
import HorizontalScroll from "../HorizontalScroll";
// translations={this.state.translations["footer"]}
            // language={this.state.language}
const Footer = ({ instagram,translations,language }) => {
  let windowWidth = useWindowWidth();

  let style = {};
  let fontSize = windowWidth * 0.01;
  if (fontSize > 16) {
    fontSize = 16;
  }
  if (fontSize < 8) {
    fontSize = 8;
  }
  style.fontsize = fontSize;
  let [instaPosts, setInstaPosts] = useState([]);
  useEffect(() => {
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
        return { ...post, imageUrl: post.thumbnail_url, journalUrl: post.url };
      });
      setInstaPosts(posts);
    });
  }, [instagram]);
  console.log('footer trans',translations)
  return (
    <footer className="d-flex flex-column">
      {instaPosts.length > 0 && (
        <div className="container pt-3">
          <h4 className="text-center">
            <a href={instaPosts[0].author_url}>
              {
                translations?(translations.toInstagramText[language]||translations.toInstagramText['us']):('Follow Me on Instagram')
              }
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
          {
                translations?(translations.toTopButton[language]||translations.toTopButton['us']):('To The Top')
              }
          
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
