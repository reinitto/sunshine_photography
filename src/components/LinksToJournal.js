import React from "react";
import { GalleryNav } from "./portfolio/GalleryNav";
import journalGalleries from "../content/journals.json";

export default function LinksToJournal() {
  return <GalleryNav isJournal collections={journalGalleries} />;
}
