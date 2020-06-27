import React, { Fragment } from "react";
import Spinner from "../Spinner";
export const OverlaySimple = ({ closeOverlay, finished }) => {
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
        color: "red",
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
          height: "100%",
        }}
      >
        {finished ? (
          <Fragment>
            Upload Finished!
            <button onClick={closeOverlay}>Close</button>
          </Fragment>
        ) : (
          <Fragment>
            'Upload in progress...'
            <Spinner />
            "dont close this window"
          </Fragment>
        )}
      </div>
    </div>
  );
};
