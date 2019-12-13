import React from "react";
import { GalleryNav } from "./portfolio/Gallery";
const journalGalleries = {
  Norway: [
    {
      src:
        "https://images.unsplash.com/photo-1513326238704-b2cd281a3d53?ixlib=rb-1.2.1&auto=format&fit=crop&w=450&q=60",
      width: 4,
      height: 3,
      categories: ["landscape", "nature", "food", "aerial"]
    }
  ],
  China: [
    {
      src:
        "https://images.unsplash.com/photo-1503079230625-8a7c589a9007?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=450&q=60",
      width: 4,
      height: 3
    }
  ],
  Africa: [
    {
      src:
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=450&q=60",
      width: 4,
      height: 3
    }
  ]
};
export default function LinksToJournal() {
  return (
    <div>
      <GalleryNav isJournal collections={journalGalleries} />
    </div>
  );
}
