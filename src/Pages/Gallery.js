import React, { Fragment, Suspense } from "react";
import Gallery from "../components/portfolio/Gallery";
import Navbar from "../components/layout/Navbar";
import IntroImage from "../components/IntroImage";

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

const portfoliogalleryBg =
  "https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8951_1500_oxpgkq.jpg";

export default function GalleryPage() {
  return (
    <Fragment>
      <Navbar />

      <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
        <IntroImage
          imageSrc={portfoliogalleryBg}
          text={["Portfolio Gallery"]}
          height="35vh"
        />
      </Suspense>
      <div style={{ width: "90%", margin: "auto" }}>
        {/* <h2 className="text-center">Portfolio</h2> */}
        <Gallery collection={window.location.hash.slice(1)} />
      </div>
    </Fragment>
  );
}
