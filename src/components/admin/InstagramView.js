import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayFromObject } from "../arrayFromObject";
import "../FontAwesomeIcons";
let instaUrl =
  "https://us-central1-momblog-15d1c.cloudfunctions.net/instagram-instagram";

const getInstagramFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.instagram.com/oembed?url=${url}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => resolve({ ...data, url }));
  });
};

const ItemView = ({ url, i, updateUrl, toggleDelete }) => {
  console.log("url", url);
  let [thumbnailUrl, setThumbnailUrl] = useState(null);
  let [title, setTitle] = useState(null);
  useEffect(() => {
    getInstagramFromUrl(url.url).then((data) => {
      console.log("data", data);
      setThumbnailUrl(data.thumbnail_url);
      setTitle(data.title);
    });
  }, [url]);
  return (
    <div
      className="d-flex"
      style={{
        border: "1px solid black",
        margin: "1rem",
      }}
    >
      <div
        className="d-flex flex-column"
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <div
          className="overlay justify-content-center align-items-center text-center"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: "100",
            background: "rgba(220,10,35,0.8)",
            display: `${url.delete ? "flex" : "none"}`,
          }}
        >
          <p className="text-white">DELETE</p>
        </div>
        <div key={`instagram-url-${url.url}`} className="text-center d-flex">
          <input
            type="text"
            placeholder="Copy/paste Instagram image link here. something like this - https://www.instagram.com/p/BM0tMcFh-tU/ "
            id={`instagram-url-${i}`}
            value={url.url}
            onChange={updateUrl}
            style={{
              width: "100%",
            }}
          />
        </div>
        <div>
          <p className="text-left">{title}</p>
        </div>
        <img
          src={thumbnailUrl}
          alt="thumbnail_preview"
          loading="lazy"
          width="240"
        />
      </div>
      <button
        onClick={() => toggleDelete(i)}
        className="d-flex align-items-center"
      >
        <FontAwesomeIcon color="red" icon={["fas", "minus-circle"]} size="sm" />
      </button>
    </div>
  );
};

export default function InstagramView({ instagram, user }) {
  let [urls, setUrls] = useState(
    arrayFromObject(instagram).map((url) => ({ url, delete: false }))
  );
  let addUrl = () => {
    setUrls([...urls, { url: "", delete: false }]);
  };
  let updateUrl = (e) => {
    let prevUrls = [...urls];
    let id = e.target.id.match(/(\d+)/g)[0];
    prevUrls[id].url = e.target.value;
    setUrls(prevUrls);
  };

  let toggleDelete = (i) => {
    let newUrls = [...urls];
    newUrls[i].delete = !newUrls[i].delete;
    // newUrls.splice(i, 1);
    setUrls(newUrls);
  };
  // add post/delete links
  const setAllInstagram = async () => {
    let idToken = await user.getIdToken();
    let newUrls = urls
      .filter((url) => url.delete === false)
      .map((url) => url.url);
    const instagramRequestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ urls: newUrls }),
    };
    let result = await fetch(instaUrl, instagramRequestOptions);
    let data = await result.json();
  };
  console.log("urls", urls);
  return (
    <div>
      <h3 className="text-center">Current Instagram Photos</h3>
      <div className="container">
        <div className="text-center d-flex flex-column">
          {urls.map((url, i) => {
            let props = { url, i, updateUrl, toggleDelete };
            return <ItemView {...props} />;
          })}
          <button
            onClick={addUrl}
            className="d-flex align-items-center justify-content-center"
          >
            <FontAwesomeIcon
              color="green"
              icon={["fas", "plus-circle"]}
              size="sm"
            />
            Add Link
          </button>
        </div>
        <button
          onClick={setAllInstagram}
          className="d-flex align-items-center justify-content-center"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
