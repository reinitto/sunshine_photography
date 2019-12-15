import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "./ImageGallery";

const portfolioImages = {
  baby: [
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_3512.JPG?alt=media&token=d3c782e2-3f51-413e-b245-030cb40a4126",
      width: 4,
      height: 3,
      categories: ["landscape", "nature", "food", "aerial"]
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_3557.JPG?alt=media&token=0bfa6cbe-2225-4bb7-8e70-95f03b7da9f2",
      width: 10,
      height: 2,
      categories: ["landscape", "nature", "food", "aerial"]
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_3570.JPG?alt=media&token=4c3cbe60-dcde-41af-8811-7cbc96c0ebd8",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_3572.JPG?alt=media&token=e1167c13-31bb-476a-a99e-9a1be92305b0",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_3517.JPG?alt=media&token=12b50032-e52e-4f88-b58f-85ddbe56d64b",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_3520.JPG?alt=media&token=0ed423af-dcb7-497d-9751-b585d86acc9e",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_3525.JPG?alt=media&token=f1d051be-fb1c-426a-9769-a0b9588c701e",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 1,
      height: 1
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5012.JPG?alt=media&token=bcea9085-afb7-4659-b27a-e6194142d9b1",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5018.JPG?alt=media&token=eb7d7cd0-285c-4ddf-bd90-20e8184edda7",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5020.JPG?alt=media&token=5a48c3c7-b79c-45ed-9e87-66f169b2e793",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5031.JPG?alt=media&token=52b0b61b-376f-4c7b-b8d7-9834b01b4d85",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5041.JPG?alt=media&token=a6df41a8-1798-48f0-960d-bb96823ac230p",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5047.JPG?alt=media&token=f12708fc-5294-4c1b-9501-944183799fec",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5054.JPG?alt=media&token=5adb46ea-e1cc-4d09-90a7-2039c33b84cb",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5057.JPG?alt=media&token=580b114f-e168-4346-9f14-4ab4c3362f56",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5062.JPG?alt=media&token=0223202d-6bd3-4b07-bdde-8fdd2782bc0d",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5077.JPG?alt=media&token=d15a3968-86b3-46d7-a906-6410cb3a1817",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/baby%2FIMG_5081.JPG?alt=media&token=0cdb07e4-8c42-49be-a3d5-b65cef33f1a3",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    }
  ],
  family: [
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/family%2FIMG_5153.JPG?alt=media&token=e5f73af9-1afe-48c7-b4a5-3dd7f7c74aee",
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/family%2FIMG_5157.JPG?alt=media&token=35b968be-85b6-4528-a850-ea47b8b5b63e",
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/family%2FIMG_5159.JPG?alt=media&token=3558c555-9dd9-49ab-a2f9-df4b997fc157",
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/family%2FIMG_5164.JPG?alt=media&token=f58a8095-4dd5-4072-9f78-780ca4b804c7",
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/family%2FIMG_5166.JPG?alt=media&token=4b6a86b6-0719-4672-a7fb-84d6af78c4ad",
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/family%2FIMG_5173.JPG?alt=media&token=5e702dcc-1824-44a0-bc3e-fa400f5771d5",
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/family%2FIMG_5177.JPG?alt=media&token=2446a5c4-8793-4f45-ae7b-2f0d14921311",
      width: 4,
      height: 3
    },
    {
      src:
        "https://firebasestorage.googleapis.com/v0/b/momblog-15d1c.appspot.com/o/family%2FIMG_5180.JPG?alt=media&token=52dfa6e7-57ff-4e75-8b1d-e95bf6fe05e0",
      width: 4,
      height: 3
    }
  ],
  portrait: [
    {
      src:
        "https://images.unsplash.com/photo-1518144591331-17a5dd71c477?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1506020757198-1a3adb04b6b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1510846606678-710c05a5c776?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1476231682828-37e571bc172f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1503079230625-8a7c589a9007?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1508233620467-f79f1e317a05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1513760870-d12407065ae4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    }
  ],
  event: [
    {
      src:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    }
  ]
};

export function GalleryNav({ collections, isJournal }) {
  const journalLinks = Object.keys(collections).map((collection, i) => {
    return (
      <Link
        style={{
          width: "100%",
          height: "450px",
          padding: "1rem"
        }}
        to={`/journal#${collection}`}
      >
        <div
          key={i}
          style={{
            backgroundImage: `${"url(" +
              collections[collection][0].src +
              "&w=450&q=60" +
              ")"}`,
            objectFit: `cover`,
            backgroundSize: `cover`,
            backgroundPosition: `center`,
            width: "100%",
            height: "100%",
            display: `flex`,
            justifyContent: `center`,
            alignItems: `center`
          }}
        >
          <p
            style={{
              background: "white",
              padding: "1rem 3rem"
            }}
          >{`${collection}`}</p>
        </div>
      </Link>
    );
  });
  const portfolioLinks = Object.keys(collections).map((collection, i) => {
    return (
      <Link
        key={i}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          borderRight: i % 2 === 0 ? "2px solid grey" : "",
          borderLeft: i % 2 === 1 ? "2px solid grey" : "",
          borderTop: i - 2 >= 0 ? "2px solid grey" : "",
          borderBottom: 2 - i >= 1 ? "2px solid grey" : ""
        }}
        to={`/${isJournal ? "journal" : "gallery"}#${collection}`}
      >
        {`${collection}`}
      </Link>
    );
  });
  return isJournal ? (
    <div
      className="journal-nav"
      style={{
        display: "grid",
        gridGap: "15px",
        justifyItems: "center"
      }}
    >
      {journalLinks}
    </div>
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        justifyItems: "center",
        margin: "3rem"
      }}
    >
      {portfolioLinks}
    </div>
  );
}

export default class Gallery extends Component {
  render() {
    const galleries = this.props.galleries || portfolioImages;
    const isJournal = this.props.isJournal || false;
    return (
      <Fragment>
        {isJournal ? (
          <Fragment>
            {window.location.hash.slice(1) ? (
              <ImageGallery
                galleryName={this.props.collection || Object.keys(galleries)[0]}
                photos={
                  galleries[this.props.collection].slice(1) ||
                  galleries[Object.keys(galleries)[0]].slice(1)
                }
              />
            ) : (
              <GalleryNav collections={galleries} isJournal />
            )}
          </Fragment>
        ) : (
          <Fragment>
            <p>
              For higher resolution images <Link to="/contact">contact me</Link>{" "}
              or Visit{" "}
              <a
                target="_blank"
                href="http://www.shutterstock.com"
                rel="noopener noreferrer"
              >
                Shutterstock
              </a>
            </p>
            <GalleryNav collections={galleries} />
            <ImageGallery
              galleryName={this.props.collection || Object.keys(galleries)[0]}
              photos={
                galleries[this.props.collection] ||
                galleries[Object.keys(galleries)[0]]
              }
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
