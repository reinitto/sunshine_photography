import * as firebase from "firebase/app";
import "firebase/storage";
import React, { Fragment } from "react";
import Gallery from "../components/portfolio/Gallery";
import Navbar from "../components/layout/Navbar";

// Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = firebase.storage();

// // Create a storage reference from our storage service
// var storageRef = storage.ref();

// // Create a reference under which you want to list
// var babyRef = storageRef.child("baby/");
// // Find all the prefixes and items.
// babyRef
//   .listAll()
//   .then(function(res) {
//     console.log("firebase babyref", res);
//     res.prefixes.forEach(function(folderRef) {
//       // All the prefixes under listRef.
//       // You may call listAll() recursively on them.
//     });
//     res.items.forEach(function(itemRef) {
//       // All the items under listRef.
//     });
//   })
//   .catch(function(error) {
//     // Uh-oh, an error occurred!
//   });

// // Create a child reference
// var imagesRef = storageRef.child("images");
// // imagesRef now points to 'images'

// // Child references can also take paths delimited by '/'
// var spaceRef = storageRef.child("images/space.jpg");
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"

export default function GalleryPage() {
  return (
    <Fragment>
      <Navbar />
      <div
        style={{
          height: "70px"
        }}
      ></div>
      <div style={{ width: "90%", margin: "auto" }}>
        <h2 className="text-center">Portfolio</h2>
        <Gallery collection={window.location.hash.slice(1)} />
      </div>
    </Fragment>
  );
}
