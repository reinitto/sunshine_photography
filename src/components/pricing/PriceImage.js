import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

let getSession = async (id) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`/sessions/${id}`)
      .once("value")
      .then((snapshot) => {
        let servicesSnap = snapshot.val();
        console.log("servicesSnap", servicesSnap);
        if (servicesSnap) {
          resolve(servicesSnap);
        } else {
          reject();
        }
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
};

export const PriceImage = ({ sessionKey }) => {
  let [session, setSession] = useState(null);
  useEffect(() => {
    if (sessionKey) {
      getSession(sessionKey).then((res) => {
        setSession(res);
      });
    }
  }, [sessionKey]);
  if (session) {
    let { name, price, image, detailText, id } = session;

    return (
      <div
        key={id}
        className="text-center d-flex flex-column justify-content-center align-items-center m-3"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_200/${image})`,
          width: "200px",
          height: "200px",
          color: "white",
        }}
      >
        <h4 className="text-capitalize">{name}</h4>
        <h4>{price} NOK</h4>
        <p className="text-capitalize">{detailText}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PriceImage;
