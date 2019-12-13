import React, { Fragment } from "react";
import Gallery from "../components/portfolio/Gallery";
import Navbar from "../components/layout/Navbar";

const journalGalleries = {
  Norway: [
    {
      src:
        "https://images.unsplash.com/photo-1513326238704-b2cd281a3d53?ixlib=rb-1.2.1&auto=format&fit=crop",
      width: 4,
      height: 3,
      categories: ["landscape", "nature", "food", "aerial"]
    },
    {
      src:
        "https://images.unsplash.com/photo-1503049555010-f8616ee8f0f3?ixlib=rb-1.2.1&auto=format&fit=crop",
      width: 10,
      height: 2,
      categories: ["landscape", "nature", "food", "aerial"]
    },
    {
      src:
        "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?ixlib=rb-1.2.1&auto=format&fit=crop",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1526402978125-f1d6df91cbac?ixlib=rb-1.2.1&auto=format&fit=crop",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    }
  ],
  China: [
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
    },
    {
      src:
        "https://images.unsplash.com/photo-1464241353125-b30586718640?ixlib=rb-1.2.1&auto=format&fit=crop",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 1,
      height: 1
    },
    {
      src:
        "https://images.unsplash.com/photo-1534260933201-688b892637f1?ixlib=rb-1.2.1&auto=format&fit=crop",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1529663991015-c3d2056835c5?ixlib=rb-1.2.1&auto=format&fit=crop",
      categories: ["landscape", "nature", "food", "aerial"],
      width: 4,
      height: 3
    }
  ],
  Africa: [
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
    },
    {
      src:
        "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1504217051514-96afa06398be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1537249011554-eb008faf38c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    },
    {
      src:
        "https://images.unsplash.com/photo-1433087639215-37846ea63501?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop",
      width: 4,
      height: 3
    }
  ]
};

export default function Journal() {
  return (
    <Fragment>
      <Navbar />
      <div
        style={{
          height: "70px"
        }}
      ></div>
      <div style={{ width: "90%", margin: "auto" }}>
        <h2 className="text-center">Travel Photos</h2>
        <Gallery
          isJournal={true}
          collection={window.location.hash.slice(1)}
          galleries={journalGalleries}
        />
      </div>
    </Fragment>
  );
}
