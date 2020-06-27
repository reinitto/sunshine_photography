import React, { useState, useEffect } from "react";
import firebase from "firebase/app";

let getSession = async (id) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`/sessions/${id}`)
      .once("value")
      .then((snapshot) => {
        let servicesSnap = snapshot.val();
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

export const PriceImage = ({ sessionKey, language }) => {
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
        className="text-center d-flex flex-column justify-content-center align-items-center m-1"
        style={{
          background: `linear-gradient(
            rgba(61, 72, 86, 0.15), 
            rgba(61, 72, 86, 0.45)
          ),url(https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_300/${image})`,
          width: "200px",
          height: "250px",
          color: "white",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h4 className="text-capitalize">{name[language]}</h4>
        <h4>{price} NOK</h4>
        <p className="text-capitalize">{detailText[language]}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PriceImage;
