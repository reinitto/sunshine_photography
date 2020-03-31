import React from "react";
import Spinner from "../Spinner";
export function Overlay({ uploading, updating, info, closeOverlay }) {
  if (!uploading && !updating) {
    return null;
  }
  let {
    uploadingTitle,
    imagesUploaded,
    imagesToUpload,
    deletingSets,
    setsToDelete
  } = info;
  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: "200",
        cursor: " pointer",
        color: "red"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          height: "100%"
        }}
      >
        <h4>
          {uploadingTitle
            ? `${uploading ? "Uploading" : "Updating"} Title`
            : `Title ${uploading ? "Uploaded" : "Updated"}`}
          {uploadingTitle ? <Spinner /> : null}
        </h4>
        <h4>
          {!uploadingTitle && imagesUploaded !== imagesToUpload
            ? `${uploading ? "Uploading" : "Updating"} Images`
            : null}
          {!uploadingTitle && imagesUploaded !== imagesToUpload ? (
            <Spinner />
          ) : null}
        </h4>
        <h4>
          {!uploadingTitle
            ? `${imagesUploaded} out of ${imagesToUpload} Images ${
                uploading ? "Uploaded" : "Updated"
              }!`
            : null}
        </h4>
        <h4>
          {deletingSets ? "Deleting Stuff" : null}
          {deletingSets ? <Spinner /> : null}
          {!uploadingTitle &&
          !deletingSets &&
          setsToDelete &&
          imagesUploaded === imagesToUpload
            ? `${setsToDelete.length} Sets Deleted!`
            : null}
        </h4>
        {!uploadingTitle &&
        !deletingSets &&
        imagesUploaded === imagesToUpload ? (
          <>
            <h3>Finished</h3>
            <h4>You can close the window now</h4>
            <button
              onClick={closeOverlay}
              //   onClick={() => {
              //     this.setState({
              //       uploading: false
              //     });
              //   }}
            >
              Close
            </button>
          </>
        ) : (
          <h4>Dont close this window</h4>
        )}
      </div>
    </div>
  );
}

export default Overlay;
