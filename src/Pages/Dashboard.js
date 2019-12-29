import React, { Fragment, Suspense, Component } from "react";
// import {
//   FirebaseDatabaseProvider,
//   FirebaseDatabaseNode
// } from "@react-firebase/database";
// import "firebase/firestore";
import IntroImage from "../components/IntroImage";
// var db = firebase.firestore();
const dashboardPageBg =
  "https://res.cloudinary.com/sunshinephoto/image/upload/c_scale,w_1000/images/backgrounds/IMG_8951_1500_oxpgkq.jpg";
export default class Dashboard extends Component {
  state = {
    limit: 2
  };
  render() {
    const { user, displayUserData } = this.props;
    const { displayName, email, uid } = user;
    console.log("user", user);
    console.log("email", email);

    if (user) {
      displayUserData();
    }

    return (
      <Fragment>
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          <IntroImage
            imageSrc={dashboardPageBg}
            text={["Your Dashboard"]}
            height="35vh"
          />
        </Suspense>
        <Suspense fallback={<div style={{ height: "35vh" }}></div>}>
          <div>
            <h1>{`Hello ${displayName}!`}</h1>
          </div>
        </Suspense>
      </Fragment>
    );
  }
}
